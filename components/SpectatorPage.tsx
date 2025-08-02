import React from "react";

const SpectatorPage = () => {
  return (
    <div>
      <h1>Spectator's Page</h1>
      <h2>Watch the game and vote for your favorite video:</h2>
      <div>
        <video controls>
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <video controls>
          <source src="/video2.mp4" type="video/mp4" />
        </video>
      </div>
      <button>Vote</button>
    </div>
  );
};

export default SpectatorPage;
