import { Badge } from '../shared';

type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <Badge variant="pink" size="md">Content OS</Badge>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F4F3F8', marginTop: '12px', marginBottom: '8px' }}>
        {title}
      </h1>
      <p style={{ fontSize: '14px', color: '#8B8F9E', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}