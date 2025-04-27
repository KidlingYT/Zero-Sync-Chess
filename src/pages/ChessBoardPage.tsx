import Header from "@/components/Header";
import InGameProfile from "@/components/InGameProfileAndTimer";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
// https://www.npmjs.com/package/react-chessboard

type PlayerTurn = "white" | "black" | null;

const Home = () => {
  const [playerTurn, setPlayerTurn] = useState<PlayerTurn>(null);

  function toggleTurn() {
    // start the game if not started
    if (playerTurn === null) {
      startGame();
      return;
    }

    // else
    setPlayerTurn(playerTurn === "black" ? "white" : "black"); // future database call
  }

  function startGame() {
    // this will have to be a database call
    setPlayerTurn("white");
  }

  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="flex justify-center">
        <div className="h-full max-h-[100vh] aspect-square min-h-[75vh] border-2 border-gray-100 shadow-md">
          <Chessboard id={"mainBoard"} onPieceDragEnd={() => toggleTurn()} />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <div>
            <InGameProfile
              playerName="Jesse"
              rating={1400}
              isTimerActive={playerTurn === "black"}
            />
          </div>
          <div>
            <InGameProfile
              playerName="Elijah Symons"
              rating={2000}
              isTimerActive={playerTurn === "white"}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
