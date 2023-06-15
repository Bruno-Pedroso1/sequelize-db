import 'dotenv/config'
import Express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import { Routes } from './routes'
require('./models/index')

const app = Express();
const porta = process.env.API_PORT;

const acessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: "GET, PUT, PATCH, POST, DELETE",
  credentials: true
};

app.use(cors(corsOptions));
app.use(Express.json());
app.use(morgan('combined', { stream: acessLogStream }));

Routes(app);
app.use((_,res) => {
  return res.status(404).send({
    message: 'Não foi encontrada vossa página'
  });
});

app.listen(porta, () => console.log(`Server rodando na porta ${porta}`));
