import React from 'react';
import {ISpotifyCardProps} from "@/interfaces/components/spotify-card.interface";

const SpotifyCard: React.FC<ISpotifyCardProps> = ({
                                                      songTitle,
                                                      artist,
                                                      album,
                                                      albumCover,
                                                      currentTime,
                                                      totalDuration
                                                  }) => {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white font-semibold text-sm uppercase">LISTENING TO SPOTIFY</h3>
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-discord-spotify">
                    <path fill="currentColor"
                          d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.669 11.538a.498.498 0 01-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 01-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 01.166.686zm.979-2.178a.624.624 0 01-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 01-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 01.206.858zm.084-2.268c-2.578-1.531-6.832-1.672-9.294-.925a.75.75 0 11-.435-1.434c2.826-.858 7.523-.692 10.492 1.07a.75.75 0 11-.763 1.289z"/>
                </svg>
            </div>

            <div className="bg-discord-section-bg rounded-md p-3">
                <div className="flex gap-3">
                    <img
                        src={albumCover}
                        alt={`${album} cover`}
                        className="w-16 h-16 rounded-md"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <p className="text-white font-medium hover:underline text-sm truncate">{songTitle}</p>
                            <p className="text-discord-text-secondary text-xs truncate">
                                by {artist}
                            </p>
                            <p className="text-discord-text-secondary text-xs truncate">
                                on {album}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex justify-between text-xs text-discord-text-secondary">
                    <span>{currentTime}</span>
                    <span>{totalDuration}</span>
                </div>

                <button
                    className="w-full mt-2 py-2 bg-discord-spotify hover:bg-opacity-90 rounded-md text-white font-medium flex items-center justify-center gap-2 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                        <path fill="currentColor"
                              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1.5-5.5l5-3-5-3v6z"/>
                    </svg>
                    Play on Spotify
                </button>
            </div>
        </div>
    );
};

export default SpotifyCard;
