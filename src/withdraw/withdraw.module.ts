import { Global, Module } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { WithdrawSchema } from './withdraw.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.WITHDRAW, schema: WithdrawSchema },
    ]),
  ],
  controllers: [WithdrawController],
  providers: [WithdrawService],
  exports: [MongooseModule],
})
export class WithdrawModule {}
