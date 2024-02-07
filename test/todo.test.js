import * as chai from "chai";
import request from "supertest";
import server from "../server.js";
import Todo from "../models/todoModel.js";

let app = request.agent(server);

const expect = chai.expect;

// more info in setup.test.js

// describe('hooks', function () {
//   before(function () {
//     // runs once before the first test in this block
//   });

//   after(function () {
//     // runs once after the last test in this block
//   });

//   beforeEach(function () {
//     // runs before each test in this block
//   });

//   afterEach(function () {
//     // runs after each test in this block
//   });

//   // test cases
// });

// describe = suite
// it = test
// integration testing = involves API
// unit testing = focuses on testing individual units/functions
// i can do describe.only || it.only , to test only one test / suite
// i can do describe.skip || it.skip , to skip one test / suite

describe("Todo query requests", () => {
  describe("Todo GET request", () => {
    it("Should check if I have data", (done) => {
      app.get("/api/v1/todos").end((err, res) => {
        expect(res.body).to.be.an("array");
        expect(res.status).to.equal(200);
        done();
      });
    });

    // it("Checks if we have no todos", (done) => {
    //   app.get("/api/v1/todos").end((err, res) => {
    //     expect(res.status).to.equal(200);
    //     expect(res.body).length(0);
    //     expect(res.body).to.be.empty;
    //     done();
    //   });
    // });

    describe("Todo POST request", () => {
      // runs once before the first test in this block
      before((done) => {
        Todo.deleteOne({ todo: "test" })
          .then(() => done())
          .catch((err) => done(err));
      });

      it("Should add a new todo", (done) => {
        app
          .post("/api/v1/todos/add")
          .send({ todo: "test" })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            // console.log(res.body);
            expect(res.status).to.equal(201);
            expect(res.body.todo).to.equal("test");
            done();
          });
      });

      //
      it("Should return 400 for not providing a todo", (done) => {
        app
          .post("/api/v1/todos/add")
          .send({ todo: "" })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            // console.log(res.body.message);
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal("ADD A TODO");
            done();
          });
      });
    });

    describe("Todo PUT request", () => {
      // it("Should update todo by id", (done) => {
      //   app
      //     .put("/api/v1/todos/update/65c24ca7053083463a03c844") // put available id.
      //     .send({ todo: "weeew" })
      //     .end((err, res) => {
      //       if (err) {
      //         done(err);
      //       }
      //       expect(res.status).to.equal(200);
      //       expect(res.body.todo).to.equal("weeew");
      //       done();
      //     });
      // });

      it("should return 404 for not providing id / wrong id", (done) => {
        app
          .put("/api/v1/todos/update")
          .send({ todo: "weeew" })
          .end((err, res) => {
            if (err) {
              done(err);
            }
            // console.log(res.body);
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal("This todo is not on the list");
            done();
          });
      });
    });

    describe("Todo DELETE request", () => {
      // it("Should delete todo by id", (done) => {

      //   app.delete("/api/v1/todos/65c35fdcf03f9a8bc5a63ba4").end((err, res) => {
      //     if (err) {
      //       done(err);
      //     }

      //     expect(res.status).to.be.equal(200);
      //     done();
      //   });
      // });

      it("Should return 404 because id not found/provided", (done) => {
        app.delete("/api/v1/todos").end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal("This todo is not on the list");
          done();
        });
      });
    });
  });
});
