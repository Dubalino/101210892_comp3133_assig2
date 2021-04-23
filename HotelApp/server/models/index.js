const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    firstName: {type: Schema.Types.String, required: true},
    lastName: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true},
  },
  {timestamps: true}
);

const HotelSchema = new Schema(
  {
    name: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    price: {type: Number, required: true},
    email: {type: String, required: true},
  },
  {timestamps: true}
);

const BookingSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    hotel: {type: Schema.Types.ObjectId, ref: "Hotel", required: true},
    start: {type: String, required: true},
    end: {type: String, required: true},
  },
  {timestamps: true}
);


module.exports = {
  User: mongoose.model("User", UserSchema),
  Booking: mongoose.model("Booking", BookingSchema),
  Hotel: mongoose.model("Hotel", HotelSchema),
};
