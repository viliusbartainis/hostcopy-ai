export {};

declare global {
  interface Window {
    gtag?: (
      command: 'js' | 'config' | 'event',
      targetOrEventName: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}
