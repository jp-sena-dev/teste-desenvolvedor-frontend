export const TypeDocument = {
  PROFESSIONAL: 'PROFESSIONAL',
  PATIENT: 'PATIENT',
};

type TypeDocument = 'PROFESSIONAL' | 'PATIENT';

type Document = {
  id: string,
  expedient: string,
  type: TypeDocument,
  url: string,
}

type activePrinciples = {
  id: string,
  name: string,
}

export interface Leaflet {
  id: string,
  name: string,
  published_at: Date,
  company: string,
  documents: Document[],
  active_principles: activePrinciples[]
}

export type FetchLeaflet = {
  first: number,
  prev?: number,
  next?: number,
  last?: number,
  pages?: number,
  items?: number,
  data: Leaflet[];
}

export interface Queryleaflet {
  id?: string;
  page?: number;
  name?: string;
  company?: string;
}