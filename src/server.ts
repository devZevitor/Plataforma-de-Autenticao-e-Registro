


import fastify, { FastifyInstance } from "fastify";
const server = fastify();
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import { CreateUser } from "./routes/postCreate-user";
import { getUsers } from "./routes/getList-users";
import { logintUser } from "./routes/postLogin-user";
import { getUser } from "./routes/getPerfil-user";

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Criar mensagens de erro personalizadas para os usuarios
server.register(CreateUser);
server.register(getUsers);
server.register(logintUser);
server.register(getUser);

server.listen({ port: 3333 }).then(() => {
    console.log("Server is running!");
})