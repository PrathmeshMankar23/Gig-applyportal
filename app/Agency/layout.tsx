import AgencySidebar from "./Dashboard/sidebar";
import AgencyHeader from "./Dashboard/header";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Sidebar */}
      <AgencySidebar />

      {/* Right Side: Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top: Header */}
        <AgencyHeader />

        {/* Bottom: Page Content */}
        <main className="flex-1 p-8 bg-gray-50/40">
          {children}
        </main>
      </div>
    </div>
  );
}
