import React, { useState,useEffect } from "react";
import './Details.css'
//import {Link} from "react-router-dom"
import Modal from "./src/Modal";

export default function AnimeDetailsInWatchlist({}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
       <>
       <img className="detail-image" src="https://placehold.co/125x200" />
      <h2>"anime.title"</h2>
      <p>"anime.description"</p>
      <p>"anime.rating"</p>
      <p>"anime.genre"</p>
      <p>"anime.notes"</p>
        <p><a className="trailer-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Trailer</a></p>
       <button type="submit" className="remove-button">Remove from Watchlist</button>
       <p></p>
       <button type="submit" onClick={() => setIsModalOpen(true)} className="watchlist-button">Add Note</button>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <textarea className="textbox" placeholder="Enter text here..."></textarea>
        <p></p>
        <button type="submit" className="watchlist-button">Add Note</button>
       </Modal>
      </>
    )

}
