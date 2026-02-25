import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "pt-BR")) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <ConvexClientProvider>
        <SiteHeader />
        {children}
        <SiteFooter />
      </ConvexClientProvider>
    </NextIntlClientProvider>
  );
}
