import { Button } from "@/components/ui/button";
import Link from "next/link";
import SidebarUser from "./SidebarUser";

const SidebarFooterItems = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      {isLogin ? (
        <SidebarUser
          user={{
            name: "Meet Sanghvi",
            email: "meetsanghvi2347@gmail.com",
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
