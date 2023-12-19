import { Link } from "react-router-dom";

const Layout = ({ props, children }) => {
  return (
    <>
      <div className="xl:container xl:mx-auto my-5">
        <header className="bg-orange-500">
          <Link className="text-xl font-bold px-7 py-2 block" to="/">
            Hacker News
          </Link>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
