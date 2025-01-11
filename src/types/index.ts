import { Dayjs } from "dayjs";

export type EmailTemplateType =
  | "GLOBAL"
  | "SESSION_SIGN_UP"
  | "SESSION_REMINDER"
  | "SURVEY";

export type Pageable<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type EntityDto = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  active: boolean;
  name: string;
};

export type Entity = Omit<EntityDto, "createdAt" | "updatedAt"> & {
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type OtherParamDto = EntityDto;

export type OtherParam = Entity;

export type UpdateOtherParamDto = {
  name: string;
}
