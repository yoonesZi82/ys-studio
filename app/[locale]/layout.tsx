import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import NextIntelProvider from "@/providers/next-intel-provider";
import { Toaster } from "sonner";
import { DirectionProvider } from "@/components/ui/direction";
import NavbarMenu from "@/components/navbar-menu/NavbarMenu";
import SiteExperience from "@/components/site-experience/SiteExperience";
import { Analytics } from "@vercel/analytics/next";
import { ABOUT_PROFILE_IMAGE } from "@/app/helper/other";
import { getSiteUrl, SITE_KEYWORDS } from "@/app/configs/site";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = getSiteUrl();
  const ogLocale = locale === "fa" ? "fa_IR" : "en_US";

  return {
    metadataBase: siteUrl,
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: [...SITE_KEYWORDS],
    authors: [{ name: "Yoones Zamani", url: "https://github.com/yoonesZi82" }],
    creator: "Yoones Zamani",
    publisher: "Yoones Zamani",
    applicationName: t("siteName"),
    category: "technology",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: siteUrl.origin,
      siteName: t("siteName"),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: ABOUT_PROFILE_IMAGE,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ABOUT_PROFILE_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteUrl.origin,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl.origin}/#person`,
        name: locale === "fa" ? "یونس زمانی" : "Yoones Zamani",
        jobTitle: locale === "fa" ? "توسعه‌دهنده فول‌استک" : "Full Stack Developer",
        url: siteUrl.origin,
        image: `${siteUrl.origin}${ABOUT_PROFILE_IMAGE}`,
        sameAs: [
          "https://github.com/yoonesZi82",
          "https://t.me/Yoones_Zi82",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "MongoDB",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl.origin}/#website`,
        url: siteUrl.origin,
        name: t("siteName"),
        description: t("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        author: { "@id": `${siteUrl.origin}/#person` },
      },
    ],
  };

  return (
    <html
      className={cn(
        "h-full",
        "antialiased",
        vazirmatn.variable,
        locale === "fa" ? "font-vazir" : "font-sans",
      )}
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DirectionProvider
          dir={locale === "fa" ? "rtl" : "ltr"}
          direction={locale === "fa" ? "rtl" : "ltr"}
        >
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntelProvider locale={locale}>
                <SiteExperience>
                  <NavbarMenu />
                  <main className="mt-12 lg:mt-26 mb-4">{children}</main>
                  <Toaster />
                </SiteExperience>
              </NextIntelProvider>
            </ThemeProvider>
          </QueryProvider>
        </DirectionProvider>
        <Analytics />
      </body>
    </html>
  );
}
