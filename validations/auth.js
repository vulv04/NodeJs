// validations/auth.js

import Joi from "joi";

// Mẫu xác thực cho việc đăng ký người dùng
const registerValidator = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Tên người dùng là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Địa chỉ email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().required().min(6).max(20).messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "string.max": "Mật khẩu không được vượt quá 20 ký tự",
    "any.required": "Mật khẩu là bắt buộc",
  }).options({ abortEarly: false }),
});

// Mẫu xác thực cho việc đăng nhập người dùng
const loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Địa chỉ email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().required().min(6).max(20).messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "string.max": "Mật khẩu không được vượt quá 20 ký tự",
    "any.required": "Mật khẩu là bắt buộc",
  }).options({ abortEarly: false }),
});

export { registerValidator, loginValidator };
