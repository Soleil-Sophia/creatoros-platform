import { RouterProvider } from 'react-router';
import { ContextualGuide } from './components/guide/ContextualGuide';
import { router } from './routes';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ContextualGuide />
    </>
  );
}
