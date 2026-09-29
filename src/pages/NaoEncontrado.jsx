import { Link } from 'react-router-dom';

export default function NaoEncontrado() {
    return (
        <div className="flex flex-col items-center justify-center p-16 text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Página não encontrada</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                A página que tentaste aceder não existe ou foi movida. Verifica se o endereço está correto.
            </p>
            <Link 
                to="/" 
                className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
            >
                Voltar à Página Inicial
            </Link>
        </div>
    );
}

