import { useState } from "react";
import { createNote } from "../api";
import { useParams } from "react-router";


export default function AddNote() {
    const[error, setError] = useState(null)
    const { id } = useParams()

    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const note = formData.get("note")
        if(!note || typeof note !== "string") {
            setError("Invalid note")
            return;
        }

        const addNote = await createNote({
            note,
            id
        });
        if (addNote instanceof Error) {
            setError("Couldn't add the note, please try again later.");
            return;
        }
    }


    return (
        <div className="create-note">
            <h1>Add a note</h1>
            <form onSubmit={submitForm} className="create-note-form">
                <label htmlFor="note">Notes</label>
                <textarea
                    name="note"
                    id="note"
                    placeholder="Add new note"
                    required={true}
                ></textarea>
            </form>
            <button type="submit">Add Note</button>
        </div>
    )
}
