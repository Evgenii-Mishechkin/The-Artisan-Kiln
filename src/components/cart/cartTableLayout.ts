/** Скругление блоков корзины (макет) */
export const cartRadius = "rounded-[5px]";

/** Границы ячейки таблицы корзины */
export const cartCellBorder =
  "border-2 border-solid border-kiln-ink text-center align-middle";

/** Тело таблицы */
export const cartCell = `${cartCellBorder} p-[5px]`;

/** Ячейки данных — одинаковая высота (заголовки без этого класса) */
export const cartBodyCell = `${cartCell} h-[4.5rem]`;

/** Узкие колонки — по ширине контента (на мобиле перенос, чтобы не распирать) */
export const cartColTight = "whitespace-normal sm:whitespace-nowrap";

/** Item — фиксированная ширина под превью 56px (на мобиле тянется по колонке) */
export const cartColItem =
  "sm:w-[4.5rem] sm:min-w-[4.5rem] sm:max-w-[4.5rem]";

/** Qty и Unit Price — узко, одна ширина под цену в скобках (фикс с sm) */
export const cartColValue =
  "sm:w-[4.25rem] sm:min-w-[4.25rem] sm:max-w-[4.25rem]";

export const cartHead = `${cartCellBorder} bg-kiln-cream p-[3px] text-base font-bold uppercase leading-tight tracking-wide text-kiln-ink`;
