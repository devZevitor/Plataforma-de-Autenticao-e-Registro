import { FastifyInstance } from "fastify";
import z from "zod";
import {prisma} from "../lib/prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Clienterror } from "../erros/Client-erro";

    export async function logintUser(server:  FastifyInstance){
        server.withTypeProvider<ZodTypeProvider>().post("/usuarioLogin", {
            schema: {
                body: z.object({
                    email: z.string(),
                    senha: z.string(),
                })
            },
        }, async (request, reply) => {
            const {email, senha} = request.body;
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                    senha: senha
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                }
            })

            if(user)
            {
                return reply.status(201).send({
                    success: true,
                    message: "Usuario encontrado com sucesso!",
                    data: user,
                })
                //reply.redirect(`/perfil/${user.id}`);
            } else {
                throw new Clienterror("Senha ou email invalidos!");
            }
        })
    }