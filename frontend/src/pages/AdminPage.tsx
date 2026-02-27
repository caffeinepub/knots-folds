import { useState, useEffect } from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminDashboard from '../components/AdminDashboard';

const ADMIN_AUTH_KEY = 'kf_admin_authenticated';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background yarn-texture pt-20">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
