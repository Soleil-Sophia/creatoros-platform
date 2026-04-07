import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home';
import { DashboardPage } from './pages/dashboard';
import { ModulesPage } from './pages/modules';
import { BrandOSProductPage } from './pages/brand-os-product';
import { BrandOSAppPage } from './pages/brand-os-app';
import { ContentOSProductPage } from './pages/content-os-product';
import { ContentOSAppPage } from './pages/content-os-app';
import { ContentOSLibraryPage } from './pages/content-os-library';
import { NotFoundPage } from './pages/not-found';
import UserTest from './pages/user-test';

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
  {
    path: '*',
    Component: NotFoundPage,
  },
]);