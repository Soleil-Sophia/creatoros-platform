import { Link } from 'react-router';
import { Badge } from '../shared';

export function Topbar() {
  return (
    <div 
      className="border-b"
      style={{ 
        background: '#171923',
        borderColor: 'rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="max-w-[1800px] mx-auto px-8 py-5 flex items-center justify-between">
        {/* Left: Module Identity */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center" 
              style={{ 
                background: 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)' }}></div>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#F4F3F8' }}>CreatorOS</span>
          </div>
          <div className="w-px h-5" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#F4F3F8' }}>Content OS</span>
            <Badge variant="pink" size="md">Module 01</Badge>
          </div>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-3">
          <Link 
            to="/app/content-os/library"
            className="px-4 py-2 rounded-lg transition-colors"
            style={{ 
              background: '#1F2230',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#B4B8C7',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Library
          </Link>
          <button 
            className="px-4 py-2 rounded-lg transition-colors"
            style={{ 
              background: '#262A38',
              border: '1px solid rgba(255, 191, 222, 0.2)',
              color: '#F4F3F8',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}