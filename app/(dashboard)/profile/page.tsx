"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/core/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import { User, GitBranch, Globe, Camera, Save } from 'lucide-react';

const ProfilePage = () => {
  const { user, profile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    bio: profile?.bio || '',
    github_url: profile?.github_url || '',
    website_url: profile?.website_url || '',
  });

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user?.id);

    if (error) alert(error.message);
    else setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 overflow-hidden">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-300 dark:bg-slate-700 text-slate-500 font-bold text-2xl">
                    {profile?.username?.[0].toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:text-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {editing ? <Save className="w-4 h-4" /> : <User className="w-4 h-4" />}
              {editing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Username</label>
                {editing ? (
                  <input 
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" 
                    value={formData.username} 
                    onChange={e => setFormData({...formData, username: e.target.value})}
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{profile?.username}</h2>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Bio</label>
                {editing ? (
                  <textarea 
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" 
                    value={formData.bio} 
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                  />
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">{profile?.bio || 'No bio yet...'}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">GitHub</label>
                  {editing ? (
                    <input 
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" 
                      value={formData.github_url} 
                      onChange={e => setFormData({...formData, github_url: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600">
                      <GitBranch className="w-4 h-4" /> <span>{profile?.github_url || 'Not linked'}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">Website</label>
                  {editing ? (
                    <input 
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" 
                      value={formData.website_url} 
                      onChange={e => setFormData({...formData, website_url: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Globe className="w-4 h-4" /> <span>{profile?.website_url || 'Not linked'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">XP Earned</span>
                  <span className="font-bold text-slate-900 dark:text-white">{profile?.xp || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Current Level</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">Lvl {profile?.level || 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
