import React from "react";

const EntryLobby = () => {
  return (
    <div>
      <h1>Mad-Vids</h1>
      <h2>Scan QR Code to Join as a:</h2>
      <a href="/player">
        <div className="tile">
        <h3>Player:</h3>
          <img src="/player-qr.png" alt="Player QR Code" />
        </div>
      </a>
      
      <a href="/spectator">
        <div className="tile">
          <h3>Spectator:</h3>
            <img src="/spectator-qr.png" alt="Spectator QR Code" />
        </div>
      </a>
    </div>
  );
};

export default EntryLobby;
