import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

const styles = {
  primary: {
    background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
    color: '#0E0F14',
    boxShadow: '0 8px 24px rgba(255, 191, 222, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-3)',
    border: 'none',
    boxShadow: 'none',
  },
};

const sizes = {
  sm: { padding: '8px 18px', fontSize: '13px', borderRadius: '8px' },
  md: { padding: '12px 24px', fontSize: '15px', borderRadius: '10px' },
  lg: { padding: '16px 32px', fontSize: '16px', borderRadius: '12px' },
};

export function Button({ children, href, onClick, variant = 'primary', size = 'md', fullWidth = false }: ButtonProps) {
  const style = {
    ...styles[variant],
    ...sizes[size],
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    fontFamily: 'var(--font-body)',
  };

  if (href) {
    return <Link to={href} style={style}>{children}</Link>;
  }

  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}
