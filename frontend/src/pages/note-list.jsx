import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { createNote, getAllAnimeNotes, deleteNote } from "../api"
import AddNote from "./AddNote"
import Note from "./note-component"
import './Details.css'


export default function NoteList({id}) {
    const [error, setError] = useState(null)
    const [notes, setNotes] = useState([])

    function refreshNotes(newNote) {
            setNotes([...notes, newNote ])
        }

    useEffect(() => {
        getAllAnimeNotes(id).then((notes) => {
            if (notes instanceof Error) {
                setError("couldnt find notes")
                return
            }
            setNotes(notes)
        })
    }, [id])

    async function handleDeleteNote(noteId) {
        const result = await deleteNote(id, noteId);
        if (!(result instanceof Error)) {
            setNotes(prev => prev.filter(n => n.id !== noteId));
        } else {
            alert("Couldn't delete note");
        }
    }
    if (error){
        return <h1>{error}</h1>
    }

    console.log(notes)
    const noteElements = notes.map(note => {
        return <Note key={note.id} note={note} onDelete={() => handleDeleteNote(note.id)}/>
    })
    return (
        <div className="note-list">
            {noteElements}
            <AddNote onRefreshNotes={refreshNotes} />
        </div>
    )
}
