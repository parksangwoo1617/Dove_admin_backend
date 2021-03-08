'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('API Endpoint Test', () => {
    describe('LOGIN request on /login', () => {
        it('should return login', (done) => {
            let code = 'abc123';
            chai.request(server)
                .post('/user/login')
                .send(code)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('GET request on /post/get', () => {
        it('should return post', (done) => {
            chai.request(server)
                .get('/post/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('GET request on /post/get/:id', () => {
        it('should return post/:id', (done) => {
            chai.request(server)
                .get('/post/get/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('POST request on /post/post with data', () => {
        it('should return 301', (done) => {
            let params = {
                title: 'title2',
                writer: 'sangwoo2',
                description: 'description2',
                event_date: '2020-03-08',
                link: 'link2'
            };
            chai.request(server) 
                .post('/post/post')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('PUT request on /post/update with data', () => {
        it('should return update data', (done) => {
            let params = {
                host: '섬밋수정',
                title: '제목수정',
                writer: 'sangwoo수정',
                description: '설명수정',
                event_date: '2020-02-19',
                link: "수정 링크"
            };
            chai.request(server)
                .patch('/post/update/1')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.equal(params);
                    done();
                });
        });
    });

    describe('DELETE request on /post/delete', () => {
        it('should return deleted post', (done) => {
            chai.request(server)
                .delete('/post/delete/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.id.should.equal('1');
                    done();
                });
        });
    });

    describe('request on unknown url', () => {
        it('should return 404', (done) => {
            chai.request(server)
                .get('/nowhere')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    describe('request on /user/logout', () => {
        it('should return status code 302', () => {
            chai.request(server)
                .get('/user/logout')
                .end((err, res) => {
                    res.should.have.status(200);
                });
        });
    });
});