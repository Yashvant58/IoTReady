import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const handleAudioEnd = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };
  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <audio
        ref={audioRef}
        controls
        src={playlist[currentTrackIndex]?.url}
        onEnded={handleAudioEnd}
        autoPlay
      />
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => playTrack(index)}>
            {track.name}
          </li>
        ))}
      </ul>
      <div>
        <h3>Now Playing:</h3>
        {playlist[currentTrackIndex]?.name}
      </div>
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => {
          const file = e.target.files[0];
          setPlaylist([...playlist, { name: file.name, url: URL.createObjectURL(file) }]);
        }}
      />
    </div>
  );
};

export default App;
