import { useState, useEffect } from 'react';
import { API } from '../services/api';

export default function useParques() {
    const [parques, setParques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParques = async () => {
            try {
                const response = await fetch(`${API}/itens`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar os parques');
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
