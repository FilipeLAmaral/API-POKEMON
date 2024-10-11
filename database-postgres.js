import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listPokemon() {
    const pokemon = await sql`select * from pokemon`;
    return pokemon;
  }

  async createPokemon(pokemon) {
    const id = randomUUID();
    console.log('id', id);
    const name = pokemon.name;
    const tipagem = pokemon.tipagem;
    const regiao = pokemon.regiao;
    
    await sql`insert into pokemon (id, name, tipagem, regiao)
    values (${id}, ${name}, ${tipagem}, ${regiao})`
  }

  async updatePokemon(id, pokemon) {
    const name = pokemon.name;
    const tipagem = pokemon.tipagem;
    const regiao = pokemon.regiao;

    await sql`update pokemon set 
        name = ${name},
        tipagem = ${tipagem},
        regiao = ${regiao}
        where id = ${id}
    `;
  }

  async deletePokemon(id) {
    await sql`delete from pokemon where id = ${id}`
  }

}