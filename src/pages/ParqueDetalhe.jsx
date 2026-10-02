import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import BotaoFavorito from "../components/BotaoFavorito";
import FormularioReserva from "../components/FormularioReserva";
import { API } from "../services/api";
import styles from "./ParqueDetalhe.module.css";

const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
];

const ICONES = {
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
    tag: <><path d="M3 12V3h9l9 9-9 9-9-9z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-4 3-6 7-6s7 2 7 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M22 21c0-3-2-5-5-5.7" /></>,
    walk: <><circle cx="12" cy="5" r="2" /><path d="m9 20 3-6 3 2 2 5" /><path d="m6 13 4-2 3 3 4-1" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
    wash: <><circle cx="12" cy="12" r="10" /><path d="m8 14 2.5-3 2 2 3.5-4" /><path d="M12 3v3" /></>,
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
};

function Icone({ nome, tamanho = 20 }) {
    return (
        <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONES[nome]}
        </svg>
    );
}

function ParqueDetalhe({ eFavorito, alternarFavorito }) {
    const { id } = useParams();
    const [parque, setParque] = useState(null);
    const [aCarregar, setACarregar] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarParque() {
            setACarregar(true);
            setErro(null);
            try {
                const resposta = await fetch(`${API}/itens/${id}`);
                const dados = await resposta.json();
                if (!resposta.ok) {
                    setErro(dados.erro);
                } else {
                    setParque(dados);
                }
            } catch {
                setErro("Não foi possível ligar ao servidor. Tenta novamente mais tarde.");
            } finally {
                setACarregar(false);
            }
        }
        carregarParque();
    }, [id]);

    if (aCarregar) {
        return <Loading />;
    }

    if (erro) {
        return <MensagemErro mensagem={erro} />;
    }

    const imagem = parque.imagem || DEFAULT_IMAGES[(parque.id || 1) % DEFAULT_IMAGES.length];
    const coberto = parque.categoria === "Coberto";

    const precoFormatado = Number(parque.precoDia || 0).toLocaleString("pt-PT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + "€";

    const avaliacao = Number(parque.avaliacao || 0);
    const estrelasCheias = Math.round(avaliacao);
    const estrelas = "★".repeat(estrelasCheias) + "☆".repeat(5 - estrelasCheias);

    const infos = [
        { icon: "tag", label: "Categoria", valor: parque.categoria },
        { icon: "pin", label: "Localização", valor: parque.localizacao },
        { icon: "users", label: "Lotação máxima", valor: `${parque.capacidade} passageiros` },
        { icon: "walk", label: "Distância ao terminal", valor: `${parque.distanciaTerminalMin} minutos` },
    ];

    const comodidades = [
        { id: "coberto", icon: "home", nome: coberto ? "Parque coberto" : "Parque ao ar livre", ativo: true },
        { id: "video", icon: "shield", nome: "Videovigilância 24/7", ativo: Boolean(parque.videovigilancia) },
        { id: "eletrico", icon: "bolt", nome: "Carregamento elétrico", ativo: Boolean(parque.carregamentoEletrico) },
        { id: "lavagem", icon: "wash", nome: "Lavagem de viaturas", ativo: Boolean(parque.lavagem) },
    ];

    return (
        <div className={styles.pagina}>
            <div className={styles.imagemWrapper}>
                <img src={imagem} alt={parque.nome} className={styles.imagem} />
                <div className={styles.badge}>
                    <Icone nome="walk" tamanho={16} />
                    <span>{parque.distanciaTerminalMin} MINS</span>
                </div>
            </div>

            <div className={styles.cabecalho}>
                <div className={styles.tituloArea}>
                    <div className={styles.tituloLinha}>
                        <h1 className={styles.titulo}>{parque.nome}</h1>
                        <BotaoFavorito
                            ativo={eFavorito(parque.id)}
                            aoAlternar={() => alternarFavorito(parque.id)}
                        />
                    </div>
                    <p className={styles.descricao}>{parque.descricao}</p>
                    <div className={styles.avaliacao} title={`${avaliacao} de 5`}>
                        <span className={styles.estrelas}>{estrelas}</span>
                        <span>{avaliacao.toFixed(1)}</span>
                    </div>
                </div>

                <div className={styles.preco}>
                    <span className={styles.precoValor}>{precoFormatado}</span>
                    <span className={styles.precoUnidade}>/dia</span>
                </div>
            </div>

            <div className={styles.infoGrid}>
                {infos.map((info) => (
                    <div key={info.label} className={styles.infoItem}>
                        <div className={styles.infoIcon}><Icone nome={info.icon} /></div>
                        <div>
                            <span className={styles.infoLabel}>{info.label}</span>
                            <span className={styles.infoValor}>{info.valor}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.seccao}>
                <h2 className={styles.seccaoTitulo}>Comodidades</h2>
                <ul className={styles.comodidades}>
                    {comodidades.map((c) => (
                        <li
                            key={c.id}
                            className={`${styles.comodidade} ${c.ativo ? styles.ativo : styles.inativo}`}
                        >
                            <Icone nome={c.icon} tamanho={18} />
                            <span>{c.nome}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.reserva}>
                <FormularioReserva parque={parque} />
            </div>
        </div>
    );
}

export default ParqueDetalhe;