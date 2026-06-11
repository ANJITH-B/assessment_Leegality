

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-[calc(100vh-2rem)] bg-white relative">
            <div className="w-full flex relative" >
                {children}
                </div>
        </div>
    )
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-1/4 pr-6 relative">
            {children}
        </div>
    )
}

const Body = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:px-8 relative">
            <div className="grid gap-6">
                {children}
            </div>
        </div>
    )
}

Layout.Sidebar = Sidebar;
Layout.Body = Body;
export default Layout;

