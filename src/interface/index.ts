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
type DateAllowedTypes = string | Date | null;
export interface AbsenceRecord{
  admitterId: number | string;
  admitterNote: string;
  confirmedAt: DateAllowedTypes;
  createdAt:string | Date;
  crewId: number;
  endDate : string| Date | null;
  id: number;
  member : Member;
  memberNote:string | null;
  rejectedAt: DateAllowedTypes;
  startDate: string| Date;
  type: string;
  userId: number;
  [x: string | number | symbol]: unknown; // to handle the case when Absence API Response has a new properties.
}

export interface Member{
  crewId:number ;  
  id:number   ;
  image:string;   
  name:string;
  userId: number;
  [x: string | number | symbol]: unknown; // to handle the case when Absence API Response has a new properties.
}

export interface AbsenceApiResponse {
  rows: AbsenceRecord[];
  count :number;
}
