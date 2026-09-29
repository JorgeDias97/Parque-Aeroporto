import React from 'react';
import useParques from '../hooks/useParques';

export default function Parques() {
    const { parques, loading, error } = useParques();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div>
            <h1>Parques</h1>
            <ul>
                {parques.map((parque) => (
                    <li key={parque.id}>
                        <h2>{parque.nome}</h2>
                        <p>{parque.descricao}</p>
                    </li>
                ))}
            </ul>
        </div>
        
    
    );
}