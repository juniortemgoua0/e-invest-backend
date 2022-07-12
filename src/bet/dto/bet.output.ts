import {User} from "../../user/types/user.interface";


export interface Bet {
  id: string;

  bet_amount: number;

  balance_amount: number;

  available_amount: number;

  retained_amount: number;

  activeDuration: number;

  start_of_bet: Date;

  end_of_bet: Date;

  status: number;

  payment_reference: number;

}
