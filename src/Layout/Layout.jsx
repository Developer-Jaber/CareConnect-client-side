import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navber";
import Footer from "../Shared/Footer";

const Layout = () => {
    return (
        <>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default Layout;