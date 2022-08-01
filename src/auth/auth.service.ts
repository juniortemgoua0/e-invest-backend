import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CheckUsernameDto, SignUpDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ModelName } from '../helpers';

export enum UserStatusType {
  USER = 'user',
  STUDENT = 'student',
  PERSONNEL = 'personnel',
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ModelName.USER)
    private readonly userModel: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { confirm_password, ...result } = signUpDto;

    const checkUser =
      (await this.userModel.findOne({ email: signUpDto.email })) ||
      (await this.userModel.findOne({ phone_number: signUpDto.phone_number }));

    if (checkUser) {
      throw new HttpException(
        'Ce numéro de téléphone est déja utilisé',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (signUpDto.password !== confirm_password) {
      throw new HttpException(
        'Les mot ne correspondent pas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(signUpDto.password, salt);

    const newUSer = await new this.userModel({
      ...result,
      password: hashPassword,
    }).save();

    // generation de l'identifiant qr_code
    const qr_code = await bcrypt.hash(
      newUSer.phone_number + '-' + newUSer._id,
      salt,
    );

    return this.userService.updateUser(newUSer._id, {
      ...signUpDto,
      password: hashPassword,
      qr_code: qr_code,
    });
  }

  signIn(user: any) {
    const payload = { role: user?._id, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
      id: user?._id,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user['password']);
      if (user && isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
