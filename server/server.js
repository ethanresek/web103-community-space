import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import './config/dotenv.js'
import cors from 'cors'
import dungeonsRouter from './routes/dungeons.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json());
app.use(cors());
app.use('/api/dungeons', dungeonsRouter);


app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Dungeon Crawling API');
});

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.resolve('public', 'party.png')))
  app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) =>
    res.sendFile(path.resolve('public', 'index.html'))
  )
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
