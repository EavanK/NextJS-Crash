import Link from "next/link";
import { server } from "../../../config";
// import { useRouter } from "next/router";

export default function article({ article }) {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);

  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);

  const articles = await res.json();

  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

/*
getServerSideProps
  getServerSideProps can only be exported from a page.
  SSR (Server-Side Rendering)
  Next.js will pre-render this page on each request using the data returned by getServerSideProps
*/

// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

//------------------------ Switchable getStaticProps & getStaticPaths combination -------------//

/*
getStaticProps
  getStaticProps can only be exported from a page

  instead of fetching an API route from getStaticProps (that itself fetches data from an external source), 
  you can write the server-side code directly in getStaticProps
*/

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

/*
getStaticPaths
  getStaticPaths can only be exported from a page.
  getStaticPaths must be used with getStaticProps, and can't use with getServerSideProps
  
  When Should I Use getStaticPaths?
    1. If you are statically pre-rendering pages that use dynamic routes
    2. The data comes from a headless CMS / database / filesystem
    3. The data can be publicly cached (not user-specific)
    4. The page must be pre-rendered (for SEO - Search Engine Optimization) and be very fast
      - getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance

  getStaticPaths only runs at build time on server-side
*/

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

//   const articles = await res.json();

//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
