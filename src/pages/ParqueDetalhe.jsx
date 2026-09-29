import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";

const API = "http://localhost:3001/parqueaeroporto"; // temporário, até existir services/api.js

function ParqueDetalhe({ id }) {
  const [parque, setParque] = useState(null);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarParque() {
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
      <p>{parque.descricao}</p>
    </div>
  );
}

export default ParqueDetalhe;