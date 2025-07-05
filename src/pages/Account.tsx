import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useZero } from "@rocicorp/zero/react";
import { useQuery } from "@rocicorp/zero/react";

const AccountPage = () => {
    const z = useZero();

    const [user] = useQuery(z.query.users);

    function UpdateDBName(value: string) {
        z.mutate.users.update({ email: user[0].email, name: value });
    }
    return (
        <main>
            <Header />
            <div>
                <h2 className="text-3xl">
                    You are currently logged in as {z.userID}
                </h2>
                <h2 className="text-3xl">
                    You are currently logged in as {user[0].email}
                </h2>
                <h2 className="text-3xl">
                    You are currently logged in as {user[0].name}
                </h2>
                <h2 className="text-3xl">
                    You are currently logged in as {user[0].password}
                </h2>
                <Input
                    onChange={(e) => UpdateDBName(e.target.value)}
                    value={user[0].name}
                />
            </div>
        </main>
    );
};

export default AccountPage;
