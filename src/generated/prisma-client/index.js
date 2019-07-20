"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Course",
    embedded: false
  },
  {
    name: "Term",
    embedded: false
  },
  {
    name: "Session",
    embedded: false
  },
  {
    name: "Prompt",
    embedded: false
  },
  {
    name: "Answer",
    embedded: false
  },
  {
    name: "Response",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4467`
});
exports.prisma = new exports.Prisma();
