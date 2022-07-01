import {Global, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.schema";
import {ModelName} from "../helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.USER, schema: UserSchema}])
    ],
    exports: [MongooseModule, UserService],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {
}
