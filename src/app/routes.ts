import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home';
import { DashboardPage } from './pages/dashboard';
import { ModulesPage } from './pages/modules';
import { BrandOSProductPage } from './pages/brand-os-product';
import { BrandOSAppPage } from './pages/brand-os-app';
import { ContentOSProductPage } from './pages/content-os-product';
import { ContentOSAppPage } from './pages/content-os-app';
import { ContentOSLibraryPage } from './pages/content-os-library';
import { ContentOSPage } from '../modules/contentos/ContentOSPage';
import { ContentOSApp } from '../modules/contentos/ContentOSApp';
import { NotFoundPage } from './pages/not-found';
import UserTest from './pages/user-test';
import { AuthorityEngineScreen } from './screens/authority-engine/AuthorityEngineScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
    ErrorBoundary: NotFoundPage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '/modules',
    Component: ModulesPage,
  },

  // --- New clean routes ---
  {
    path: '/modules/contentos',
    Component: ContentOSPage,
  },
  {
    path: '/modules/contentos/app',
    Component: ContentOSApp,
  },

  // BrandOS — new slug (maps to existing page for now)
  {
    path: '/modules/brandos',
    Component: BrandOSProductPage,
  },
  {
    path: '/modules/brandos/app',
    Component: BrandOSAppPage,
  },

  // --- Legacy routes (preserved for backwards compat) ---
  {
    path: '/modules/brand-os',
    Component: BrandOSProductPage,
  },
  {
    path: '/app/brand-os/setup',
    Component: BrandOSAppPage,
  },
  {
    path: '/modules/content-os',
    Component: ContentOSProductPage,
  },
  {
    path: '/app/content-os/generate',
    Component: ContentOSAppPage,
  },
  {
    path: '/app/content-os/library',
    Component: ContentOSLibraryPage,
  },

  {
    path: '/test',
    Component: UserTest,
  },

  // --- Labs (internal / experimental) ---
  {
    path: '/app/labs/authority-engine',
    Component: AuthorityEngineScreen,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
], {
  // Must match the Vite `base` in vite.config.ts. The marketing site (creatoros-site)
  // proxies `/platform/*` here, and in production this app is mounted at the same prefix.
  basename: '/platform',
});
