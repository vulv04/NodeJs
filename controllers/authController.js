import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { registerValidator, loginValidator } from "../validations/auth";
class AuthController {
  async register(req, res) {
    try {
      const { email, username, password } = req.body;

      // Validate input
      const { error } = registerValidator.validate(req.body);
      abortEarly: false;
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }

      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ message: "Email đã được đăng ký" });
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({
        email,
        username,
        password: hashPassword,
      });

      res.status(201).json({
        message: "Đăng ký thành công",
        data: { ...user.toObject(), password: undefined },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { error } = loginValidator.validate(req.body);
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Tài khoản không tồn tại" });
      }

      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Mật khẩu không chính xác" });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Đăng nhập thành công",
        token,
        user: { ...user.toObject(), password: undefined },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default AuthController;
