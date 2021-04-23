const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resovlers");
const authCtx = require("./context")

const app = express();
const PORT = process.env.PORT || 4100;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));
app.use(cookieParser());

const server = new ApolloServer({typeDefs, resolvers,
  context: async ({ req, res }) => {
    return {
      req,
      res,
      auth: authCtx(req),
    };
  },
});

server.applyMiddleware({app, cors: false});

mongoose.connect("MONGO_URL=mongodb://localhost:27017/hotels", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(result => {
    console.log("mongodb connected")
  })
  .catch(err => console.log("mongodb failed", err))


app.listen(PORT, () => console.log(`🚀 GraphQL Server running on port: http://localhost:${PORT}/graphql`));
