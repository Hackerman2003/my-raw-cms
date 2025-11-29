'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Invalid username or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--off-white)] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/DITRONICS-COMPANY-LOGO.png"
            alt="Ditronics"
            width={80}
            height={80}
            className="mx-auto rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-[var(--anchor-dark)]">Admin Login</h1>
          <p className="text-[var(--neutral-text)]">Sign in to manage your content</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--anchor-dark)] mb-2">
                Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  name="username"
                  required
                  placeholder="Enter username"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--anchor-dark)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="Enter password"
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              Default credentials:<br />
              Username: <strong>admin</strong><br />
              Password: <strong>ditronics2024</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
