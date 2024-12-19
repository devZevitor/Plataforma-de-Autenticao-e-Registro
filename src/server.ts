import fastify, { FastifyInstance } from "fastify";
const server = fastify();
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import { CreateUser } from "./routes/postCreate-user";
import { getUsers } from "./routes/getList-users";
import { logintUser } from "./routes/postLogin-user";
import { getUser } from "./routes/getPerfil-user";
import { errorHandler } from "./erro-handler";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 3333;

server.register(fastifyCors, {origin: '*' })

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler(errorHandler);

server.register(CreateUser);
server.register(getUsers);
server.register(logintUser);
server.register(getUser);

server.listen({ port: Number(PORT) }).then(() => {
    console.log("Server is running!");
})