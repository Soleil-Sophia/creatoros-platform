import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home';
import { ModulesPage } from './pages/modules';
import { ContentOSProductPage } from './pages/content-os-product';
import { ContentOSAppPage } from './pages/content-os-app';
import { ContentOSLibraryPage } from './pages/content-os-library';

// Create router once as a singleton
let routerInstance: ReturnType<typeof createBrowserRouter> | null = null;

export const getRouter = () => {
  if (!routerInstance) {
    routerInstance = createBrowserRouter([
      {
        path: '/',
        Component: HomePage,
      },
      {
        path: '/modules',
        Component: ModulesPage,
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
  }
  return routerInstance;
};

export const router = getRouter();