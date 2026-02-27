import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const ADMIN_PASSWORD = 'namita6565';

interface AdminLoginFormProps {
  onLogin: () => void;
}

export default function AdminLoginForm({ onLogin }: AdminLoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-10">
      <div className="w-full max-w-lg space-y-6">

        {/* Login Form */}
        <div className="bg-card rounded-3xl p-8 shadow-warm border border-lavender/60">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-rose/15 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-rose" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-plum">Admin Panel</h1>
            <p className="font-sans text-sm text-muted-foreground mt-1">Knots &amp; Folds — Store Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="admin-password" className="font-sans text-sm font-bold text-plum">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className={`bg-blush border-lavender focus:border-rose font-sans pr-10 ${error ? 'border-destructive' : ''}`}
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-plum transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="font-sans text-xs text-destructive font-medium">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!password.trim()}
              className="w-full bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full shadow-warm"
            >
              Enter Admin Panel
            </Button>
          </form>
        </div>

        {/* Step-by-step Guide */}
        <div className="bg-lavender/30 border border-lavender rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-violet shrink-0" />
            <p className="font-sans font-bold text-sm text-plum">How to Access the Admin Panel</p>
          </div>
          <ol className="space-y-3">
            {[
              { step: '1', text: 'Navigate to your site URL and add /admin at the end (e.g. yoursite.com/admin).' },
              { step: '2', text: 'Enter the admin password in the field above and click "Enter Admin Panel".' },
              { step: '3', text: 'Use the tabs inside to manage Products, Orders, and Customer Feedback.' },
            ].map(({ step, text }) => (
              <li key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-rose/20 text-rose font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </span>
                <p className="font-sans text-sm text-plum-light leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </div>
  );
}
