import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Car = mongoose.model("cars", carSchema);
export default Car;
