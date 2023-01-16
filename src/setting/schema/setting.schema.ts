import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ required: true, default: 3 })
  factor: number;

  @Prop({ required: true, default: 3 })
  timeOfBet: number;

  // @Prop({ required: true, default: 3 })
  // otpSave:;

  // @Prop({ required: true, default: 4 })
  // ascTime: number;
  //
  // @Prop({ required: true, default: 3 })
  // descTime: number;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
