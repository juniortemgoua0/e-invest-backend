import { Bet } from '../../bet/types/bet.interface';

export interface User {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  phone_number: string;

  password: string;

  qr_code: string;

  bets: Bet[];

  role: string;
}
