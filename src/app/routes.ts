import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home';
import { ContentOSProductPage } from './pages/content-os-product';
import { ContentOSAppPage } from './pages/content-os-app';
import { ContentOSLibraryPage } from './pages/content-os-library';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
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
]);