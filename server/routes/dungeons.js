import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import DungeonsController from '../controllers/dungeons.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dungeonsRouter = express.Router();

dungeonsRouter.get('/', DungeonsController.getDungeons);

dungeonsRouter.get('/:dungeonId', DungeonsController.getDungeonWithAdventures);

export default dungeonsRouter
