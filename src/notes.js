export const notes = [
  {
    id: "1",
    note: "Nota inicial"
  }
]

// cria uma nota fazendo um push na array
export const createNote = (note) => {
  notes.push(note)
};