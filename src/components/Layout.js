import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout () {
    return (
        <main className='.css-selector'>
            <Header />
            <Outlet />
        </main>
    );
}

export default Layout;