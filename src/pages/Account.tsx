import Header from "@/components/Header";
import { useZero } from "@rocicorp/zero/react";

const AccountPage = () => {
  const z = useZero();

  return (
    <main>
      <Header />
      <div>
        <h2 className="text-3xl">You are currently logged in as {z.userID}</h2>
      </div>
    </main>
  );
};

export default AccountPage;
