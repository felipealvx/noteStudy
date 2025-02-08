import express from 'express';
import { createNote, notes } from './notes.js'

// uuidv4 gera ids para cada tarefa
import {v4 as uuidv4 } from 'uuid';

const port = 3000;
const app = express();
app.use(express.json());

// rota inicial, retorna um texto dizendo: 
app.get('/', (req, res) => {
  res.send("Bloco de cadastro de usuários");
})

// criando a rota notes, nela retorna um json das notes => o outro arquivo
app.get('/notes', (req, res) => {
  return res.json(notes);
})

app.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  const note = notes.find((note) => note.id === noteId);
  if (!note){
    return res.status(404).json({message: "nota não encontrada!!"})
  }

  return res.status(200).json({noteId, note});
})

// manipulando a rota para que nela seja pego o corpo dela(body) e retorne...
// ... mensagens para cada erro ou sucesso, caso a nota não seja preenchida ...
// ... retorna um erro e caso tenha uma nota exatamente igual, retorna um aviso.
app.post('/notes', (req, res) => {
  const { note } = req.body;

  if (!note){
    return res.status(400).json({message: 'Require!!'});
  }

  if (notes.some((notation) => notation.note === note)) {
    return res.json({message: "Você ainda não cumpriu essa nota!"})
  }

  // cadastrando uma nota, onde um id é gerado pelo uuid e você passa a nota como json
  const newNote = {
    id: uuidv4(),
    note,
  }
  createNote(newNote);


  return res.status(201).json({message: 'Note Create With Sucess!!'});
})

// chamando o servidor para ser executado e mostrando no console uma mensagem que ele está...
// ... sendo executado na porta 3000.
app.listen(port, () => {
  console.log(`O servidor está sendo executado na porta: ${port}`)
})
