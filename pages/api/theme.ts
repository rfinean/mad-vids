import { NextApiRequest, NextApiResponse } from "next";

const themes = [
  "A futuristic cityscape",
  "A medieval battle",
  "An alien planet",
  "A magical forest",
  "A post-apocalyptic wasteland",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    return res.status(200).json({ theme: randomTheme });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
