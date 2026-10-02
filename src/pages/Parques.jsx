import React, { useState } from 'react';
import useParques from '../hooks/useParques';
import ParqueCard from '../components/ParqueCard';
import ParqueFiltros from '../components/ParqueFiltros';
import styles from './Parques.module.css';

export default function Parques() {
  const { parques, loading, error } = useParques();

  const [busca, setBusca] = useState('');
  const [aeroporto, setAeroporto] = useState('todos');
  const [tipo, setTipo] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('padrao');

  if (loading) {
    return (
      <div className="parques-loading">
        <div className="spinner"></div>
        <p>A carregar os parques disponíveis...</p>
        <style>{`
          .parques-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 350px;
            color: #64748b;
            gap: 16px;
          }
          .spinner {
            width: 44px;
            height: 44px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="parques-error">
        <h3>Não foi possível carregar os parques</h3>
        <p>{error}</p>
        <style>{`
          .parques-error {
            background-color: #fef2f2;
            border: 1px solid #fee2e2;
            color: #991b1b;
            padding: 24px;
            border-radius: 16px;
            margin: 30px auto;
            max-width: 600px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  const aeroportosDisponiveis = Array.from(
    new Set(parques.map((p) => p.localizacao).filter(Boolean))
  );

  let parquesFiltrados = [...parques];

  if (busca.trim() !== '') {
    const termo = busca.toLowerCase().trim();
    parquesFiltrados = parquesFiltrados.filter((parque) => {
      const nome = (parque.nome || '').toLowerCase();
      const desc = (parque.descricao || '').toLowerCase();
      const loc = (parque.localizacao || '').toLowerCase();
      return nome.includes(termo) || desc.includes(termo) || loc.includes(termo);
    });
  }

  if (aeroporto !== 'todos') {
    parquesFiltrados = parquesFiltrados.filter((parque) => parque.localizacao === aeroporto);
  }

  if (tipo !== 'todos') {
    parquesFiltrados = parquesFiltrados.filter((parque) => parque.categoria === tipo);
  }

  if (ordenacao === 'preco-asc') {
    parquesFiltrados.sort((a, b) => (a.precoDia || 0) - (b.precoDia || 0));
  } else if (ordenacao === 'preco-desc') {
    parquesFiltrados.sort((a, b) => (b.precoDia || 0) - (a.precoDia || 0));
  } else if (ordenacao === 'avaliacao-desc') {
    parquesFiltrados.sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0));
  } else if (ordenacao === 'distancia-asc') {
    parquesFiltrados.sort((a, b) => (a.distanciaTerminalMin || 0) - (b.distanciaTerminalMin || 0));
  }

  const handleLimparFiltros = () => {
    setBusca('');
    setAeroporto('todos');
    setTipo('todos');
    setOrdenacao('padrao');
  };

  return (
    <div className={styles['parques-page']}>
      <div className={styles['parques-header']}>
        <h2 className={styles['parques-title']}>Parques de Estacionamento</h2>
        <p className={styles['parques-subtitle']}>
          Reserve o seu lugar com transfer gratuito, máxima segurança e o melhor preço garantido.
        </p>
      </div>

      <ParqueFiltros
        busca={busca}
        setBusca={setBusca}
        aeroporto={aeroporto}
        setAeroporto={setAeroporto}
        tipo={tipo}
        setTipo={setTipo}
        ordenacao={ordenacao}
        setOrdenacao={setOrdenacao}
        aeroportosDisponiveis={aeroportosDisponiveis}
        totalResultados={parquesFiltrados.length}
        totalGeral={parques.length}
        onLimparFiltros={handleLimparFiltros}
      />

      {parquesFiltrados.length === 0 ? (
        <div className={styles['empty-state']}>
          <div className={styles['empty-icon-circle']}>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
          </div>
          <h3 className={styles['empty-title']}>Nenhum parque encontrado</h3>
          <p className={styles['empty-desc']}>
            Não encontrámos nenhum parque com os filtros ou termo de pesquisa selecionados.
          </p>
          <button
            type="button"
            className={styles['empty-reset-btn']}
            onClick={handleLimparFiltros}
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className={styles['parques-flex-container']}>
          {parquesFiltrados.map((parque) => (
            <div key={parque.id} className={styles['parque-flex-item']}>
              <ParqueCard parque={parque} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}