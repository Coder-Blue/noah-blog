import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Tech,
  Works,
} from "@/components/landing";
import "./styles.css";

type LandingPageProps = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "LandingPage" });

  return {
    title: t("metadataTitle"),
  };
}

async function LandingPage({ params }: LandingPageProps) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Navbar locale={locale} />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
