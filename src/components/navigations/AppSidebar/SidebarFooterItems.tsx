import { Button } from "@/components/ui/button";
import Link from "next/link";
import SidebarUser from "./SidebarUser";
import { useAuth } from "@/hooks/useAuth";

const SidebarFooterItems = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <SidebarUser
          user={{
            username: `${user.username}`,
            email: `${user.email}`,
            avatar: "",
          }}
        />
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </>
  );
};

export default SidebarFooterItems;
