
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/pokemon', async (request, reply) => {
    const body = request.body;
    console.log(body);
    let error = {}
    if(body.nome){
        error.nome = 'erro no nome do seu pokemon'
    }
    if(!body.tipagem){
        error.tipagem = 'erro na tipagem do sou pokemon'
    }
    if(!body.regiao){
        error.regiao = 'erro na região do seu pokemon'
    }
    if (body.tipagem && body.name && body.regiao){
    await databasePostgres.createPokemon(body);
    return reply.status(201).send('Deu bom');
    } else {
        return reply.status(400).send(error)
    }
})

// READE
server.get('/pokemon', async () => {
    const pokemon = await databasePostgres.listPokemon();
    return pokemon;
});

// UPDATE
server.put('/pokemon/:id', async (request, reply) => {
    const pokemonID = request.params.id;
    const body = request.body;
    await databasePostgres.updatePokemon(pokemonID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/pokemon/:id', async (request, reply) => {
    const pokemonID = request.params.id;
    await databasePostgres.deletePokemon(pokemonID);

    return reply.status(204).send();
})
server.listen({
    port: 3333
});
