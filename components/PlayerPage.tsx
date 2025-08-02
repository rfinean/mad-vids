"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerPage = () => {
  const [playersJoined, setPlayersJoined] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [playerName, setPlayerName] = useState("");
  const [themePrompt, setThemePrompt] = useState("[Generated Theme]");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{
        players: { name: string; score: number }[];
      }>("/api/game", { name: playerName });
      console.log(response.data);
      setPlayersJoined(response.data.players.length); // Update playersJoined based on the backend response
    } catch (err) {
      const error = err as any; // Cast error to any
      console.error(
        "Error registering player:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.error ||
          "An error occurred while joining the game."
      );
    }
  };

  const handleConcede = async () => {
    try {
      await axios.delete("/api/game"); // Reset the game controller
      window.location.href = "/"; // Redirect to Entry Lobby
    } catch (error) {
      console.error("Error conceding the game:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playersJoined > 0 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playersJoined, countdown]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get<{ theme: string }>("/api/theme");
        setThemePrompt(response.data.theme);
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    if (playersJoined > 0) {
      fetchTheme();
    }
  }, [playersJoined]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<{
          players: { name: string; score: number }[];
        }>("/api/game");
        setPlayersJoined(response.data.players.length); // Update playersJoined based on the backend response
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      {playersJoined < 2 ? (
        !playerName ? ( // Show join form until the player joins
          <>
            <h1>Compete</h1>
            <h2>Enter your name to join the duel:</h2>
            <form onSubmit={handleJoin}>
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
              <button type="submit">Join</button>
            </form>
          </>
        ) : (
          <p>Waiting for one more player...</p> // Show waiting text after the player joins
        )
      ) : (
        // Game Board
        <>
          <h2>Game Board</h2>
          <h1>{playerName}</h1>
          <h2>Generate a video on the theme of</h2>
          <p>{themePrompt}</p>
          <textarea placeholder="Enter your video generation prompt"></textarea>
          <div>
            <p>Time Remaining: {countdown}s</p>
            <button disabled={countdown === 0}>Play</button>
            <button onClick={handleConcede}>Concede</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerPage;
