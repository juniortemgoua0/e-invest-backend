import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetController } from './bet.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {BetSchema} from "./schema/bet.schema";

@Module({
  controllers: [BetController],
  providers: [BetService],
  imports: [
    MongooseModule.forFeature([{name:ModelName.BET, schema: BetSchema}])
  ]
})
export class BetModule {}
