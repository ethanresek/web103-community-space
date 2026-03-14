import { pool } from "../config/database.js";

const getDungeons = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM dungeons ORDER BY id ASC;');
    res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message })
  }
}

const getDungeonWithAdventures = async (req, res) => {
  try {
    const selectQuery = `
    SELECT d.*, json_agg(a.*) adventures
    FROM dungeons d
    LEFT JOIN adventures a ON d.id = a.dungeon_id 
    WHERE d.id=$1
    GROUP BY d.id;
    `
    const dungeonId = req.params.dungeonId;

    const results = await pool.query(selectQuery, [dungeonId]);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message })
  }

}

export default {
  getDungeonWithAdventures,
  getDungeons
}
