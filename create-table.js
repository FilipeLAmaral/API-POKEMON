import { sql } from './db.js'

sql`
  CREATE TABLE pokemon (
      id text PRIMARY KEY,
      name character varying(255),
      tipagem character varying(255),
      regiao character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})