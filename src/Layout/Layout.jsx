import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <body>
            <nav></nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </body>
    );
};

export default Layout;