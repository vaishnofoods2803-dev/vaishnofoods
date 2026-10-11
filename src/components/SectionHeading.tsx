interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${center ? 'text-center max-w-2xl mx-auto' : ''}`}>
      {eyebrow && (
        <span
          className={`text-sm font-semibold uppercase tracking-widest ${
            light ? 'text-saffron-400' : 'text-saffron-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`section-title ${light ? 'text-cream-50' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${light ? 'text-cream-200' : ''}`}>{subtitle}</p>
      )}
    </div>
  );
}
