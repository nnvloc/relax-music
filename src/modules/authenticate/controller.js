import bcrypt from 'bcrypt';
import { AuthService } from '@services';

class AuthnticateController {

  async login(req, res, next) {
    const jwtToken = AuthService.generateJWTToken({
      secretKey: 'ThachSungRelaxMusic'
    });

    res.json({
      success: true,
      token: jwtToken,
    });
  }
}

export default new AuthnticateController();
