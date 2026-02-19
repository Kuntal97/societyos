import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "220px", background: "#111", color: "white", padding: "1rem" }}>
        Sidebar
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <header style={{ marginBottom: "1rem" }}>Header</header>
        <Outlet />
      </main>
    </div>
  );
}
