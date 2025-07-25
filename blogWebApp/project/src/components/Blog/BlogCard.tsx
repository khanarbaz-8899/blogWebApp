import React from 'react';
import { BlogPost } from '../../types/blog';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const fallbackImage = `https://picsum.photos/seed/${post.id}/400/200`;
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* ✅ IMAGE ko hata nahi rahe — yeh rehne do */}
      <img
        src={post.coverImage || fallbackImage}
        alt={post.title}
        className="w-full h-64 object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-4">{post.title}</h2>

      {/* ✅ EXCERPT add karo */}
      {post.excerpt && (
        <p className="text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
      )}

      {/* ✅ Agar chaho toh content ka short part bhi dikha sakte ho */}
      
      {post.content && (
        <p className="text-gray-700 mt-2 line-clamp-2">
          {post.content.substring(0, 100)}...
        </p>
      )} 
     

      <Link
        to={`/post/${post.id}`}
        className="text-blue-600 hover:underline mt-4 inline-block"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
