import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import BotaoFavorito from "../components/BotaoFavorito";

const API = "http://localhost:3001/parqueaeroporto"; // temporário, até existir services/api.js

function ParqueDetalhe({ id, eFavorito, alternarFavorito }) {
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

    return (
        <div className="parque-detalhe">
            <h1>{parque.nome}</h1>
            <BotaoFavorito
                ativo={eFavorito(parque.id)}
                aoAlternar={() => alternarFavorito(parque.id)}
            />
            <p>{parque.descricao}</p>
            <p>Categoria: {parque.categoria}</p>
            <p>Localização: {parque.localizacao}</p>
            <p>Lotação máxima: {parque.capacidade} passageiros</p>
            <p>Distância até ao terminal mais próximo: {parque.distanciaTerminalMin} minutos</p>
            <p>O preço por dia é {parque.precoDia} euros </p>
            <p> Avaliação: {parque.avaliacao} estrelas</p>
            {parque.imagem ? (
                <img src={parque.imagem} alt={parque.nome} />
            ) : (
                <div className="sem-imagem">Sem imagem</div>
            )}
            <ul className="extras">
                {parque.lavagem && <li>Lavagem</li>}
                {parque.carregamentoEletrico && <li>Carregamento elétrico</li>}
                {parque.videovigilancia && <li>Videovigilância</li>}
            </ul>
        </div>
    );

}

export default ParqueDetalhe;