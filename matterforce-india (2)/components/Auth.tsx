import React, { useState } from 'react';
import { Hexagon, Github } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (data: { name?: string; email: string; role: UserRole }) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
        if (!isLogin && !name) return; // Require name for signup

        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            onLogin({ 
                email, 
                name: isLogin ? undefined : name,
                role
            });
            setIsLoading(false);
        }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans text-white">
       {/* Container */}
       <div className="w-full max-w-[320px] flex flex-col items-center z-10 animate-in fade-in duration-500">
          
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
             <Hexagon className="h-10 w-10 text-white mb-6" strokeWidth={2} />
             <h1 className="text-3xl font-bold text-center">
                 {isLogin ? 'Welcome back' : 'Create an account'}
             </h1>
          </div>

          {/* Form Card */}
          <div className="w-full space-y-4">
             <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border border-slate-700 rounded-md px-4 py-3 text-base text-white focus:border-matter-orange focus:ring-1 focus:ring-matter-orange outline-none transition-all placeholder:text-slate-500"
                            required
                        />
                    </div>
                )}
                <div>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border border-slate-700 rounded-md px-4 py-3 text-base text-white focus:border-matter-orange focus:ring-1 focus:ring-matter-orange outline-none transition-all placeholder:text-slate-500"
                        required
                    />
                </div>
                <div>
                     <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border border-slate-700 rounded-md px-4 py-3 text-base text-white focus:border-matter-orange focus:ring-1 focus:ring-matter-orange outline-none transition-all placeholder:text-slate-500"
                        required
                    />
                </div>
                
                {/* Role Selection */}
                <div>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full bg-black border border-slate-700 rounded-md px-4 py-3 text-base text-white focus:border-matter-orange focus:ring-1 focus:ring-matter-orange outline-none transition-all"
                    >
                        <option value="STUDENT">Student / Maker</option>
                        <option value="INSTITUTION">Institution / Bulk Buyer</option>
                        <option value="ENGINEER">Service Engineer / Lab</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#10a37f] text-white font-medium py-3 rounded-md hover:bg-[#1a7f64] transition-colors flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        'Continue'
                    )}
                </button>
             </form>

             <div className="text-center text-sm text-slate-300 pt-2">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#10a37f] hover:underline"
                >
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
             </div>

             <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-slate-500 uppercase">OR</span>
                <div className="flex-grow border-t border-slate-700"></div>
             </div>

             <div className="space-y-2">
                 <button 
                    type="button"
                    onClick={() => onLogin({ email: 'demo@matterforce.in', name: 'Demo Maker' })}
                    className="w-full bg-transparent border border-slate-700 text-white font-medium py-3 rounded-md hover:bg-slate-800 transition-colors flex items-center relative text-sm"
                >
                    <div className="absolute left-4">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    </div>
                    <span className="flex-1 text-center">Continue with Google</span>
                 </button>
                 <button 
                    type="button"
                    onClick={() => onLogin({ email: 'demo@matterforce.in', name: 'Demo Maker' })}
                    className="w-full bg-transparent border border-slate-700 text-white font-medium py-3 rounded-md hover:bg-slate-800 transition-colors flex items-center relative text-sm"
                >
                    <div className="absolute left-4">
                        <Github className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-center">Continue with GitHub</span>
                 </button>
             </div>
          </div>

          <div className="mt-12 text-center">
             <p className="text-xs text-slate-500">
                <a href="#" className="hover:underline">Terms of Use</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:underline">Privacy Policy</a>
             </p>
          </div>
       </div>
    </div>
  );
};

export default Auth;