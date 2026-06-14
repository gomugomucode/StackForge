import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../core/services/supabase';
import { Github, Globe, Mail, Trophy, BookOpen, Target, User } from 'lucide-react';

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  github_url: string;
  website_url: string;
  xp: number;
  level: number;
  skills: string[];
}

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (!error) setProfile(data);
      setLoading(false);
    }

    fetchProfile();
  }, [username]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!profile) return <div className="flex justify-center items-center h-screen">Profile not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative">
            <img 
              src={profile.avatar_url || 'https://via.placeholder.com/150'} 
              alt={profile.username} 
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{profile.full_name}</h1>
            <p className="text-slate-500 dark:text-slate-400">@{profile.username}</p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">{profile.bio}</p>
            
            <div className="flex gap-4 mt-6">
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {profile.website_url && (
                <a href={profile.website_url} target="_blank" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors">
                  <Globe className="w-4 h-4" /> Website
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Level</div>
              <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300">{profile.level}</div>
            </div>
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/30 rounded-2xl border border-amber-100 dark:border-amber-800">
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase">Total XP</div>
              <div className="text-3xl font-black text-amber-700 dark:text-amber-300">{profile.xp}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Target className="w-5 h-5 text-indigo-500" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <BookOpen className="w-5 h-5 text-indigo-500" /> Learning History
            </h3>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Learning path data would be fetched and displayed here.
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Trophy className="w-5 h-5 text-indigo-500" /> Achievements
            </h3>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Badges and certifications.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
