"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var User_1 = require("./entity/User");
var covid_1 = require("./entity/covid");
var app_data_source_1 = require("./app-data-source");
var puppeteer = require("puppeteer");
// establish database connection
app_data_source_1.default
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
var app = express();
app.use(express.json());
// register routes
app.get("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(User_1.User).find()];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [2 /*return*/];
            }
        });
    });
});
// app.get("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     return res.send(results)
// })
app.post("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(User_1.User).create(req.body)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, app_data_source_1.default.getRepository(User_1.User).save(user)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })
app.delete("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app_data_source_1.default.getRepository(User_1.User).delete(req.params.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
app.post("/covidData", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var browser, page, worldData, data, i, datatmp, temp, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 7, , 8]);
                            return [4 /*yield*/, puppeteer.launch({ headless: false })];
                        case 1:
                            browser = _a.sent();
                            return [4 /*yield*/, browser.newPage()];
                        case 2:
                            page = _a.sent();
                            console.log('Page opened');
                            return [4 /*yield*/, page.goto("https://www.worldometers.info/coronavirus/", { waitUntil: 'domcontentloaded' })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, page.waitForSelector("table#main_table_countries_today")];
                        case 4:
                            _a.sent();
                            console.log('Link opened');
                            return [4 /*yield*/, page.evaluate(function () {
                                    var tbody = document.querySelector("table#main_table_countries_today tbody");
                                    var trs = Array.from(tbody.querySelectorAll("tr:not(.total_row_world)"));
                                    console.log("trs", trs);
                                    var worldData = [];
                                    for (var _i = 0, trs_1 = trs; _i < trs_1.length; _i++) {
                                        var tr = trs_1[_i];
                                        var tds = Array.from(tr.querySelectorAll("td"));
                                        var data_1 = tds.slice(1, 15).map(function (td) { return td.innerText; });
                                        worldData.push(data_1);
                                    }
                                    return worldData;
                                })];
                        case 5:
                            worldData = _a.sent();
                            console.log("worldData", worldData);
                            data = [];
                            for (i = 0; i < worldData.length; i++) {
                                datatmp = worldData[i];
                                temp = {
                                    "Country": datatmp[0],
                                    "TotalCases": datatmp[1],
                                    "NewCases": datatmp[2],
                                    "TotalDeaths": datatmp[3],
                                    "NewDeaths": datatmp[4],
                                    "TotalRecovered": datatmp[5],
                                    "NewRecovered": datatmp[6],
                                    "ActiveCases": datatmp[7],
                                    "Serious": datatmp[8],
                                    "TotCases": datatmp[9],
                                    "TotalTests": datatmp[10],
                                    "Testspop": datatmp[11],
                                    "Population": datatmp[12],
                                };
                                data.push(temp);
                            }
                            console.log("data", data);
                            return [4 /*yield*/, app_data_source_1.default
                                    .createQueryBuilder()
                                    .insert()
                                    .into(covid_1.Covid)
                                    .values(data)
                                    .execute()];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
});
// start express server
app.listen(3000);
