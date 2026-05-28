/** Скругление блоков корзины (макет) */
export const cartRadius = "rounded-[5px]";

/** Границы ячейки таблицы корзины */
export const cartCellBorder =
  "border-2 border-solid border-kiln-ink text-center align-middle";

/** Тело таблицы */
export const cartCell = `${cartCellBorder} p-[5px]`;

/** Ячейки данных — одинаковая высота (заголовки без этого класса) */
export const cartBodyCell = `${cartCell} h-[4.5rem]`;

/** Узкие колонки — по ширине контента */
export const cartColTight = "whitespace-nowrap";

/** Item — фиксированная ширина под превью 56px, без растягивания */
export const cartColItem = "w-[4.5rem] min-w-[4.5rem] max-w-[4.5rem]";

/** Qty и Unit Price — узко, одна ширина под цену в скобках */
export const cartColValue =
  "w-[4.25rem] min-w-[4.25rem] max-w-[4.25rem]";

export const cartHead = `${cartCellBorder} bg-kiln-cream p-[3px] text-base font-bold uppercase leading-tight tracking-wide text-kiln-ink`;
