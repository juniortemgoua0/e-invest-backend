import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CheckUsernameDto, CreateOtpDto, SignUpDto, VerifyOtpDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ModelName, Role } from '../helpers';
import { Twilio } from 'twilio';
import * as OtpGenerator from 'otp-generator';
import { Request as RequestExpress, Response } from 'express';
import { ConfigService } from '@nestjs/config';

export enum UserStatusType {
  USER = 'user',
  STUDENT = 'student',
  PERSONNEL = 'personnel',
}
const phoneRegex = /^6(?=[579])([0-9]{8})/;
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ModelName.USER)
    private readonly userModel: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { confirm_password, ...result } = signUpDto;

    const checkUser = await this.userModel.findOne({
      phone_number: signUpDto.phone_number,
    });

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
    const payload = { role: user?.role, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
      id: user?._id,
      role: user['role'] ? user['role'] : Role.USER,
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

  async createOtp(createOtpDto: CreateOtpDto, res: Response): Promise<any> {
    if (!createOtpDto.phoneNumber.match(phoneRegex)) {
      throw new HttpException(
        'Numéro de téléphone invalide fourni',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const client = new Twilio(
      this.configService.get<string>('TWILO_USERNAME'),
      this.configService.get<string>('TWILO_PASSWORD'),
    );

    const otp = OtpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.cookie('OTP', otp, {
      maxAge: 5 * 60 * 1000,
    });

    const result = await client.messages.create({
      from: '+16692793450',
      to: `+237${createOtpDto.phoneNumber}`,
      body: `Renseigner le code suivant pour verifier votre numéro de téléphone : ${otp}`,
    });
    return res.send(result);
  }

  verifyOtp(verifyOtpDto: VerifyOtpDto, req: RequestExpress) {
    const otp = req.cookies['OTP'];
    if (!otp) {
      throw new HttpException(
        'Le délai de validité a expiré',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(otp, verifyOtpDto.otp);
    if (otp !== verifyOtpDto.otp.toString()) {
      throw new HttpException('Otp invalide', HttpStatus.NOT_ACCEPTABLE);
    }

    return {
      otp: otp,
      message: 'success',
    };
  }
}
