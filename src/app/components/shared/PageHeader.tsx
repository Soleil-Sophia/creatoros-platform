import { Badge } from './Badge';

type PageHeaderProps = {
  title: string;
  description: string;
  badge?: string;
};

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {badge && <Badge variant="purple" size="sm">{badge}</Badge>}
      <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#F4F3F8', marginTop: badge ? '12px' : '0' }}>{title}</h1>
      <p style={{ fontSize: '14px', color: '#8B8F9E', marginTop: '8px' }}>{description}</p>
    </div>
  );
}
