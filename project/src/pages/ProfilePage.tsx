import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, Profile, Post } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { PostCard } from '../components/Posts/PostCard';
import { Loader2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = user?.id === userId;

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      if (!userId) return;

      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch user's posts
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id (
              id,
              name,
              email
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {isOwnProfile ? 'Your Posts' : `${profile.name}'s Posts`}
          </h2>
          <p className="text-gray-600 mt-1">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {isOwnProfile ? "You haven't posted anything yet." : "No posts to show."}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};