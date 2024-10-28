export type Event = {
  id: number;
  clientName: string;
  memo: string;
  eventType: string;
  fromDate: Date;
  toDate: Date;
  numAttend: number;
  budget: number;
  decorations: boolean;
  parties: boolean;
  photos: boolean;
  meals: boolean;
  drinks: boolean;
  status: string;
  nextAction: string;
  finNote?: string;
  createdAt: Date;
};

export type TableEvent = {
  id: number;
  clientName: string;
  eventType: string;
  fromDate: Date;
  toDate: Date;
  status: string;
  nextAction: string;
  createdAt: Date;
}