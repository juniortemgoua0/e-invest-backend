import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { PaymentSchema } from './schema/payment.schema';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.PAYMENT, schema: PaymentSchema },
    ]),
  ],
})
export class PaymentModule {}
