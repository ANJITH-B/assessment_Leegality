const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white relative h-[calc(100vh-64px)] ">
      <div className="w-full flex relative h-full">{children}</div>
    </div>
  );
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-amber-50 relative ">{children}</div>;
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-4 py-6 lg:px-8 relative h-full overflow-y-auto ">
      <div className="grid gap-6 h-full max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

Layout.Sidebar = Sidebar;
Layout.Body = Body;
export default Layout;
