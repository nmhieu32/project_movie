import { Outlet } from "react-router-dom";
import NavbarAdmin from "./_components/navigation";
export default function AdminTemplate() {
  return (
    <>
      <div className="w-full flex ">
        {/* navbar  */}
        <NavbarAdmin />
        {/* content  */}
        <main className="w-[80%] h-dvh bg-[#252746] opacity-95 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
