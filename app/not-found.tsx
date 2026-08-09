import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-3xl font-serif font-semibold text-stone-900 mb-3">{t("title")}</h1>
        <p className="text-stone-600 mb-6">{t("description")}</p>
        <Link href="/" className="text-stone-900 underline font-medium">{t("backHome")}</Link>
      </div>
    </main>
  );
}
