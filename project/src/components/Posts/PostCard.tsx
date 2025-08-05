import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../lib/supabase';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { User, Calendar } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const authorName = post.profiles?.name || 'Anonymous';
  const timeAgo = formatDistanceToNow(new Date(post.created_at));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Author Info */}
      <div className="flex items-center space-x-3 mb-4">
        <Link 
          to={`/profile/${post.user_id}`}
          className="flex items-center space-x-3 group"
        >
          <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {authorName}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {timeAgo}
            </div>
          </div>
        </Link>
      </div>

      {/* Post Content */}
      <div className="text-gray-800 leading-relaxed">
        {post.content.split('\n').map((line, index) => (
          <p key={index} className={index > 0 ? 'mt-2' : ''}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};