import { FastifyInstance } from "fastify";
import z from "zod";
import {prisma} from "../lib/prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";

    export async function logintUser(server:  FastifyInstance){
        server.withTypeProvider<ZodTypeProvider>().post("/Login-user", {
            schema: {
                body: z.object({
                    email: z.string(),
                    senha: z.string(),
                })
            },
        }, async (request, reply) => {
            try{
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
                    reply.redirect(`/perfil/${user.id}`);
                } else {
                    return reply.status(401).send({
                        message: "Email ou senha incorretos"
                    })
                }
            } catch (error) {
                return reply.status(500).send({
                    message: "Erro no servidor",
                    error: (error as Error).message
                })
            }
            
        })
    }