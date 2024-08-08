import Car from "../models/CarModel";
import { carValidator } from "../validations/car";
class CarController {
  async getAllCar(req, res) {
    try {
      const cars = await Car.find();
      res.status(200).json({
        message: "Done",
        data: cars,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async getDetailCar(req, res) {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(400).json({
          message: "Not found",
        });
      }
      res.status(200).json({
        message: "Done",
        data: car,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async createCar(req, res) {
    try {
      const { error } = carValidator.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      const car = await Car.create(req.body);
      return res.status(201).json({
        message: "Car created successfully",
        data: car,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Create car failure",
        error: error.message,
      });
    }
  }
  async updateCar(req, res) {
    try {
      const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!car) {
        return res.status(400).json({
          message: "Not found",
        });
      }
      res.status(200).json({
        message: "Done",
        data: car,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteCar(req, res) {
    try {
      const car = await Car.findByIdAndDelete(req.params.id);
      if (!car) {
        return res.status(400).json({
          message: "Not found",
        });
      }
      res.status(200).json({
        message: "Done",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
export default CarController;
