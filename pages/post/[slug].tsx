import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Link from "../../src/shared/local-ui/Link";

import { query } from ".keystone/api";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function PostPage({ post }: { post: Post }) {
  return (
    <div>
      <main style={{ margin: "3rem" }}>
        <div>
          <Link href="/">&larr; back home</Link>
        </div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
    </div>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = (await query.Post.findMany({
    query: `slug`,
  })) as { slug: string }[];

  const paths = posts
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = (await query.Post.findOne({
    where: { slug: params!.slug as string },
    query: "id title content",
  })) as Post | null;
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
}
