import React from "react";

const ResultPage = () => {
  return (
    <div>
      <h1>Result Page</h1>
      <h2>Here are the results:</h2>
      <div>
        <h3>Player 1</h3>
        <p>Votes: 60%</p>
        <p>Winner!</p>
      </div>
      <div>
        <h3>Player 2</h3>
        <p>Votes: 40%</p>
        <p>Loser!</p>
      </div>
    </div>
  );
};

export default ResultPage;
