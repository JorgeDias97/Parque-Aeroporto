import { useState, useEffect } from "react";
import { API } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";

export default function MinhasReservas() {
    const [reservas, setReservas] = useState([]);
    const [emailFiltro, setEmailFiltro] = useState("");
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

    if (loading) return <Loading />;
    if (erro) return <MensagemErro mensagem={erro} />;

    const reservasFiltradas = emailFiltro
        ? reservas.filter(r => r.email.toLowerCase().includes(emailFiltro.toLowerCase()))
        : reservas;

    return (
        <div className="minhas-reservas bg-white p-8 rounded-xl shadow-lg border-t-4 border-accent">
            <h1 className="text-4xl font-bold mb-4 text-primary">As Minhas Reservas</h1>
            
            <div className="mb-6">
                <input 
                    type="email" 
                    placeholder="Filtrar por email..." 
                    className="border p-2 rounded w-full max-w-md"
                    value={emailFiltro}
                    onChange={(e) => setEmailFiltro(e.target.value)}
                />
            </div>

            {reservasFiltradas.length === 0 ? (
                <p className="text-gray-600 text-lg">Nenhuma reserva encontrada.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {reservasFiltradas.map((reserva) => (
                        <div key={reserva.id} className="border p-4 rounded-lg shadow-sm bg-gray-50 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Reserva #{reserva.id}</h3>
                                <p><strong>Parque ID:</strong> {reserva.itemId}</p>
                                <p><strong>Email:</strong> {reserva.email}</p>
                                <p><strong>Nome:</strong> {reserva.nome}</p>
                                <p><strong>Entrada:</strong> {reserva.dataInicio}</p>
                                <p><strong>Saída:</strong> {reserva.dataFim}</p>
                                <p><strong>Passageiros:</strong> {reserva.quantidade}</p>
                            </div>
                            <button 
                                onClick={() => cancelarReserva(reserva.id)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors"
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

