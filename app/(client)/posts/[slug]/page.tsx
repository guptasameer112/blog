import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import Header from "@/app/components/Header";
import Toc from "@/app/components/Toc";
import { slugify } from "@/app/utils/helpers";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function getPost(slug: string, commentsOrder: string = "desc") {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    tags[]-> {
      _id,
      slug,
      name
    },
    "comments": *[_type == "comment" && post._ref == ^._id ] | order(_createdAt ${commentsOrder}) {
      name,
      comment,
      _createdAt,
    }
  }
  `;

  const post = await client.fetch(query);
  return post;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | undefined> {
  const post: Post = await getPost(params?.slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_US",
      url: `https://next-cms-blog-ce.vercel.app/${params.slug}`,
      siteName: "DevBlook",
      images: [
        // {
        //   url: post.image,
        // }
        // {
        //   url: urlForImage(post?.body?.find((b: any) => b._type === "image")).width(1200).height(630).url(),
        //   width: 1200,
        //   height: 630,
        // },
      ],
    },
  };
}

const page = async ({ params, searchParams }: Params) => {
  const commentsOrder = searchParams?.comments || "desc";
  const post: Post = await getPost(params?.slug, commentsOrder.toString());

  if (!post) {
    notFound();
  }

  return (
    <div className={`${inter.className} max-w-4xl mx-auto px-4`}>
      {/* <Header title={post?.title} /> */}
      <article className="mt-8">
        <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600 dark:text-gray-400">
            {new Date(post?.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div>
            {post?.tags?.map((tag) => (
              <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
                <span className="inline-block mr-2 px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded">
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        {/* <Toc headings={post?.headings} /> */}
        <div className={richTextStyles}>
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
        </div>
      </article>
    </div>
  );
};

export default page;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value).url()}
        alt="Post"
        width={700}
        height={700}
      />
    ),
  },
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

const richTextStyles = `
mt-8
text-lg
leading-relaxed
prose
prose-headings:font-bold
prose-h2:text-2xl
prose-h3:text-xl
prose-h4:text-lg
prose-p:mb-4
prose-a:text-blue-600
prose-img:rounded-lg
prose-pre:bg-gray-100
prose-pre:p-4
prose-pre:rounded
dark:prose-invert
`;
