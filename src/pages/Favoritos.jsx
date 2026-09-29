import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import BotaoFavorito from "../components/BotaoFavorito";
import { API } from "../services/api";

function Favoritos({ favoritos, eFavorito, alternarFavorito }) {
    const [parques, setParques] = useState([]);
    const [aCarregar, setACarregar] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarParques() {
            setACarregar(true);
            setErro(null);
            try {
                const resposta = await fetch(`${API}/itens`);
                const dados = await resposta.json();
                if (!resposta.ok) {
                    setErro(dados.erro);
                } else {
                    setParques(dados);
                }
            } catch {
                setErro("Não foi possível ligar ao servidor. Tenta novamente mais tarde.");
            } finally {
                setACarregar(false);
            }
        }
        carregarParques();
    }, []);

    if (aCarregar) {
        return <Loading />;
    }

    if (erro) {
        return <MensagemErro mensagem={erro} />;
    }

    const parquesFavoritos = parques.filter((parque) => favoritos.includes(parque.id));

    return (
        <div className="favoritos">
            <h1>Os meus favoritos</h1>
            {parquesFavoritos.length === 0 ? (
                <p>Ainda não tens parques favoritos.</p>
            ) : (
                <ul>
                    {parquesFavoritos.map((parque) => (
                        <li key={parque.id}>
                            <h2>{parque.nome}</h2>
                            <BotaoFavorito
                                ativo={eFavorito(parque.id)}
                                aoAlternar={() => alternarFavorito(parque.id)}
                            />
                            <p>{parque.descricao}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Favoritos;

