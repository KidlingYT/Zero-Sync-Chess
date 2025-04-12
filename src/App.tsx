import "./App.css";
import { useQuery, useZero } from "@rocicorp/zero/react";

function App() {
  const z = useZero();
  const [chessUsers] = useQuery(z.query.zChessUser);
  console.log(chessUsers);
  return (
    <>
      <div>
        <p>{JSON.stringify(chessUsers[0])}</p>
      </div>
    </>
  );
}

export default App;
