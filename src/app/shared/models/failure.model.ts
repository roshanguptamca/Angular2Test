export class Failure {
  id: number;
  type: number;
  source: number;
  service: string;
  region: string;
  state: string;
  cause: number;
  start_date: string;
  end_date: string;
  description: string;
  longDescription: string;
  criteria: string[];
}