import Header from "@/app/components/Header";
import { Tag } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

async function getAllTags() {
  const query = `
  *[_type == "tag"] {
    name,
    slug,
    _id,
    "postCount": count(*[_type == "post" && references("tags", ^._id)])
  }
  `;
  const tags = client.fetch(query);
  return tags;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by tags on our blog"
}

const page = async () => {
  const tags: Tag[] = await getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {tags?.length > 0 &&
          tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">#{tag.name}</span>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({tag?.postCount})</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default page;
