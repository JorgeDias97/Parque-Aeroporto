//criar um hook para pegar os parques do banco de dados e retornar em um array de objetos
import { useState, useEffect } from 'react';

export default function useParques() {
    const [parques, setParques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParques = async () => {
            try {
                const response = await fetch('http://localhost:3001/parqueaeroporto/itens');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os parques');
                    setLoading(false);
                    setError(error.message);
                }
                const data = await response.json();
                setParques(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            } 
        };
        fetchParques();
    }, []);

    return { parques, loading, error };
}