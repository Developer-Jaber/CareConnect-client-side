import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navber";

const Layout = () => {
    return (
        <>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </>
    );
};

export default Layout;