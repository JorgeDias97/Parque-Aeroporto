import { useState, useEffect } from "react";

const CHAVE = "favoritos";

function useFavoritos() {
    const [favoritos, setFavoritos] = useState(() => {
        try {
            const texto = localStorage.getItem(CHAVE);
            if (texto === null) {
                return [];
            }
            return JSON.parse(texto);
        } catch {
            return [];
        }
    });


    useEffect(() => {
        localStorage.setItem(CHAVE, JSON.stringify(favoritos));
    }, [favoritos]);

    function alternarFavorito(id) {
        if (favoritos.includes(id)) {
            setFavoritos(favoritos.filter((favorito) => favorito !== id));
        } else {
            setFavoritos([...favoritos, id]);
        }
    }

    function eFavorito(id) {
        return favoritos.includes(id);
    }

    return { favoritos, alternarFavorito, eFavorito };
}

export default useFavoritos;