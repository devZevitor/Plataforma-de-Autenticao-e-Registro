import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";


    export async function getUsers(server: FastifyInstance){
       server.get("/usuarios", async (request, reply) => {
            try {
                const users = await prisma.user.findMany({
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        idade: true,
                        createdAt: true,
                    }
                });

                return reply.status(200).send({
                    success: true,
                    message: "Usuarios encontrados com sucesso!",
                    data: users,
                })
            } catch (error) {
                return reply.status(500).send({
                    success: false,
                    message: "Nehnum usuario encontradi!",
                    error: (error as Error).message,
                })
            }
       }) 
    }