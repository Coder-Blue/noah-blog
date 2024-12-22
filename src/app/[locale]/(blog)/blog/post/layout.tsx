import { Container, MainNav } from "@/components/blog";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";

type PostLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PostLayout({
  children,
  params,
}: PostLayoutProps) {
  const locale = (await params).locale;

  return (
    <>
      <div className="bg-gray-100 dark:bg-[#262626]">
        <Container>
          <MainNav locale={locale} />
        </Container>
      </div>
      {children}
    </>
  );
}
