 //import request from 'supertest';
//  import app from '../../src/app';
const request = require('supertest')
 const app = require("../../src/app").default




describe('GET /companys', ()=>{
    describe('should get  companys data', ()=>{
   //should respond with a json object array;

   it ('should get all companys' , async()=>{
        await request(app).get('/api/companys').expect("Content-Type", "application/json; charset=utf-8").expect(200);
   })

   it ('should get a company' , async()=>{
    await request(app).get('/api/companys/1').expect("Content-Type", "application/json; charset=utf-8").expect(200);
})

it ('should get a company that is missing' , async()=>{
   await request(app).get('/api/companys/30').expect(404);
})
    })
})

describe('POST /companys', ()=>{
    describe('given a company name', ()=>{
        // should save the company name and other data
       // should respond with a json object  the company id
       // should respond with a status code of 400

       test('should respond with a 200 status code with success post', async()=>{
            await request(app).post('/api/companys').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8").expect(201)
          })

       test('should respond with a 400 status code with empty post', async()=>{
        await request(app).post('/api/companys').send({}).expect(400)
         })
          
                      // should specify json in the content type header
         test('should specify json in the content type header', async()=>{
            await request(app).post('/api/companys').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8")
          })


    })

})




describe('PUT /company', ()=>{
    describe('should put a company', ()=>{
        //should respond with a json object array;
        test('should respond with a 201 status code with success put', async()=>{
            await request(app).put('/api/companys/1').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8").expect(201)
          })

       test('should respond with a 400 status code with empty put', async()=>{
        await request(app).put('/api/companys/1').send({}).expect(201)
         })
          
                      // should specify json in the content type header
         test('should specify json in the content type header', async()=>{
            await request(app).put('/api/companys/1').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8")
          })
          test('should specify json in the content type header with empty body', async()=>{
            await request(app).put('/api/companys/1').send({}).expect("Content-Type", "application/json; charset=utf-8")
          })
       
         })

})

describe(' delete/company', ()=>{
  describe('should delete a company', ()=>{
      //should respond with a json object array;
      test('should respond with a 200 status code with success delete', async()=>{
          await request(app).delete('/api/companys/1').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8").expect(200)
        })

    //  test('should respond with a 400 status code with empty put', async()=>{
    //   await request(app).put('/api/companys/').send({}).expect(4)
    //    })
        
       it ('should respond with a 400 status when a company id is not found' , async()=>{
        await request(app).delete('/api/companys/30').expect(404);
     })
     
       })

})