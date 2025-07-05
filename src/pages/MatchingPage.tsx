import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mode = "5";

const MatchingPage = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<Mode>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [numPeopleSearching, setNumPeopleSearching] = useState<number>(0); // todo api
  const [secondsLeftToSearch, setSecondsLeftToSearch] = useState<number>(30);
  const [timerIntervalId, setTimerIntervalId] = useState();

  function startSearching() {
    // todo api
    setIsSearching(true);
    setNumPeopleSearching((prev) => prev + 1);
    let timeRemaining = 30;
    const intervalId = setInterval(() => {
      setSecondsLeftToSearch(timeRemaining--);
      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        setIsSearching(false);
        // todo go to ai game
      }

      if (timeRemaining < 27) {
        // fake found game
        navigate("/chessboard");
      }
    }, 1000);

    setTimerIntervalId(timerIntervalId);
  }
  function stopSearching() {
    setIsSearching(false);
    setSecondsLeftToSearch(30);
    clearInterval(timerIntervalId);
  }
  function deSelectMode() {
    setSelectedMode(undefined);
    stopSearching();
  }
  function selectMode(mode: Mode) {
    setSelectedMode(mode);
  }
  return (
    <main>
      <Header />
      <p className="m-4">
        Number of people searching for matches: {numPeopleSearching}
      </p>
      <Card
        className="min-w-24 min-h-24 flex justify-center items-center hover:bg-gray-100 cursor-pointer"
        style={{ backgroundColor: selectedMode === "5" ? "lightblue" : "" }}
        onClick={() =>
          selectedMode === "5" ? deSelectMode() : selectMode("5")
        }
      >
        <CardContent>
          <p className="text-xl">5 Minute Game</p>
        </CardContent>
      </Card>
      {selectedMode === "5" && (
        <Button
          className="m-4"
          onClick={() => (isSearching ? stopSearching() : startSearching())}
          style={{ backgroundColor: isSearching ? "lightgrey" : "" }}
        >
          {isSearching ? "Searching..." : "Search For Match"}
        </Button>
      )}
      {isSearching && (
        <p>
          After {secondsLeftToSearch} seconds, you will be placed against our
          AI!
        </p>
      )}
    </main>
  );
};

export default MatchingPage;
