import { createNewServer } from "./server";
import { client } from "./client";
import { Request } from "./proto/math_pb";

void (async () => {
  const server = createNewServer();

  console.log("Requesting server compute 1+2");
  client.add(new Request().setX(1).setY(2), (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Expected: 3 \nActually: ${response.getResult()}`);
    }
    server.tryShutdown(() => {
      process.exit(0);
    });
  });
})();
