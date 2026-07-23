import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/home';
import { DashboardPage } from './pages/dashboard';
import { ModulesPage } from './pages/modules';
import { BrandOSProductPage } from './pages/brand-os-product';
import { BrandOSAppPage } from './pages/brand-os-app';
import { BrandOSCanonicalApplyPage } from './pages/brandos-canonical-apply';
import { ContentOSProductPage } from './pages/content-os-product';
import { ContentOSAppPage } from './pages/content-os-app';
import { ContentOSLibraryPage } from './pages/content-os-library';
import { CreatorOSCreatePage } from './pages/creator-os-create';
import { DecisionReviewQueuePage } from './pages/decision-review-queue';
import { LaunchOSAppPage } from './pages/launch-os-app';
import { ContentOSPage } from '../modules/contentos/ContentOSPage';
import { ContentOSApp } from '../modules/contentos/ContentOSApp';
import { HandoffPage } from '../modules/handoff/HandoffPage';
import { NotFoundPage } from './pages/not-found';
import UserTest from './pages/user-test';
import { AuthorityEngineScreen } from './screens/authority-engine/AuthorityEngineScreen';

export const router = createBrowserRouter([
  { path: '/', Component: HomePage, ErrorBoundary: NotFoundPage },
  { path: '/dashboard', Component: DashboardPage },
  { path: '/modules', Component: ModulesPage },

  { path: '/creatoros/create', Component: CreatorOSCreatePage },
  { path: '/app/creatoros/create', Component: CreatorOSCreatePage },

  // Shared Decision Engine surfaces. This is not yet DecisionOS.
  { path: '/decisions/review', Component: DecisionReviewQueuePage },
  { path: '/decisions/apply/brandos', Component: BrandOSCanonicalApplyPage },

  { path: '/modules/contentos', Component: ContentOSPage },
  { path: '/modules/contentos/app', Component: ContentOSApp },
  { path: '/modules/contentos/handoff', Component: HandoffPage },

  { path: '/modules/brandos', Component: BrandOSProductPage },
  { path: '/modules/brandos/app', Component: BrandOSAppPage },

  { path: '/modules/launchos', Component: LaunchOSAppPage },
  { path: '/modules/launchos/app', Component: LaunchOSAppPage },

  { path: '/modules/brand-os', Component: BrandOSProductPage },
  { path: '/app/brand-os/setup', Component: BrandOSAppPage },
  { path: '/modules/content-os', Component: ContentOSProductPage },
  { path: '/app/content-os/generate', Component: ContentOSAppPage },
  { path: '/app/content-os/library', Component: ContentOSLibraryPage },
  { path: '/modules/launch-os', Component: LaunchOSAppPage },

  { path: '/test', Component: UserTest },
  { path: '/app/labs/authority-engine', Component: AuthorityEngineScreen },
  { path: '*', Component: NotFoundPage },
], {
  basename: '/platform',
});
