import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AppShell({ title, subtitle, children }) {
  return (
    <div className="bg-[var(--canvas)] min-h-screen">
      <Sidebar />
      <div className="ml-[264px] p-8 max-w-[1400px]">
        <Navbar title={title} subtitle={subtitle} />
        {children}
      </div>
    </div>
  );
}

export default AppShell;
