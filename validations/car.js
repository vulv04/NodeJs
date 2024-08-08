import Joi from "joi";
const carValidator = Joi.object({
  title: Joi.string().required(),
  rate: Joi.number().required().min(0),
  description: Joi.string().required(),
  year: Joi.number().required(),
});
export { carValidator };
