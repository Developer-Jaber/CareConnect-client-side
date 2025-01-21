import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navber";

const Layout = () => {
    return (
        <body>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </body>
    );
};

export default Layout;