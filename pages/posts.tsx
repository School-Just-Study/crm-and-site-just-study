import { InferGetStaticPropsType } from "next";
import { query } from ".keystone/api";
import Button from "@mui/material/Button";
import * as React from "react";
import Link from "../src/shared/local-ui/Link";

type Post = {
  id: string;
  title: string;
  slug: string;
};

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <main style={{ margin: "3rem" }}>
        <h1>Hello World! 👋🏻 </h1>
        <ul>
          {/* Render each post with a link to the content page */}
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Button variant="contained" component={Link} noLinkStyle href="/">
        Go to the home page
      </Button>
    </div>
  );
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
  const posts = (await query.Post.findMany({
    query: "id title slug",
  })) as Post[];
  return {
    props: {
      posts,
    },
  };
}
