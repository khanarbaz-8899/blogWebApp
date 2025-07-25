import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { BlogPost as BlogPostType } from '../../types/blog';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const postDoc = await getDoc(doc(db, 'posts', id));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() } as BlogPostType);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await fetch('https://picsum.photos/800/400');
        setImageUrl(response.url);
      } catch (err) {
        console.error('Image fetch failed', err);
      }
    };

    fetchPost();
    fetchImage();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    setDeleteLoading(true);
    try {
      await deleteDoc(doc(db, 'posts', id));
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post.');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (!post) return <div className="text-center mt-12">Post not found</div>;

  const isAuthor = currentUser?.uid === post.authorId;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 mb-4 inline-block">
        <ArrowLeft className="inline-block w-4 h-4 mr-1" />
        Back
      </Link>

      <article className="bg-white shadow rounded-lg overflow-hidden">
        <div className="h-64 md:h-96 bg-gray-200">
          <img
            src={imageUrl}
            alt="Random Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <div className="flex gap-4">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" /> {post.authorName}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> {formatDate(post.createdAt)}
              </span>
            </div>
            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit/${post.id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </article>

      {/* 🔴 Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
