import chai from 'chai'
import chaiHttp from 'chai-http'
import server from './../src/server'
import path from 'path'

const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath})  

let should = chai.should()

process.env.NODE_ENV = 'test'
chai.use(chaiHttp)

describe('Weather', ()=>{
  describe('/GET city', ()=>{
    it('it should GET an object', (done)=>{
      chai.request(server)
        .get('/philadelphia/')
        .end((err, res)=>{
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })
  describe('/GET city/numberDay', ()=>{
    it('it should GET an object', (done)=>{
      chai.request(server)
        .get('/philadelphia/4')
        .end((err, res)=>{
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
    it('it should return 400 status when more than 5 days', (done)=>{
      chai.request(server)
        .get('/philadelphia/6')
        .end((err, res)=>{
          res.should.have.status(400)
          res.body.should.be.a('object')
          done()
        })
    })
  })
})
