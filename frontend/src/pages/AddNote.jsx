import { useState } from "react";
import { createNote } from "../api";
import { useParams } from "react-router";
import Modal from "../Modal";
import "../Modal.css"



export default function AddNote({onRefreshNotes}) {
    const[error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { id } = useParams()
    console.log(id)

    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const note = formData.get("note")
        console.log(note)
        if(!note || typeof note !== "string") {
            setError("Invalid note")
            return;
        }

        const addNote = await createNote(
            {note},
            id
        );
        if (addNote instanceof Error) {
            setError("Couldn't add the note, please try again later.");
            return;
        }

        setIsModalOpen(false)
        onRefreshNotes(addNote)
    }


    return (
        <div className="create-note">
            <button
            type="submit"
            onClick={() => setIsModalOpen(true)}
            className="watchlist-button"
            >Add a Note</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={submitForm} className="create-note-form">
                    <label htmlFor="note">Notes</label>
                    <textarea
                        name="note"
                        id="note"
                        placeholder="Add new note"
                        required={true}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    )
}
