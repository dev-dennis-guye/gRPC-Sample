import { MathServiceClient } from "./proto/math_grpc_pb";
import { credentials } from "grpc";
import { readFileSync } from "fs";

/**
 * A new authenticated gRPC client
 */
export const client = new MathServiceClient(
  "localhost:8080",
  // The credentials to be used when creating a new connection to the server
  // This configuration allows for mutual tls authentication, see https://en.wikipedia.org/wiki/Mutual_authentication#mTLS
  credentials.createSsl(
    // A file containing trusted server certificates concatenated together
    readFileSync("./ssl/trusted-servers-collection"),
    // The clients private key
    readFileSync("./ssl/client.key"),
    // The clients signed certificated
    readFileSync("./ssl/client.crt")
  )
);
