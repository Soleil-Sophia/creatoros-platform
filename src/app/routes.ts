import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

const HomePage = lazy(() => import('./pages/home').then((module) => ({ default: module.HomePage })));
const DashboardPage = lazy(() => import('./pages/dashboard').then((module) => ({ default: module.DashboardPage })));
const ModulesPage = lazy(() => import('./pages/modules').then((module) => ({ default: module.ModulesPage })));
const BrandOSProductPage = lazy(() => import('./pages/brand-os-product').then((module) => ({ default: module.BrandOSProductPage })));
const BrandOSAppPage = lazy(() => import('./pages/brand-os-app').then((module) => ({ default: module.BrandOSAppPage })));
const ContentOSProductPage = lazy(() => import('./pages/content-os-product').then((module) => ({ default: module.ContentOSProductPage })));
const ContentOSAppPage = lazy(() => import('./pages/content-os-app').then((module) => ({ default: module.ContentOSAppPage })));
const ContentOSLibraryPage = lazy(() => import('./pages/content-os-library').then((module) => ({ default: module.ContentOSLibraryPage })));
const ContentOSPage = lazy(() => import('../modules/contentos/ContentOSPage').then((module) => ({ default: module.ContentOSPage })));
const ContentOSApp = lazy(() => import('../modules/contentos/ContentOSApp').then((module) => ({ default: module.ContentOSApp })));
const HandoffPage = lazy(() => import('../modules/handoff/HandoffPage').then((module) => ({ default: module.HandoffPage })));
const NotFoundPage = lazy(() => import('./pages/not-found').then((module) => ({ default: module.NotFoundPage })));
const UserTest = lazy(() => import('./pages/user-test'));
const AuthorityEngineScreen = lazy(() => import('./screens/authority-engine/AuthorityEngineScreen').then((module) => ({ default: module.AuthorityEngineScreen })));

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
  {
    path: '/modules/contentos/handoff',
    Component: HandoffPage,
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
