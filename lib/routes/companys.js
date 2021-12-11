"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var router = express_1.default.Router();
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
//import companys from './database.json';
app.use(express_1.default.json());
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// let companys :any
// fs.exists('/Users/decagon/Desktop/NodeAsign/week-6-node-008-chinexman/src/routes/database.json',(exists)=>{
//   if(exists){
//     companys = fs.readFileSync('/Users/decagon/Desktop/NodeAsign/week-6-node-008-chinexman/src/routes/database.json');
//   }else{
//     companys = [];
//   }
// })
var companyDb = path_1.default.join(__dirname, "./database.json");
var getCompanys = function () {
    if (!fs_1.default.existsSync(companyDb)) {
        fs_1.default.writeFileSync(companyDb, JSON.stringify([]));
    }
    return JSON.parse(fs_1.default.readFileSync(companyDb, "utf-8"));
};
var companys = getCompanys();
router.get('/', function (req, res, next) {
    companys.sort(function (a, b) { return a.id - b.id; });
    //console.log(companys);
    res.status(200).json(companys);
});
router.get('/:id', function (req, res) {
    var company = companys.find(function (c) { return c.id === parseInt(req.params.id); });
    if (!company)
        return res.status(404).send('The company with the given id was not found');
    res.status(200).send(company);
});
router.post('/', function (req, res) {
    if (!req.body.organization) {
        return res.status(400).send('Organisation Name is required');
    }
    console.log(req.body);
    // console.log(req.body.organization.length);
    var company = {
        id: companys.length + 1,
        organization: req.body.organization,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: req.body.products,
        marketValue: req.body.marketValue,
        address: req.body.address,
        ceo: req.body.ceo,
        country: req.body.country,
        noOfEmployees: req.body.noOfEmployees,
        employees: req.body.employees
    };
    companys.push(company);
    fs_1.default.writeFileSync(companyDb, JSON.stringify(companys, null, " "));
    res.status(201).send(company);
});
router.put('/:id', function (req, res) {
    // const result = validateCompany(req.body);
    //const { error} = validateCompany(req.body);
    // if(error){
    // return res.status(400).send(error.details[0].message);
    //}
    var updateCompany = companys.find(function (c) { return c.id === parseInt(req.params.id); });
    if (!updateCompany)
        return res.status(404).send('The company with the given id was not found');
    // res.send(company);
    //console.log(req.body);
    var index = companys.indexOf(updateCompany);
    companys.splice(index, 1);
    updateCompany.organization = req.body.organization || updateCompany.organization,
        updateCompany.updatedAt = new Date().toISOString(),
        updateCompany.products = req.body.products || updateCompany.products,
        updateCompany.marketValue = req.body.marketValue || updateCompany.marketValue,
        updateCompany.address = req.body.address || updateCompany.address,
        updateCompany.ceo = req.body.ceo || updateCompany.ceo,
        updateCompany.country = req.body.country || updateCompany.country,
        updateCompany.noOfEmployees = req.body.noOfEmployees || updateCompany.noOfEmployees,
        updateCompany.employees = req.body.employees || updateCompany.employees;
    console.log(companys);
    companys.push(updateCompany);
    console.log(companys);
    fs_1.default.writeFileSync(companyDb, JSON.stringify(companys, null, " "));
    res.status(201).json(updateCompany);
});
router.delete('/:id', function (req, res) {
    var deleteCompany = companys.find(function (c) { return c.id === parseInt(req.params.id); });
    if (!deleteCompany)
        return res.status(404).send('The company with the given id was not found');
    var index = companys.indexOf(deleteCompany);
    companys.splice(index, 1);
    fs_1.default.writeFileSync(companyDb, JSON.stringify(companys, null, " "));
    res.send({
        status: "This data has been deleted successfully",
        deleteCompany: deleteCompany
    });
});
// function validateCompany(company:any){
//   const schema ={
//       organisation:Joi.string().min(3).required()
//      }
//      return  Joi.valid(company, schema);
// }
//module.exports = router;
exports.default = router;
//
// const result = validateCompany(req.body);
//const { error} = validateCompany(req.body);
// if(error){
// return res.status(400).send(error.details[0].message);
//}
