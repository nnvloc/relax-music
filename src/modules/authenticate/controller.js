import bcrypt from 'bcrypt';
import { UserService, AuthService } from '@services';

class AuthnticateController {
  async signUp(req, res, next) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      throw new Error('Missing required params');
    }

    const existedUser = await UserService.getUserByEmail(email);

    if (existedUser) {
      throw new Error('Email already used');
    }

    const cryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserService.createUser({
      email,
      firstName,
      lastName,
      password: cryptedPassword,
    });

    return res.json({
      success: true,
    });
  }

  async login(req, res, next) {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      throw new Error('Missing required params');
    }

    const existedUser = await UserService.getUserByEmail(email);

    if (!existedUser) {
      throw new Error("Wrong username or password");
    }

    const isValidPassword = existedUser.isValidPassword(password);

    if (!isValidPassword) {
      throw new Error('Wrong username or password');
    }

    const jwtToken = AuthService.generateJWTToken({
      id: existedUser.id,
      firstName: existedUser.firstName,
      lastName: existedUser.lastName,
    });

    res.json({
      success: true,
      user: existedUser.toJSON(),
      token: jwtToken,
    });
  }
}

export default new AuthnticateController();
