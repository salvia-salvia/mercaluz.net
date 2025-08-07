import FishContent from "@/components/FishContent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fishCategories, products } from "@/constants";
import { Categories, MultiLangText } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: {
    locale: string;
    category: Categories;
    fish: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, fish, locale } = params;
  const t = await getTranslations({ locale, namespace: "fish_seo_content" });
  const productList = products[category];
  const fishItem = productList?.find((item) => item?.id === fish);

  if (!fishItem) return notFound();

  const name = fishItem.name;
  const scientific = fishItem.scientifcName;

  return {
    title: t("title_template", { name }),
    description: t("description_template", {
      name,
      scientific,
    }),
    keywords: t("keywords_template", { name }),
    openGraph: {
      title: t("title_template", { name }),
      description: t("description_template", { name, scientific }),
      type: "article",
      url: `https://mercaluz.net/${locale}/products/${category}/${fish}`,
      images: [
        {
          url: `https://mercaluz.net${fishItem.image}`,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title_template", { name }),
      description: t("description_template", { name, scientific }),
      images: [`https://mercaluz.net${fishItem.image}`],
    },
  };
}

export default async function FishPage({ params }: Props) {
  const { fish, category } = params;

  return (
    <section>
      <Header isProductPage={true} />
      <FishContent category={category} fish={fish} />
      <Footer />
    </section>
  );
}
