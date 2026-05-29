export const pageContainerClass =
  "mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-12 xl:px-[100px]";
export function PageFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${pageContainerClass} ${className}`.trim()}>{children}</div>
  );
}

