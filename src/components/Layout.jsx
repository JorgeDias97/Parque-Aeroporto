import { Outlet } from 'react-router-dom';
export default function Layout() {
    return (
        <div>
            <header>
                <h1>Parque Aeroporto</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}