import { Link } from 'react-router';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0E0F14' }}>
      <div className="text-center max-w-[600px] px-6">
        <h1 
          style={{ 
            fontSize: '120px', 
            fontWeight: 700, 
            color: '#E7C6F3',
            marginBottom: '24px',
            lineHeight: 1,
            opacity: 0.3
          }}
        >
          404
        </h1>
        
        <h2 
          style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#F4F3F8',
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}
        >
          Page Not Found
        </h2>
        
        <p 
          style={{ 
            fontSize: '16px', 
            color: '#B4B8C7', 
            lineHeight: 1.6,
            marginBottom: '32px'
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #E7C6F3 0%, #DABFFF 100%)',
            color: '#0E0F14',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(231, 198, 243, 0.3)',
            textDecoration: 'none'
          }}
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
