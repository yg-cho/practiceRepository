import type React from 'react';
import type { SizeChangerRender } from './Options';

export interface PaginationLocale {
  // Options
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;

  // Pagination
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
  prev_3?: string;
  next_3?: string;
  page_size?: string;
}

type SemanticName = 'item';

export interface PaginationData {
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  classNames?: Partial<Record<SemanticName, string>>;
  className: string;
  selectPrefixCls: string;
  prefixCls: string;
  pageSizeOptions: number[];

  current: number;
  defaultCurrent: number;
  total: number;
  totalBoundaryShowSizeChanger?: number;
  pageSize: number;
  defaultPageSize: number;

  hideOnSinglePage: boolean;
  align: 'start' | 'center' | 'end';
  showSizeChanger: boolean;
  sizeChangerRender?: SizeChangerRender;
  showLessItems: boolean;
  showPrevNextJumpers: boolean;
  showQuickJumper: boolean | object;
  showTitle: boolean;
  simple: boolean | { readOnly?: boolean };
  disabled: boolean;

  locale: PaginationLocale;

  style: React.CSSProperties;

  prevIcon: React.ComponentType | React.ReactNode;
  nextIcon: React.ComponentType | React.ReactNode;
  jumpPrevIcon: React.ComponentType | React.ReactNode;
  jumpNextIcon: React.ComponentType | React.ReactNode;
}

export interface PaginationProps
  extends Partial<PaginationData>,
    React.AriaAttributes {
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next' | 'mega-jump-prev' | 'mega-jump-next',
    element: React.ReactNode,
  ) => React.ReactNode;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  // WAI-ARIA
  role?: React.AriaRole | undefined;

  // 새로 추가한 속성들
  /**
   * 10페이지씩 이동하는 버튼(<< 및 >>) 표시 여부
   */
  showMegaJumpers?: boolean;

  /**
   * 한 번에 건너뛸 페이지 수
   * @default 10
   */
  megaJumpSize?: number;

  /**
   * 10페이지 이전 점프 버튼의 아이콘
   */
  megaJumpPrevIcon?: React.ReactNode;

  /**
   * 10페이지 다음 점프 버튼의 아이콘
   */
  megaJumpNextIcon?: React.ReactNode;
}

export interface PaginationState {
  current: number;
  currentInputValue: number;
  pageSize: number;
}
