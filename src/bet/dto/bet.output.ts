import { User } from '../../user/types/user.interface';
import { Prop } from '@nestjs/mongoose';

export interface Bet {
  id: string;

  bet_amount: number;

  balance_amount: number;

  available_amount: number;

  retained_amount: number;

  withdraw_amount: number;

  is_validate: boolean;

  is_in_withdraw: boolean;

  activeDuration: number;

  start_of_bet: Date;

  end_of_bet: Date;

  status: number;

  payment_reference: number;
}
