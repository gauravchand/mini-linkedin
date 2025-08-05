import React, { useState } from 'react';
import { Profile } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Edit3, Save, X } from 'lucide-react';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editBio, setEditBio] = useState(profile.bio);
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useAuth();

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name: editName,
        bio: editBio,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditName(profile.name);
    setEditBio(profile.bio);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      <div className="flex items-start space-x-6">
        {/* Avatar */}
        <div className="bg-blue-100 p-6 rounded-full flex-shrink-0">
          <User className="h-16 w-16 text-blue-600" />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : 'Save'}</span>
                </button>
                
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                {isOwnProfile && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <Mail className="h-5 w-5 mr-2" />
                {profile.email}
              </div>

              {profile.bio && (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}

              {!profile.bio && isOwnProfile && (
                <p className="text-gray-500 italic">Add a bio to tell others about yourself</p>
              )}

              <div className="mt-6 text-sm text-gray-500">
                Member since {new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};