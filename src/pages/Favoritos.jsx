import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import ParqueCard from "../components/ParqueCard";
import { API } from "../services/api";
import styles from "./Favoritos.module.css";
import { Link } from "react-router-dom";

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
        <div className={styles['favoritos-page']}>
            <div className={styles['favoritos-header']}>
                <h1 className={styles['favoritos-title']}>Os Meus Favoritos</h1>
                <p className={styles['favoritos-subtitle']}>
                    Aqui encontras todos os parques de estacionamento que guardaste.
                </p>
            </div>
            
            {parquesFavoritos.length === 0 ? (
                <div className={styles['empty-state']}>
                    <div className={styles['empty-icon-circle']}>
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--color-primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <h3 className={styles['empty-title']}>Ainda não tens favoritos</h3>
                    <p className={styles['empty-desc']}>
                        Explora a nossa lista de parques e guarda os teus favoritos para os encontrares rapidamente aqui.
                    </p>
                    <Link to="/" className={styles['empty-reset-btn']}>
                        Ver Parques
                    </Link>
                </div>
            ) : (
                <div className={styles['favoritos-flex-container']}>
                    {parquesFavoritos.map((parque) => (
                        <div key={parque.id} className={styles['favorito-flex-item']}>
                            <ParqueCard 
                                parque={parque}
                                eFavorito={eFavorito}
                                alternarFavorito={alternarFavorito}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favoritos;
