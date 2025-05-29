import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { createNote, getAllAnimeNotes } from "../api"
import AddNote from "./AddNote"
import Note from "./note-component"


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
    }, [])
    if (error){
        return <h1>{error}</h1>
    }

    console.log(notes)
    const noteElements = notes.map(note => {
        return <Note key={note.id} note={note} />
    })
    return (
        <div className="note-list">
            {noteElements}
            <AddNote onRefreshNotes={refreshNotes} />
        </div>
    )
}
