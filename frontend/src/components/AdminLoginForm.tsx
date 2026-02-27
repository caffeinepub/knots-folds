import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const ADMIN_PASSWORD = 'knotsandfolds2024';

interface AdminLoginFormProps {
  onLogin: () => void;
}

export default function AdminLoginForm({ onLogin }: AdminLoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setError('');

    // Simulate a brief check
    await new Promise(r => setTimeout(r, 400));

    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
    setIsChecking(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-3xl p-8 shadow-warm border border-lavender/60">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-rose/15 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-rose" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-plum">Admin Panel</h1>
            <p className="font-sans text-sm text-muted-foreground mt-1">Knots & Folds — Store Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="admin-password" className="font-sans text-sm font-bold text-plum">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className={`bg-blush border-lavender focus:border-rose font-sans ${error ? 'border-destructive' : ''}`}
                autoFocus
              />
              {error && (
                <p className="font-sans text-xs text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isChecking || !password}
              className="w-full bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full shadow-warm"
            >
              {isChecking ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Enter Admin Panel'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
