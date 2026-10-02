import { useState, useEffect, useMemo } from "react";
import { API } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import ReservaFiltros from "../components/ReservaFiltros";
import styles from "./MinhasReservas.module.css";

export default function MinhasReservas() {
    const [reservas, setReservas] = useState([]);
    
    const [busca, setBusca] = useState("");
    const [ordenacao, setOrdenacao] = useState("mais-recentes");
    
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarReservas();
    }, []);

    const carregarReservas = async () => {
        setLoading(true);
        try {
            const resposta = await fetch(`${API}/reservas`);
            if (!resposta.ok) {
                const dados = await resposta.json();
                setErro(dados.erro || "Erro ao carregar as reservas.");
            } else {
                const dados = await resposta.json();
                setReservas(dados);
            }
        } catch (e) {
            setErro("Não foi possível ligar ao servidor. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const cancelarReserva = async (id) => {
        if (!window.confirm("Tem a certeza que deseja cancelar esta reserva?")) return;
        
        try {
            const resposta = await fetch(`${API}/reservas/${id}`, {
                method: 'DELETE'
            });
            if (resposta.ok) {
                setReservas(reservas.filter(reserva => reserva.id !== id));
            } else {
                const dados = await resposta.json();
                alert(dados.erro || "Não foi possível cancelar a reserva.");
            }
        } catch {
            alert("Erro ao ligar ao servidor.");
        }
    };

    const reservasProcessadas = useMemo(() => {
        let resultado = [...reservas];

        if (busca.trim() !== '') {
            const buscaMin = busca.toLowerCase();
            resultado = resultado.filter(r => 
                (r.nome && r.nome.toLowerCase().includes(buscaMin)) || 
                (r.email && r.email.toLowerCase().includes(buscaMin))
            );
        }

        resultado.sort((a, b) => {
            if (ordenacao === 'mais-recentes') {
                return new Date(b.dataInicio) - new Date(a.dataInicio);
            } else if (ordenacao === 'mais-antigas') {
                return new Date(a.dataInicio) - new Date(b.dataInicio);
            } else if (ordenacao === 'nome-asc') {
                return (a.nome || "").localeCompare(b.nome || "");
            } else if (ordenacao === 'nome-desc') {
                return (b.nome || "").localeCompare(a.nome || "");
            }
            return 0;
        });

        return resultado;
    }, [reservas, busca, ordenacao]);

    const limparFiltros = () => {
        setBusca("");
        setOrdenacao("mais-recentes");
    };

    if (loading) return <Loading />;
    if (erro) return <MensagemErro mensagem={erro} />;

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>As Minhas Reservas</h1>
            
            <ReservaFiltros 
                busca={busca}
                setBusca={setBusca}
                ordenacao={ordenacao}
                setOrdenacao={setOrdenacao}
                totalResultados={reservasProcessadas.length}
                totalGeral={reservas.length}
                onLimparFiltros={limparFiltros}
            />

            {reservasProcessadas.length === 0 ? (
                <div className={styles.vazioContainer}>
                    <p className={styles.vazio}>Nenhuma reserva encontrada para a tua pesquisa.</p>
                </div>
            ) : (
                <div className={styles.gridReservas}>
                    {reservasProcessadas.map((reserva) => (
                        <div key={reserva.id} className={styles.cartaoReserva}>
                            <div>
                                <h3 className={styles.reservaId}>Reserva #{reserva.id}</h3>
                                <p className={styles.reservaDetalhe}><strong>Parque ID:</strong> {reserva.itemId}</p>
                                <p className={styles.reservaDetalhe}><strong>Email:</strong> {reserva.email}</p>
                                <p className={styles.reservaDetalhe}><strong>Nome:</strong> {reserva.nome}</p>
                                <p className={styles.reservaDetalhe}><strong>Entrada:</strong> {reserva.dataInicio}</p>
                                <p className={styles.reservaDetalhe}><strong>Saída:</strong> {reserva.dataFim}</p>
                                <p className={styles.reservaDetalhe}><strong>Passageiros:</strong> {reserva.quantidade}</p>
                            </div>
                            <button 
                                onClick={() => cancelarReserva(reserva.id)}
                                className={styles.btnCancelar}
                            >
                                Cancelar Reserva
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
