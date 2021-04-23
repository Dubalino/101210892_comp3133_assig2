const {gql} = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    email: String!
  }

  type Hotel {
    id: ID!
    name: String!
    street: String!
    city: String!
    postalCode: String!
    price: Float!
    email: String!
    createdAt: String!
    updatedAt: String!
    address: String!
  }

  type Booking {
    id: ID!
    user: User!
    hotel: Hotel!
    start: String!
    end: String!
    createdAt: String!
    updatedAt: String!
  }

  type Token {
    token: String!
  }

  input BookingInput {
    user: ID!
    hotel: ID!
    start: String!
    end: String!
  }

  input HotelInput {
    name: String!
    street: String!
    city: String!
    postalCode: String!
    price: Float!
    email: String!
  }

  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
    users: [User]
    user(id: ID!): User
    hotels: [Hotel]
    hotel(id: ID!): Hotel
    hotelByName(name: String!): [Hotel]
    hotelByCity(city: String!): [Hotel]
    bookings: [Booking]
    userBooking(userId: ID!): [Booking]
    hotelBooking(hotelId: ID!): [Booking]
  }

  
  type Mutation {
    signup(signupInput: SignupInput!): User
    login(loginInput: LoginInput!): Boolean!
    logout: Boolean!
    addHotel(hotelInput: HotelInput!): Hotel
    addBooking(bookingInput: BookingInput!): Booking
  }
`;
