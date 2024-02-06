import * as chai from "chai";
import request from "supertest";
import server from "../server.js";

let app = request.agent(server);

const expect = chai.expect;

// i can do describe.only || it.only , to test only one thing

describe("Todo query requests", () => {
  describe("Todo GET request", () => {
    it("Should check if I have data", (done) => {
      app.get("/api/v1/todos").end((err, res) => {
        expect(res.body).to.be.an("array");
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("Checks if we have no todos", (done) => {
      app.get("/api/v1/todos").end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).length(0);
        expect(res.body).to.be.empty;
        done();
      });
    });

    // describe("Todo POST request", () => {
    //   it("Should add a new todo", (done) => {
    //     app
    //       .post("/api/v1/todos/add")
    //       .send({ todo: "kola" })
    //       .end((err, res) => {
    //         if (err) {
    //           return done(err);
    //         }
    //         // console.log(res.body);
    //         expect(res.status).to.equal(201);
    //         expect(res.body.todo).to.equal("kola");
    //         done();
    //       });
    //   });
    // });

    // describe("Todo PUT request", () => {
    //   it("Should update todo by id", (done) => {
    //     app
    //       .put("/api/v1/todos/update/65c224cf5fb1b90e0545a938")
    //       .send({ todo: "weeew" })
    //       .end((err, res) => {
    //         if (err) {
    //           done(err);
    //         }
    //         expect(res.status).to.equal(200);
    //         expect(res.body.todo).to.equal("weeew");
    //         done();
    //       });
    //   });
    // });

    // describe("Todo DELETE request", () => {
    //   it("Should delete todo by id", (done) => {
    //     app.delete("/api/v1/todos/65c2326240bb10d73874222a").end((err, res) => {
    //       if (err) {
    //         done(err);
    //       }

    //       expect(res.status).to.be.equal(200); // if id not found it should return 404
    //       done();
    //     });
    //   });
    // });
  });
});
