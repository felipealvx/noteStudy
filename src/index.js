import express from 'express';
import { createNote, notes } from './notes.js'
import {v4 as uuidv4 } from 'uuid';

const port = 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Bloco de cadastro de usuários");
})

app.get('/notes', (req, res) => {
  return res.json(notes);
})

app.post('/notes', (req, res) => {
  const { note } = req.body;

  if (!note){
    return res.status(400).json({message: 'Require!!'});
  }

  if (notes.some((notation) => notation.note === note)) {
    return res.json({message: "Você ainda não cumpriu essa nota!"})
  }

  const newNote = {
    id: uuidv4(),
    note,
  }
  createNote(newNote);

  return res.status(201).json({message: 'Note Create With Sucess!!'});
})

app.listen(port, () => {
  console.log(`O servidor está sendo executado na porta: ${port}`)
})

//oi