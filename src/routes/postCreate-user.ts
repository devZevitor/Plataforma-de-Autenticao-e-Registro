import { z } from "zod";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { Clienterror } from "../erros/Client-erro";

    export async function CreateUser(server: FastifyInstance) { 
        server.withTypeProvider<ZodTypeProvider>().post("/cadastro", {
            // Receber dados: id, nome, email, idade, senha
            schema: {
                body: z.object({
                    nome: z.string().min(3),
                    email: z.string().email(),
                    idade: z.number().positive(),
                    senha: z.string().min(6)
                })
            },
        }, async (request, reply) => {  
            const { nome, email, idade, senha } = request.body;

            const existEmail = await prisma.user.findUnique({
                where: {email},
            })

            if(existEmail){
                throw new Clienterror("Erro ao criar cadastro! Usuario já cadastrado")
            }

            // Criando o usuário no banco de dados
            const user = await prisma.user.create({
                data: {
                    nome,
                    email,
                    idade,
                    senha,
                }
            });

            return reply.status(201).send({
                success: true,
                message: "Usuario cadastrado com sucesso!",
                data: user,
            })
        })
    }

    