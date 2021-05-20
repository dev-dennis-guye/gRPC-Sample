import { readFileSync } from "fs";
import {
  sendUnaryData,
  ServerUnaryCall,
  Server,
  ServerCredentials,
} from "grpc";
import { IMathServiceServer, MathServiceService } from "./proto/math_grpc_pb";
import { Request, Response } from "./proto/math_pb";

/**
 * This class implements the rpc interface.
 */
class MathService implements IMathServiceServer {
  constructor() {}

  /**
   * An implementation of the add function defined in math.proto
   * @param call The request sent by the client
   * @param callback The call back used to send the result
   */
  add(call: ServerUnaryCall<Request>, callback: sendUnaryData<Response>) {
    const req = call.request;
    console.log(`processing request: ${JSON.stringify(req.toObject())}`);
    callback(null, new Response().setResult(req.getX() + req.getY()));
  }
}

export const service = {
  /**
   * The defintion of the service
   */
  definition: MathServiceService,
  instance: new MathService(),
};

export const createNewServer = () => {
  const server = new Server();
  /**
   * An instance of gRPC server needs to be supplied with a service definition
   * and implementation
   */
  server.addService(service.definition, service.instance);

  server.bind(
    "0.0.0.0:8080",
    /**
     * Secure the server using mutual tls
     */
    ServerCredentials.createSsl(
      readFileSync("./ssl/trusted-clients-collection"),
      [
        {
          private_key: readFileSync("ssl/server.key"),
          cert_chain: readFileSync("./ssl/server.crt"),
        },
      ]
    )
  );
  server.start();
  return server;
};
