import AdminSidebar from "./Dashboard/sidebar";
import AdminHeader from "./Dashboard/header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-white dark:bg-slate-950 overflow-hidden max-w-full transition-colors duration-300">
            {/* Left Side: Sidebar - Fixed width */}
            <div className="shrink-0 h-full border-r border-gray-100 dark:border-slate-800 hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Right Side: Content Container */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Top: Header */}
                <div className="shrink-0 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 z-10 transition-colors duration-300">
                    <AdminHeader />
                </div>

                {/* Bottom: Main Content Area - Strictly vertical scroll only */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50/40 dark:bg-slate-900/50 p-4 md:p-8 transition-colors duration-300">
                    <div className="max-w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}