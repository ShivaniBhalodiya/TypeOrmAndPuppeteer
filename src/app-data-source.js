"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var covid_1 = require("./entity/covid");
var User_1 = require("./entity/User");
var myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [User_1.User, covid_1.Covid],
    synchronize: true,
});
exports.default = myDataSource;
