import { NextApiRequest, NextApiResponse } from "next";

let gameState: {
  players: { name: string; score: number }[];
  maxPlayers: number;
} = {
  players: [], // Array to store player details { name: string, score: number }
  maxPlayers: 2,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Player name is required." });
    }

    if (gameState.players.length >= gameState.maxPlayers) {
      return res.status(400).json({ error: "Maximum players already registered." });
    }

    // Add player to the game state
    gameState.players.push({ name, score: 0 });
    return res.status(200).json({ message: "Player registered successfully.", players: gameState.players });
  }

  if (req.method === "GET") {
    return res.status(200).json(gameState);
  }

  if (req.method === "DELETE") {
    // Reset the game state
    gameState = {
      players: [], // Clear players array
      maxPlayers: 2,
    };
    return res.status(200).json({ message: "Game state reset successfully." });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
