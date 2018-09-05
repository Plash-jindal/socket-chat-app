var request = require("request");

describe("get messages", () => {
  it("should return 200 OK", done => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
  it("should return a list thats not empty", done => {
    request.get("http://localhost:3000/messages", (err, res) => {
      var data = JSON.parse(res.body);
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });
});
