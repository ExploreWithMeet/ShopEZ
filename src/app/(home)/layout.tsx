import Topbar from "@/components/Topbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full min-h-s">
      <Topbar />
      <div className="">{children}</div>
      <footer className="w-full absolute bottom-0 flex border-t justify-center items-center font-medium p-4 text-slate-400">
        ShopEZ Pvt Ltd, Since 2025 &copy;.
      </footer>
    </div>
  );
}
