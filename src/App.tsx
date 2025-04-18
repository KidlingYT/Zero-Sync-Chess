import "./App.css";
import { useQuery, useZero } from "@rocicorp/zero/react";
import SignIn from "./components/SignIn";
import Header from "./components/Header";

function App() {
  const z = useZero();
  const [chessUsers] = useQuery(z.query.zChessUser);
  console.log(chessUsers);
  return (
    <main className="flex flex-col items-center">
      <Header />
      <SignIn />
    </main>
  );
}

export default App;
