/** Общие горизонтальные границы контента (шапка, основная колонка) */
export const pageContainerClass =
  "mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-12 xl:px-[100px]";

/** Простой контейнер страницы — без декоративной рамки */
export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className={pageContainerClass}>{children}</div>;
}
