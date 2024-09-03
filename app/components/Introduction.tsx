import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Introduction = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-16 px-4 max-w-5xl mx-auto">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg mb-6">
          Hi, I'm Sameer Gupta. I'm a passionate developer and writer, sharing my thoughts and experiences in the world of technology and programming.
        </p>
        <p className="text-lg">
          Explore my articles to learn about web development, software engineering best practices, and the latest tech trends.
        </p>
        <Link href="/tag">
            <button className="bg-blue-500 my-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            tags
            </button>
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <Image
          src="/profile-picture.jpg"
          alt="Sameer Gupta"
          width={300}
          height={300}
          className="rounded-full shadow-lg"
        />
      </div>
      
    </div>
  )
}

export default Introduction