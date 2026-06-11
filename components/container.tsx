export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-x-[clamp(16px,1.5vw,24px)] px-[clamp(16px,4vw,64px)] ${className}`}
    >
      {children}
    </div>
  );
}
