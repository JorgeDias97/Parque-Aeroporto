import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contarDiasReserva, getHojeFormatado } from '../utils/datas';
import { API } from '../services/api';
import styles from './FormularioReserva.module.css';

const FormularioReserva = ({ parque }) => {
    const navigate = useNavigate();
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
            setTimeout(() => {
                navigate('/reservas');
            }, 1500);
          }
     
    } catch (error) {
      setMensagemErro('Erro ao contactar o servidor. Tente novamente mais tarde.');
    }
  };

  if (!parque) return <p>A carregar formulário...</p>;

  return (
    <div className={styles.formularioContainer}>
      <h3 className={styles.titulo}>Fazer Reserva</h3>
      {mensagemErro && <div className={styles.mensagemErro}>{mensagemErro}</div>}
      {mensagemSucesso && <div className={styles.mensagemSucesso}>{mensagemSucesso}</div>}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.formGroup}>
            <label className={styles.label}>Data de Início</label>
            <input
                className={styles.input}
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                min={getHojeFormatado()}
            required
            />
        </div>
        <div className={styles.formGroup}>
            <label className={styles.label}>Data de Fim</label>
            <input
                className={styles.input}
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                min={dataInicio || getHojeFormatado()}
                required
            />
        </div>
        <div className={styles.formGroupFull}>
            <label className={styles.label}>Quantidade de Pessoas</label>
            <input
                className={styles.input}
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="1"
                max={parque.capacidade}
                required
            />
        </div>
        <div className={styles.formGroupFull}>
            <label className={styles.label}>Nome Completo</label>
            <input
                className={styles.input}
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
        </div>
        <div className={styles.formGroupFull}>
            <label className={styles.label}>Email</label>
            <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        
        <div className={styles.precoContainer}>
            <span className={styles.precoLabel}>Preço Estimado</span>
            <span className={styles.precoValor}>{precoEstimado.toFixed(2)} €</span>
        </div>
        
        <button type="submit" className={styles.btnReservar}>Reservar Parque</button>
      </form>
    </div>
  );
};

export default FormularioReserva;