const { Query } = require("./Query");
const { Mutation } = require("./Mutation");
const { Course } = require("./Course");
const { User } = require("./User");

exports.resolvers = {
  Query,
  Mutation,
  Course,
  User
};
