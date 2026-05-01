import FreelancerSidebar from "./Dashboard/sidebar";
import Header from "./Dashboard/header";

export default function FreelancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side: Sidebar */}
            <FreelancerSidebar />

            {/* Right Side: Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top: Header */}
                <Header />

                {/* Bottom: Page Content */}
                <main className="flex-1 p-8 bg-gray-50/40">
                    {children}
                </main>
            </div>
        </div>
  );
}
