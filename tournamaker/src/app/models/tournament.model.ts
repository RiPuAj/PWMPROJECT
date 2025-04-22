export interface Tournament {
  id: number;
  name: string;
  teams_num: number;
  date: string;
  description: string;
  image: string;
  place: string;
  organizer: string;
  entry_tax: string;
  prize_pool: string;
  participants: string[];
}
