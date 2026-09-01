export function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <span>{number}</span> / {children}
    </div>
  );
}
