import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CheckUsernameDto, SignUpDto, CreateOtpDto, VerifyOtpDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './security/guard/local-auth.guard';
import { Response, Request as RequestExpress } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('create-otp')
  createOtp(@Body() createOtpDto: CreateOtpDto, @Res() res: Response) {
    return this.authService.createOtp(createOtpDto, res);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Req() req: RequestExpress) {
    console.log(verifyOtpDto);
    console.log(req.cookies);
    return this.authService.verifyOtp(verifyOtpDto, req);
  }
}
