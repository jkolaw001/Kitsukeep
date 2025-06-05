import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { getAllAnimeNotes, deleteNote } from "../api"
import Note from "./note-component"
import './Details.css'

export default function NoteList({id, refreshTrigger}) {
    const [error, setError] = useState(null)
    const [notes, setNotes] = useState([])

    async function refreshNotes(newNote) {
            try {
                const notes = await getAllAnimeNotes(id);
                if (notes instanceof Error){
                    setError("Couldn't find notes");
                    return;
                }
                setNotes(notes);
            } catch (error) {
                setError("Failed to load notes")
            }
        }

    useEffect(() => {
        refreshNotes();
    }, [id, refreshTrigger])

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

    if (notes.length === 0) {
        return null;
    }

    console.log(notes)
    const noteElements = notes.map(note => {
        return <Note key={note.id} note={note} onDelete={() => handleDeleteNote(note.id)}/>
    })

    return (
        <div className="notes-container">
            <h3>Notes</h3>
            <div className="note-list">
                {noteElements}
            </div>
        </div>
    )
}
