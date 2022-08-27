const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

var server = require("../app");
var Todo = require("../models/todomodel");

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);

describe('Todo API', function() {
        beforeEach(function(done) {
            var newTodo = new Todo({ text: 'Cook Indomie', status: true });
            newTodo.save(function(err) {
                done();
            });
        });

        afterEach(function(done) {
            // Todo.collection.drop().then(function() {
            // }).catch(function() {
            //     console.warn(' collection may not exists!');
            // })
            done();
        });

        it('should list ALL Todos on /todos GET', function(done) {
            chai.request(server)
                .get('/todos')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('text');
                    res.body[0].should.have.property('status');
                    res.body[0].should.have.property('_id');
                    done();
                });
        });

        it('should add a todo on /todos POST', function(done) {
            chai.request(server)
                .post('/todos')
                .send({
                    'text': 'Cook Indomie',
                    'status': true
                })
                .end(function(err, res) {

                    // the res object should have a status of 201
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('text');
                    res.body.should.have.property('status');
                    res.body.should.have.property('_id');
                    res.body.text.should.equal('Cook Indomie');
                    res.body.status.should.equal(true);
                    done();
                });
        });

        it('should update the status of a Todo on /todos/<id> PUT', function(done) {
            chai.request(server)
                .get('/todos')
                .end(function(err, res) {
                    chai.request(server)
                        .put('/todos/' + res.body[0]._id)
                        .send({
                            'text': 'Cook Indomie',
                            'status': false
                        })
                        .end(function(error, response) {
                            // the res object should have a status of 200
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a('object');
                            response.body.should.have.property('text');
                            response.body.should.have.property('status');
                            response.body.should.have.property('_id');
                            response.body.text.should.equal('Cook Indomie');
                            response.body.status.should.equal(false);
                            done();
                        });
                });
        });
        it('should delete a todo on /todo/<id> DELETE without Auth Token', function(done) {
            chai.request(server)
                .get('/todos')
                .end(function(err, res) {
                    chai.request(server)
                        .delete('/todos/' + res.body[0]._id)
                        .end(function(error, response) {
                            response.should.have.status(200);
                            done();
                        });
                });
        });
});