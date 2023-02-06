export interface Pagination {
  limit: number;
  page: number;
}
export interface AbsenceQueryParams {
  page: number;
  limit:number;
  type: string;
  createdAt: string;
  confirmedAt: string;
  rejectedAt: string;
  name: string;
  admitterNote: string;
  memberNote: string;
}
