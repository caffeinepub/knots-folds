import { useState } from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminDashboard from '../components/AdminDashboard';

const ADMIN_AUTH_KEY = 'kf_admin_authenticated';

function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated);

  const handleLogin = () => {
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch {
      // sessionStorage may be unavailable in some environments
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // sessionStorage may be unavailable in some environments
    }
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
