    import { FastifyInstance } from "fastify";
    import { ZodError } from "zod";
    import { Clienterror } from "./erros/Client-erro";
    import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

    type FastifyErrorHandler = FastifyInstance['errorHandler'];

    export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

        if(hasZodFastifySchemaValidationErrors(error)) {
            return reply.status(400).send({
                error: 'Erro de validação de formulario',
                message: "Campos Ausentes ou Invalidos",
                statusCode: 400,
            })
        }

        if(error instanceof Clienterror) {
            return reply.status(400).send({
                message: error.message,
            })
        }

        return reply.status(500).send({ 
            message: "Internal server erro",
            //dataReceived: request.body
        });
    }