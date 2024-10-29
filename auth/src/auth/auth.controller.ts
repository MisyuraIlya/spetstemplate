import { Controller, Post, Body, Response, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string, @Body('name') name: string) {
    return this.authService.register(email, password, name);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Response() res: any,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = await this.authService.login(user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return res.status(200).json({
      message: 'Login successful',
      user: token.user,
    });
  }

  @Post('logout')
  async logout(@Response() res: any) {
    res.clearCookie('jwt');
    return res.status(200).json({ message: 'Logout successful' });
  }
}
