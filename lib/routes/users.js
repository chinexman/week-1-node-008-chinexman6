"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var database_json_1 = __importDefault(require("/Users/decagon/Desktop/NodeAsign/week-6-node-008-chinexman/src/routes/database.json"));
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function (req, res, next) {
    database_json_1.default.sort(function (a, b) { return a.id - b.id; });
    console.log(database_json_1.default);
    res.status(200).json(database_json_1.default);
});
//module.exports = router;
exports.default = router;
