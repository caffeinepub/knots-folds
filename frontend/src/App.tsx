import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, createHashHistory } from '@tanstack/react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

// Normalize hash URLs that contain caffeineAdminToken parameter.
// Pattern: /#caffeineAdminToken=<token>.<domain>/admin  OR  /#/caffeineAdminToken=<token>.<domain>/admin
// We extract the actual route path (e.g. /admin) from the end of the token string.
function normalizeHashUrl() {
  const hash = window.location.hash;
  if (!hash) return;

  // Match pattern: #caffeineAdminToken=.../<route> or #/caffeineAdminToken=.../<route>
  const tokenMatch = hash.match(/^#\/?caffeineAdminToken=[^/]+(\/.+)$/);
  if (tokenMatch) {
    const cleanPath = tokenMatch[1]; // e.g. "/admin"
    // Replace the hash with the clean path so the router can match it
    window.location.hash = cleanPath;
    return;
  }

  // Also handle: /#caffeineAdminToken=<token>.icp0.io/admin (token contains dots and slashes)
  // More general: find the last known route segment in the hash
  const knownRoutes = ['/admin'];
  for (const route of knownRoutes) {
    if (hash.includes(route)) {
      // Extract everything from the known route onwards
      const idx = hash.lastIndexOf(route);
      const cleanPath = hash.substring(idx); // e.g. "/admin"
      if (cleanPath !== hash.replace(/^#\/?/, '')) {
        window.location.hash = cleanPath;
        return;
      }
    }
  }
}

// Run normalization before router creation
normalizeHashUrl();

const hashHistory = createHashHistory();

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree, history: hashHistory });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
