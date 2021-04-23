const {User, Hotel, Booking} = require("../models");
const {ForbiddenError} = require("apollo-server-express");
const AuthService = require("../service");

module.exports = {
  Query: {
    me: (_, __, {auth}) => {
      if (!auth.isAuth) {
        throw new ForbiddenError("ACCESS DENIED");
      }
      return User.findById(auth.userId);
    },
    users: () => User.find({}),
    user: (_, {id}) => User.findById(id),
    bookings: () => Booking.find(),
    userBooking: (_, {userId}) => Booking.find({user: userId}),
    hotelBooking: (_, {hotelId}) => Booking.find({hotel: hotelId}),
    hotels: (_, __) => Hotel.find(),
    hotel: (_, {id}) => Hotel.findById(id),
    hotelByName: (_, {name}) => Hotel.find({name}),
    hotelByCity: (_, {city}) => Hotel.find({city}),
  },
  Mutation: {
    signup: (_, {signupInput}) => new User(signupInput).save(),
    login: async (_, {loginInput: {email, password}}, {auth, res}) => {
      const user = await User.findOne({email});
      if (!user) {
        throw new Error("user not found");
      }

      if (password !== user.password) {
        throw new Error("password invalid");
      }

      const token = AuthService.createRefreshToken(user);
      AuthService.sendRefreshToken(res, token);

      return true;
    },
    logout: (_, __, {res}) => {
      AuthService.clearCookie(res);
      return true;
    },
    addBooking: async (_, { bookingInput }) => {
      const booking = await new Booking(bookingInput);
      return booking.save();
    },
    addHotel: async (_, {hotelInput}) => {
      const user = await new Hotel(hotelInput);
      return user.save();
    },
  },
  User: {
    fullName: (parent, _) => `${parent.firstName} ${parent.lastName}`,
  },
  Booking: {
    user: async (booking, _) => {
      return (await booking.populate("user").execPopulate()).user;
    },
    hotel: async (booking, _) => {
      return (await booking.populate("hotel").execPopulate()).hotel;
    },
  },
  Hotel: {
    address: (parent, _) => `${parent.street} ${parent.city} ${parent.postalCode}`,
  }
};
