import Navbar from "@/components/general/navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Navbar />
      <main className="overflow-y-auto overflow-x-hidden h-screen">
        <Outlet />
      </main>
    </div>
  );
}
