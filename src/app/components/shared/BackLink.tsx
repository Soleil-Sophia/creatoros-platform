import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

/**
 * BackLink — consistent contextual return navigation for deep app/module pages.
 * Visual style matches existing dark theme; no new tokens introduced.
 */
export function BackLink({
  to,
  label,
  className = '',
}: {
  to: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity ${className}`}
      style={{
        color: '#B4B8C7',
        fontSize: '13px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <ArrowLeft size={14} />
      <span>{label}</span>
    </Link>
  );
}
