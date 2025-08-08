
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsContent from "@/components/ProductsContent";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("products_seo_content");
  const locale = await getLocale();

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const image = "https://mercaluz.net/rounded_logo.svg";  
  const url = `https://mercaluz.net/${locale}/products`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [image],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export default function Page() {
  return (
    <div className="w-full">
      <Header isProductPage={true} />
      <ProductsContent />
      <Footer />
    </div>
  );
}
