const request = require('supertest');
const expect = require('chai').expect;
const app = require('../dist/app'); 

const validUserCredentials = {
    username: `${Math.random(100000)}`,
    password: "express",
};

 describe('POST /api/users/register', ()=> {
    it ('should get username',  (done)=> {
        request(app)
            .post('/api/users/register') 
            .send({
                "username": validUserCredentials.username,
                "password": validUserCredentials.password
            })
            .expect(200)
            .end((err, res)=>{
                expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo')
                if (err) throw err;
                expect(res.body.data.username).to.equal(validUserCredentials.username)
                done();
            })
    })
});


describe('POST /api/users/login', ()=> {
    it ('should get username',  (done)=> {
        request(app)
            .post('/api/users/login') 
            .send({
                "username": validUserCredentials.username,
                "password": validUserCredentials.password
            })
            .expect(200)
            .end((err, res)=>{
                if (err) throw err;
                next(res.body.data.token);
                expect(res.body.data.username).to.equal(validUserCredentials.username)
                done();
            })
    })
});

function next(jwt){
    describe('POST /api/dynamic/createDynamic', ()=> {
        it ('should get username',  (done)=> {
            request(app)
                .post('/api/dynamic/createDynamic') 
                .set("Authorization", jwt)
                .send({
                    "username": validUserCredentials.username,
                    "avatar" : 'http://',
                    "dynamicContent": "123",
                    "visibleUsers": validUserCredentials.username,
                    "dynamicPic": ['http://12','http://124']
                })
                .expect(200)
                .end((err, res)=>{
                    if (err) throw err;
                    expect(res.body.data.username).to.equal(validUserCredentials.username)
                    done();
                    nextDynmaicDetail(jwt,res.body.data._id)
                })
        })
    });    

    describe('get /api/dynamic/getDynamicList', ()=> {
        it ('should get Array',  (done)=> {
            request(app)
                .get(`/api/dynamic/getDynamicList?username=${validUserCredentials.username}`) 
                .set("Authorization", jwt)
                .expect(200)
                .end((err, res)=>{
                    if (err) throw err;
                    expect(res.body.data.result).to.be.an.instanceof(Array)
                    done();
                })
        })
    });
}


function nextDynmaicDetail(jwt , id){
    describe('get /api/dynamic/getDynamicDetail', ()=> {
        it ('should get username',  (done)=> {
            request(app)
                .get(`/api/dynamic/getDynamicDetail?id=${id}`) 
                .set("Authorization", jwt)
                .expect(200)
                .end((err, res)=>{
                    if (err) throw err;
                    expect(res.body.data[0].username).to.equal(validUserCredentials.username)
                    done();
                })
        })
    });

}
