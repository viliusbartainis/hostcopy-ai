import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!process.env.KV_REDIS_URL) return null;
  if (!redisClient) {
    redisClient = createClient({ url: process.env.KV_REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis client error:', err instanceof Error ? err.message : 'unknown error'));
  }
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

export async function isRateLimited(
  keyPrefix: string,
  ip: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  try {
    const redis = await getRedis();
    if (!redis) return false;
    const key = `${keyPrefix}:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }
    return count > limit;
  } catch (err) {
    console.error('Rate limit check failed, allowing request:', err instanceof Error ? err.message : 'unknown error');
    return false;
  }
}
