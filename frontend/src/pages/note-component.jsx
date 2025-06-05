import './note-component.css'

export default function Note({ note, onDelete }) {
    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete();
        }
    };

    return (
        <div className="note-item">
            <p>{note.note}</p>
            <button
                className="button-delete"
                onClick={handleDelete}
                title="Delete note"
                aria-label="Delete note"
            >
                ×
            </button>
        </div>
    )
}
