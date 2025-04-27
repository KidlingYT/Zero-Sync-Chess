import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useQuery, useZero } from "@rocicorp/zero/react";

const AccountPage = () => {
  const z = useZero();

  const [user] = useQuery(z.query.users.limit(1));
  console.log(user[0]);

  function updateDbName(value: string) {
    z.mutate.users.update({ email: user[0].email, name: value });
  }
  return (
    <main>
      <Header />
      <div>
        <h2 className="text-3xl">You are currently logged in as {z.userID}</h2>
        <h2 className="text-3xl">email: {user[0].email}</h2>
        <h2 className="text-3xl">password: {user[0].password}</h2>
        <h2 className="text-3xl">name: {user[0].name}</h2>
        <Input
          value={user[0].name}
          onChange={(e) => updateDbName(e.target.value)}
        />
      </div>
    </main>
  );
};

export default AccountPage;
