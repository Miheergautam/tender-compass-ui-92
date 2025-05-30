
export interface Tender {
  id: string;
  name: string;
  organisation: string;
  amount: number;
  compatibilityScore: number;
  location: string;
  deadline: string;
  category: string;
  workTypes: string[];
  savedDate?: string;
}
