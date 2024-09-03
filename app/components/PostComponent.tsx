import Link from 'next/link'
import React from 'react'
import { Inter } from 'next/font/google'
import { Post } from '../utils/interface'

interface Props {
  post: Post;
}

const inter = Inter({ subsets: ['latin'] })

const PostComponent = ({post}: Props) => {
  return (
    <div className={cardStyle}>
      <Link href={`/posts/${post?.slug?.current}`}>
        <h2 className={`${inter.className} text-xl font-semibold text-gray-800 dark:text-gray-200`}>{post?.title}</h2>
        <p className={`${inter.className} text-sm text-gray-600 dark:text-gray-400 my-2`}>{new Date(post?.publishedAt).toLocaleDateString()}</p>
        <p className='text-gray-700 dark:text-gray-300 mb-4 line-clamp-2'>{post?.excerpt}</p>
      </Link>

      <div className="mt-2">
        {post?.tags?.map((tag) => (
          <span key={tag?._id} className='mr-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'>{tag?.name}</span>
        ))}
      </div>
    </div>
  )
}

export default PostComponent

const cardStyle = `
mb-6
p-5
border
border-gray-200
dark:border-gray-700
rounded-lg
shadow-sm
hover:shadow-md
transition-shadow
duration-300
bg-white
dark:bg-gray-800
`