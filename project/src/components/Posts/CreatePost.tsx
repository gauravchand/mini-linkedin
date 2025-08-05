import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Send, User } from 'lucide-react';

interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
        });

      if (error) throw error;

      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <div className="mb-3">
            <span className="font-semibold text-gray-900">{profile?.name}</span>
          </div>
          
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={4}
              maxLength={1000}
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {content.length}/1000 characters
              </span>
              
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Posting...' : 'Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};