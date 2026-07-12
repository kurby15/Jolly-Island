import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import bgImage from '../../imports/image.png';

const ACCOUNTS = [
  { username: 'admin', password: 'admin123', role: 'admin' as const },
  { username: 'cashier', password: 'cashier123', role: 'cashier' as const },
  { username: 'manager', password: 'manager123', role: 'admin' as const },
  { username: 'staff', password: 'staff123', role: 'cashier' as const },
];

interface LoginProps {
  onLogin: (role: 'admin' | 'cashier') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = ACCOUNTS.find(a => a.username === username && a.password === password);
    if (!account) {
      setError('Invalid username or password.');
      return;
    }
    setError('');
    onLogin(account.role);
    navigate(account.role === 'admin' ? '/admin' : '/cashier');
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-12">
        <div className="text-white text-center max-w-lg">
          <div className="mb-8">
            
            <h1 className="mb-4 text-white">Welcome to JollyIsland</h1>
            <p className="text-xl text-white/90">RFID-Based Customer Activity Monitoring</p>
            <p className="text-lg text-white/80 mt-2">Indoor Play Center Management System</p>
          </div>

          {/* Decorative Elements */}

        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
            {/* Logo */}
            <div className="text-center mb-8">
              
              <h2 className="text-dark-slate mb-2">Sign In</h2>
              <p className="text-gray">Access your management dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-dark-slate">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-dark-slate">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-light-gray border-2 border-transparent rounded-xl focus:border-ocean-blue focus:outline-none transition-colors pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-ocean-blue transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-ocean-blue to-sky-blue"
              >
                Sign In
              </button>

              <div className="text-center">
                <a href="#" className="text-ocean-blue hover:text-sky-blue transition-colors">
                  Forgot Password?
                </a>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray/20 text-center">
              <p className="text-gray">JollyIsland Management System v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
