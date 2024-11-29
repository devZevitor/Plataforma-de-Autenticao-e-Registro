


import fastify, { FastifyInstance } from "fastify";
const server = fastify();
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import { CreateUser } from "./routes/createUser";

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Criar mensagens de erro personalizadas para os usuarios
server.register(CreateUser);

server.listen({ port: 3333 }).then(() => {
    console.log("Server is running!");
})