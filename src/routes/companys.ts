import express from 'express';
const app = express();
import Joi, { exist } from 'joi';
const router = express.Router();
import fs  from 'fs';
import path from 'path'

//import companys from './database.json';


app.use(express.json());
 
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

const companyDb = path.join(__dirname,"./database.json")
const getCompanys = ()=> {
 if( !fs.existsSync(companyDb) ){
 fs.writeFileSync(companyDb, JSON.stringify([]) )
 }
 return JSON.parse( fs.readFileSync(companyDb, "utf-8"))
}

const companys = getCompanys();

router.get('/', function (req, res,next) {
  companys.sort((a:{id:number},b:{id:number})=>a.id - b.id);
  //console.log(companys);
  res.status(200).json(companys);
})


router.get('/:id', function (req, res) {
  const company = companys.find((c:{id:number})=>c.id ===parseInt(req.params.id))
  if(!company) return res.status(404).send('The company with the given id was not found');
res.status(200).send(company);
})

router.post('/', function(req, res){

  


  if(!req.body.organization){
    return res.status(400).send('Organisation Name is required');
  }
  console.log(req.body);
// console.log(req.body.organization.length);
const company ={
id: companys.length + 1,
organization: req.body.organization,
createdAt:new Date().toISOString(),
updatedAt: new Date().toISOString(),
products: req.body.products,
marketValue: req.body.marketValue,
address: req.body.address,
ceo: req.body.ceo,
country: req.body.country,

noOfEmployees:req.body.noOfEmployees,
employees:req.body.employees
}
companys.push(company);
fs.writeFileSync(companyDb, JSON.stringify(companys, null, " ") );

res.status(201).send(company);

})



router.put('/:id', function(req, res){
  // const result = validateCompany(req.body);
//const { error} = validateCompany(req.body);
// if(error){
 // return res.status(400).send(error.details[0].message);
//}

  const  updateCompany = companys.find((c:{id:number})=>c.id ===parseInt(req.params.id))
  if(!updateCompany) return res.status(404).send('The company with the given id was not found');
// res.send(company);
console.log(req.body);

updateCompany.organization= req.body.organization || updateCompany.organization,
updateCompany.updatedAt=new Date().toISOString(),
updateCompany.products=req.body.products || updateCompany.products,
updateCompany.marketValue=req.body.marketValue || updateCompany.marketValue,
updateCompany.address = req.body.address || updateCompany.address,
updateCompany.ceo =req.body.ceo || updateCompany.ceo,
updateCompany.country = req.body.country || updateCompany.country,

updateCompany.noOfEmployees = req.body.noOfEmployees || updateCompany.noOfEmployees,
updateCompany.employees =req.body.employees || updateCompany.employees

companys.push(updateCompany);
fs.writeFileSync(companyDb, JSON.stringify(companys, null, " ") );

res.status(201).json(updateCompany);

});


router.delete('/:id', function (req, res) {
  const deleteCompany = companys.find((c:{id:number})=>c.id ===parseInt(req.params.id))
  if(!deleteCompany) return res.status(404).send('The company with the given id was not found');

  const index = companys.indexOf(deleteCompany);
  companys.splice(index,1)
  fs.writeFileSync(companyDb, JSON.stringify(companys, null, " ") );
res.send(deleteCompany);
})

// function validateCompany(company:any){
//   const schema ={
//       organisation:Joi.string().min(3).required()
//      }
//      return  Joi.valid(company, schema);

// }

//module.exports = router;
export default router
  //
// const result = validateCompany(req.body);
//const { error} = validateCompany(req.body);
// if(error){
 // return res.status(400).send(error.details[0].message);
//}