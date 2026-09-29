import { useState, useEffect } from 'react';
import { contarDiasReserva, getHojeFormatado } from '../utils/datas';
import { API } from '../services/api';

const FormularioReserva = ({ parque }) => {
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const [precoEstimado, setPrecoEstimado] = useState(0);
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    useEffect(() => {
        if (dataInicio && dataFim && parque?.precoDia) {
            const dias = contarDiasReserva(dataInicio, dataFim);

            if (dias > 0) {
                setPrecoEstimado(dias * parque.precoDia);
            }
            else {
                setPrecoEstimado(0);
            }
        }
    }, [dataInicio, dataFim, parque]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagemErro('');
        setMensagemSucesso('');
        
        if (quantidade > parque.capacidade) {
            setMensagemErro(`A quantidade de pessoas excede a capacidade do parque (${parque.capacidade}).`);
            return;
        }

        try {
            const reserva = {
                itemId: Number(parque.id),
                dataInicio,
                dataFim,
                quantidade: Number(quantidade),
                nome,
                email,
            };
            
          const response = await fetch(`${API}/reservas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
          });

          const data = await response.json();

          if (!response.ok) {
            setMensagemErro(data.erro);
            return;
          } else {
            setMensagemSucesso('Reserva efetuada com sucesso!');
          }
     
    } catch (error) {
      // Regra da API: Para o caso de a API estar desligada
      setMensagemErro('Erro ao contactar o servidor. Tente novamente mais tarde.');
    }
  };

  if (!parque) return <p>A carregar formulário...</p>;

  return (
    <div className="formulario-reserva">
      <h3>Fazer Reserva</h3>
      {mensagemErro && <div className="erro">{mensagemErro}</div>}
      {mensagemSucesso && <div className="sucesso">{mensagemSucesso}</div>}

      <form onSubmit={handleSubmit}>
        <label>
            Data de Início:
            <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                min={getHojeFormatado()}
            required
            />
        </label>
        <label>
            Data de Fim:
            <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                min={dataInicio || getHojeFormatado()}
                required
            />
        </label>
        <label>
            Quantidade de Pessoas:
            <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="1"
                max={parque.capacidade}
                required
            />
        </label>
        <label>
            Nome:
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
        </label>
        <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </label>
        <p>Preço Estimado: {precoEstimado.toFixed(2)} €</p>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default FormularioReserva;