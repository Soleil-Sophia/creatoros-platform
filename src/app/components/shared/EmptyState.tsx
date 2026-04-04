type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({ title = 'No assets yet', description = 'Your library is empty.' }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F4F3F8', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#8B8F9E' }}>
        {description}
      </p>
    </div>
  );
}
