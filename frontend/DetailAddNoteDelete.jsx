import React, { useState,useEffect } from "react";
import './Details.css'
//import {Link} from "react-router-dom"

export default function AnimeDetailsInWatchlist({}) {

    return (
       <>
       <img className="detail-image" src="https://placehold.co/125x200" />
      <h2>"anime.title"</h2>
      <p>"anime.year"</p>
      <p>"anime.description"</p>
      <p>"anime.rating"</p>
      <p>"anime.genre"</p>
      <p>"anime.notes"</p>
        <p><a className="trailer-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Trailer</a></p>
       <button type="submit" className="remove-button">Remove from Watchlist</button>
       <p></p>
       <button type="submit" id="add-note" className="watchlist-button">Add Note</button>
      </>
    )

}
