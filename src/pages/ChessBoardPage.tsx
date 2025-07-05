import Header from "@/components/Header";
import InGameProfile from "@/components/InGameProfileAndTimer";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
// https://www.npmjs.com/package/react-chessboard
import { Chess, Square } from "chess.js";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
//  https://dev.to/tyry327/create-a-chess-game-with-react-and-chessboardjsx-214e

const Home = () => {
    useAuth();
    const [isWhiteTurn, setIsWhiteTurn] = useState<boolean>(false);
    const [isBlackTurn, setIsBlackTurn] = useState<boolean>(false);
    const [playerBlackUsername, setPlayerBlackUsername] =
        useState<string>("Anon");
    const [playerWhiteUsername, setPlayerWhiteUsername] = useState<string>(
        localStorage.getItem("username") ?? "Anon"
    );

    const [chess] = useState(
        // Set initial state to FEN layout
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    function updateGame() {
        setFen(chess.fen());
        setIsWhiteTurn(chess.turn() === "w");
        setIsBlackTurn(chess.turn() === "b");
    }

    const [fen, setFen] = useState(chess.fen());

    function handleMove(sourceSquare: Square, targetSquare: Square) {
        if (
            chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" })
        ) {
            updateGame();
            if (chess.isCheckmate()) {
                toast.info("Game over, checkmate!");
                endGame();
                // TODO: implement win
                return true;
            }
            if (chess.isDraw()) {
                // TODO: implement draw
                toast.info("Game over, draw!");
                endGame();
                return true;
            }
            setTimeout(() => {
                const moves = chess.moves();
                // Lines 33-28: Computer random move.
                if (moves.length > 0) {
                    const computerMove =
                        moves[Math.floor(Math.random() * moves.length)];
                    chess.move(computerMove);
                    setFen(chess.fen());
                    updateGame();
                }
            }, 300);
            return true;
        }

        return false;
    }

    function endGame() {
        setIsBlackTurn(false);
        setIsWhiteTurn(false);
    }

    return (
        <main className="flex flex-col items-center">
            <Header />
            <div className="flex justify-center">
                <div className="h-full max-h-[100vh] aspect-square min-h-[75vh] border-2 border-gray-100 shadow-md">
                    <Chessboard
                        id={"mainBoard"}
                        position={fen} // onDrop prop tracks everytime a piece is moved.
                        // The rest is handled in the the handleMove function.
                        onPieceDrop={(sourceSquare, targetSquare) =>
                            handleMove(sourceSquare, targetSquare)
                        }
                        onPromotionPieceSelect={() => true}
                        animationDuration={0}
                    />
                </div>
                <div className="flex flex-col justify-between ml-4">
                    <div>
                        <InGameProfile
                            playerName={playerBlackUsername}
                            rating={1400}
                            isTimerActive={isBlackTurn}
                        />
                    </div>
                    <div>
                        <InGameProfile
                            playerName={playerWhiteUsername}
                            rating={2000}
                            isTimerActive={isWhiteTurn}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
