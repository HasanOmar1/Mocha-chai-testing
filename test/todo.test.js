import * as chai from "chai";
import request from "supertest";
import server from "../server.js";

let app = request.agent(server);

const expect = chai.expect;

// i can do describe.only || it.only , to test only one thing

describe("Todo Get request", () => {
  describe("testing the GET request", () => {
    it("testing the GET request", (done) => {
      app.get("/api/v1/todos").end((err, res) => {
        // console.log(res.body);
        if (err) {
          done(err);
        }
        expect(res.body).to.be.an("array");
        done();
      });
    });

    it("Should verify that we have no todos", (done) => {
      app.get("/api/v1/todos").end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body).length(1);
        done();
      });
    });
  });
});

// describe("Todo POST request", () => {
//   it("Should add a new todo", (done) => {
//     app
//       .post("/api/v1/todos/add")
//       .send({ todo: "wew" })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         // console.log(res.body);
//         expect(res.status).to.equal(201);
//         expect(res.body.todo).to.equal("wew");
//         done();
//       });
//   });
// });

describe("Todo update request", () => {
  it("Should update todo by id", (done) => {
    app
      .put("/api/v1/todos/update/65c224cf5fb1b90e0545a938")
      .send({ todo: "kola" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.todo).to.equal("kola");
        done();
      });
  });
});

// describe("Todo DELETE request", () => {
//   it("Should delete todo by id", (done) => {
//     app.delete("/api/v1/todos/65c21f6fc03a9c2c87b7ad90").end((err, res) => {
//       if (err) {
//         done(err);
//       }

//       expect(res.status).to.be.equal(200); // if id not found it should return 404
//       done();
//     });
//   });
// });
