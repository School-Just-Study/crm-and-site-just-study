import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { ISitemapField } from "next-sitemap/dist/@types/interface";
import { query } from ".keystone/api";
import { ViewStatus } from "../enums/view-status";
import { Lists } from ".keystone/types";
import { FRONTEND_URL } from "../config";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const pages: Lists.Page.Item[] = await query.Page.findMany({
    where: { statusView: { equals: ViewStatus.Show } },
    query: `slug language lastModification`,
  });

  const fields: ISitemapField[] = pages.map((page) => {
    return {
      loc: `${FRONTEND_URL}/${page.language}/${page.slug}`,
      lastmod: page.lastModification as unknown as string,
    };
  });

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
