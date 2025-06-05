<>
            <section className="anime-detail">
                <img src={anime.img_url} alt={anime.title} />
                <h1>{anime.title}</h1>
                <p>{anime.genre}</p>
                <p>{anime.rating}</p>
                <p>{anime.description}</p>
                 {anime.trailer ? (
                    <YouTube
                        videoId={getYouTubeVideoId(anime.trailer)}
                        opts={{
                            height: "360",
                            width: "640",
                            playerVars: {
                                autoplay: 0,
                            },
                        }}
                    />
                ) : (
                    <h3><b>NO TRAILER AVAILABLE</b></h3>
                )}
                <NoteList id={id} />
            </section>
            <section>
                <Link to="/Watchlist">
                    <button onClick={() => {
                        deleteAnimeFromWatchlist(id)
                    }}>Remove From Watchlist</button>
                </Link>
            </section>
        </>
