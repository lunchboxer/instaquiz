const { auth } = require("./auth");
const { term } = require("./term");
const { course } = require("./course");

exports.Mutation = {
  ...auth,
  ...term,
  ...course
};
