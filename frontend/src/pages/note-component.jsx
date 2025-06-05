import './note-component.css'


export default function Note({ note, onDelete }) {

    return (
        <>
            <div className="note-item">
                <p>{note.note}</p>
                <button className="button-delete" onClick={onDelete}>X</button>
            </div>
        </>
    )
}
