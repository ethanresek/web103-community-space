import './dotenv.js'
import { pool } from './database.js'
import adventureData from '../data/adventures.js'
import dungeonData from '../data/dungeons.js'

const createDungeonsTable = async () => {

  const createEnumQuery = `
  DO $$ BEGIN
    CREATE TYPE DIFFICULTY AS ENUM ('Easy', 'Medium', 'Hard', 'Expert');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  `
  const createTableQuery = `
  DROP TABLE IF EXISTS adventures;
  DROP TABLE IF EXISTS dungeons;

  CREATE TABLE IF NOT EXISTS dungeons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(127) NOT NULL,
  location VARCHAR(63) NOT NULL,
  difficulty DIFFICULTY NOT NULL,
  description VARCHAR(511),
  max_party_size INT NOT NULL,
  image VARCHAR(512) NOT NULL
  );
  `

  try {
    await pool.query(createEnumQuery);
    await pool.query(createTableQuery);
    console.log({ message: '🎉 dungeons table created successfully' });
  } catch (error) {
    console.error({ message: 'error creating dungeons table', error })
    throw error;
  }
}

const seedDungeonsTable = async () => {
  await createDungeonsTable();

  try {
    await Promise.all(dungeonData.map((dungeon) => {
      const insertQuery = `
    INSERT INTO dungeons (id, name, location, difficulty, description, max_party_size, image) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;

      const values = [
        dungeon.id,
        dungeon.name,
        dungeon.location,
        dungeon.difficulty,
        dungeon.description,
        dungeon.max_party_size,
        dungeon.image
      ];

      return pool.query(insertQuery, values);
    }));
  } catch (err) {
    console.error({ message: 'error seeding dungeons', err });
    throw err;
  }
  console.log({ message: '✅ dungeons seeded successfully' });
}

const createAdventuresTable = async () => {

  const createTableQuery = `
  DROP TABLE IF EXISTS adventures;

  CREATE TABLE IF NOT EXISTS adventures (
  id SERIAL PRIMARY KEY,
  dungeon_id INT NOT NULL,
  title VARCHAR(127) NOT NULL,
  adventure_date DATE NOT NULL,
  slots_available INT NOT NULL,
  slots_total INT NOT NULL,
  host VARCHAR(63) NOT NULL,
  description VARCHAR(511) NOT NULL,
  
  FOREIGN KEY (dungeon_id) REFERENCES dungeons(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
  );
  `;

  try {
    await pool.query(createTableQuery);

    console.log({ message: '🎉 adventures table created successfully' });
  } catch (error) {
    console.error({ message: "error creating adventures table", error });
    throw error;
  }
}

const seedAdventuresTable = async () => {
  await createAdventuresTable();
  try {
    await Promise.all(adventureData.map((adventure) => {
      const insertQuery =
        `INSERT INTO adventures (dungeon_id, title, adventure_date, slots_available, slots_total, host, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;

      const values = [
        adventure.dungeon_id,
        adventure.title,
        adventure.date,
        adventure.slots_available,
        adventure.slots_total,
        adventure.host,
        adventure.description
      ]

      return pool.query(insertQuery, values);
    }))
  } catch (err) {
    console.log('error seeding adventures table', err);
    throw err;
  }
  console.log({ message: '✅ adventures seeded successfully' });
}

const seed = async () => {
  try {
    await seedDungeonsTable();
    await seedAdventuresTable();
  } catch (err) {
    console.error({ message: 'seeding failed', err });
    pool.end();
  }
}

seed();
