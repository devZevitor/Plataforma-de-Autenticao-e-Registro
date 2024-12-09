    import { FastifyInstance } from "fastify";
    import { prisma } from "../lib/prisma";
    import { ZodTypeProvider } from "fastify-type-provider-zod";
    import z from "zod";
import { Clienterror } from "../erros/Client-erro";

    export async function getUser(server: FastifyInstance){
        server.withTypeProvider<ZodTypeProvider>().get("/perfil/:id", {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                })
            }
        },async (request, reply) => {
            try {
                const {id} = request.params

                const user = await prisma.user.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        idade: true,
                        createdAt: true,
                    }
                })

                if(user)
                {
                    return reply.send(user);
                } else {
                    throw new Clienterror("Usuario não encontrado!")
                }

            } catch (error){
                return reply.status(500).send({
                    message: "Erro no servidor",
                    error: (error as Error).message
                })
            }
        }) 
    }