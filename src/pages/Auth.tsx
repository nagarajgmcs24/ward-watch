import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, ArrowRight, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { loginUser, registerUser, getUsers, setCurrentUser } from '@/lib/storage';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'citizen' | 'councillor'>('citizen');
  const [wardNumber, setWardNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login flow
      const user = loginUser(email);
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        navigate(user.role === 'councillor' ? '/councillor' : '/');
      } else {
        // Try to create a new user
        const users = getUsers();
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!existingUser) {
          toast.error('User not found. Please sign up first.');
        } else {
          toast.error('Login failed. Please try again.');
        }
      }
    } else {
      // Signup flow
      const users = getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error('Email already registered. Please login.');
        return;
      }

      if (!name.trim()) {
        toast.error('Please enter your name.');
        return;
      }

      if (role === 'councillor' && !wardNumber) {
        toast.error('Please enter your ward number.');
        return;
      }

      const newUser = registerUser(email, name, role, role === 'councillor' ? wardNumber : undefined);
      setCurrentUser(newUser);
      toast.success('Account created successfully!');
      navigate(role === 'councillor' ? '/councillor' : '/');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero shadow-lg">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin
                ? 'Sign in to report and track issues'
                : 'Join Fix My Ward to improve your community'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl shadow-card border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole('citizen')}
                        className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          role === 'citizen'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Users className={`h-5 w-5 ${role === 'citizen' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={role === 'citizen' ? 'text-primary font-medium' : 'text-muted-foreground'}>
                          Citizen
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('councillor')}
                        className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          role === 'councillor'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <Shield className={`h-5 w-5 ${role === 'councillor' ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className={role === 'councillor' ? 'text-accent font-medium' : 'text-muted-foreground'}>
                          Councillor
                        </span>
                      </button>
                    </div>
                  </div>

                  {role === 'councillor' && (
                    <div className="space-y-2">
                      <Label htmlFor="ward">Ward Number</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="ward"
                          type="text"
                          placeholder="Enter your ward number"
                          value={wardNumber}
                          onChange={(e) => setWardNumber(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span className="font-medium text-primary">
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </span>
              </button>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground text-center mb-3">
              Demo Accounts (just enter email to login):
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ward 12 Councillor:</span>
                <code className="text-primary bg-primary/10 px-2 py-0.5 rounded">councillor@ward12.gov.in</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ward 8 Councillor:</span>
                <code className="text-primary bg-primary/10 px-2 py-0.5 rounded">councillor@ward8.gov.in</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
