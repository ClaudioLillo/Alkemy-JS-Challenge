/*  Unit Testing for API */
const request = require('supertest')
const app = require('../src/app')

let  token = ""

describe('API Information',()=>{
    it('respond with json', done =>{
        request(app)
            .get('/')
            .set("Accept", "application/json")
            .expect('Content-Type',/json/)
            .expect('Content-Length','54')
            .expect(200, done)
    })
})

describe('/api/register',()=>{

    
    it('new user is able to register', (done)=>{
        const data = {
            name: "Carl",
            lastName: "Carlson",
            email: "carl@carlson.com",
            password: "password"
        }
        request(app)
            .post('/api/register')
            .send(data)
            .set("Accept", "application/json")
            .expect('Content-Type',/json/)
            .end((err,res)=>{
                if(res.status==="409"){
                    console.log("User already exists on database")
                    done()
                }
                else if(res.status==="201"){
                    console.log(res.body)
                    done()
                }
                else{
                    done(err)
                }
            })

    })

    it('user must provide a valid email to register', (done)=>{
        const data = {
            name: "Carl",
            lastName: "Carlson",
            email: "carlcarlson",
            password: "password"
        }
        request(app)
            .post('/api/register')
            .send(data)
            .set("Accept", "application/json")
            .expect('Content-Type',/json/)
            .expect(500, done)

    })

    it('user cannot register with a previoulsy used email', (done)=>{
        let data = {
            name: "Carl",
            lastName: "Carlson",
            email: "carl@carlson.com",
            password: "password"
        }
        request(app)
            .post('/api/register')
            .send(data)
            .set("Accept", "application/json")
            .expect('Content-Type',/json/)
            .expect(409, done)
    })
})

describe('/api/login',()=>{
    it('registered user is able to login', (done)=>{
        let data = {
            email: "carl@carlson.com",
            password: "password"
        }
        request(app)
            .post('/api/login')
            .send(data)
            .set("Accept", "application/json")
            .expect('Content-Type',/json/)
            .expect(200)
            .end((err, res)=>{
                if(res){
                    token = res.body.token
                    console.log("token: ",token)
                    done()
                }
                if(err){
                    done(err)
                }
                
            })
    })
})

describe('/api/transactions',()=>{
    it('authorized user can create a transaction',(done)=>{
        let data = {
            amount : "3000", 
            category : "entry",
            date : "2020-02-14", 
            concept : "salary"
        }
        request(app)
            .post('/api/transactions')
            .send(data)
            .set({'x-access-token': token, 'Accept' : 'application/json'})
            .expect('Content-Type',/json/)
            .expect(201, done)
    })

    it('unauthorized user can not create a transaction',(done)=>{
        let data = {
            amount : "3000", 
            category : "entry",
            date : "2020-02-14", 
            concept : "salary"
        }
        let invalidToken = 'thisIsNotAValidToken'
        request(app)
            .post('/api/transactions')
            .send(data)
            .set({'x-access-token': invalidToken, 'Accept' : 'application/json'})
            .expect('Content-Type',/json/)
            .expect(403, done)
    })

    it('user can get their own transactions',(done)=>{
        request(app)
            .get('/api/transactions')
            .set({'x-access-token': token, 'Accept' : 'application/json'})
            .expect('Content-Type',/json/)
            .expect(200)
            .end((err, res)=>{
                if(err) {return done(err)}
                if(res){
                    console.log(res.body)
                    done()
                }
            })
    })

    it('user can get update one transaction',(done)=>{
        let data = {
            id : "1",
            amount : "6000", 
            category : "entry",
            date : "2023-03-15", 
            concept : "updated salary"
        }
        request(app)
            .put('/api/transactions')
            .send(data)
            .set({'x-access-token': token, 'Accept' : 'application/json'})
            .expect('Content-Type',/json/)
            .expect(200)
            .end((err, res)=>{
                if(err) {return done(err)}
                if(res){
                    console.log(res.body)
                    done()
                }
            })
    })

    it('user can delete transaction',(done)=>{
        let data = {id : "1"}
        request(app)
            .delete('/api/transactions')
            .send(data)
            .set({'x-access-token': token, 'Accept' : 'application/json'})
            .expect(204, done)
    })
})



