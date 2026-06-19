"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { OAuthButtons } from "./OAuthButtons";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", name, email, password);
    // Implement actual signup logic here
  };

  return (
    <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-500 text-sm">Start your learning journey with StackForge</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium block">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-transparent outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="John Doe" 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-transparent outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="name@example.com" 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-transparent outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="••••••••" 
            required 
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <OAuthButtons />
      
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">Log in</a>
      </p>
    </div>
  );
}
