import {Injectable} from '@nestjs/common';
import {CreatePaymentDto} from './dto/create-payment.dto';
import {UpdatePaymentDto} from './dto/update-payment.dto';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {Payment, PaymentDocument} from "./schema/payment.schema";

@Injectable()
export class PaymentService {

  constructor(@InjectModel(ModelName.PAYMENT) private paymentModel: Model<PaymentDocument>) {
  }

  wait(delay: number) {
    const time: number = Date.now() + delay
    let toRich = Date.now()
    while (toRich < time) {
      toRich = Date.now()
    }
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    this.wait(5000)
    const newPayment = new this.paymentModel({...createPaymentDto, reference: "uw7976eww65ww7689"})
    return newPayment.save()
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
