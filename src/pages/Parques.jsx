import React, { useState } from 'react';
import useParques from '../hooks/useParques';
import ParqueCard from '../components/ParqueCard';
import ParqueFiltros from '../components/ParqueFiltros';

export default function Parques() {
  const { parques, loading, error } = useParques();

  // Estados simples para os filtros
  const [busca, setBusca] = useState('');
  const [aeroporto, setAeroporto] = useState('todos');
  const [tipo, setTipo] = useState('todos');
  const [ordenacao, setOrdenacao] = useState('padrao');

  // Se estiver a carregar
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

  // Se ocorrer um erro
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

  // 1. Obter lista de aeroportos únicos diretamente
  const aeroportosDisponiveis = Array.from(
    new Set(parques.map((p) => p.localizacao).filter(Boolean))
  );

  // 2. Filtrar os parques com JavaScript normal (filter e sort)
  let parquesFiltrados = [...parques];

  // Filtro por texto (pesquisa no nome, descrição ou localização)
  if (busca.trim() !== '') {
    const termo = busca.toLowerCase().trim();
    parquesFiltrados = parquesFiltrados.filter((parque) => {
      const nome = (parque.nome || '').toLowerCase();
      const desc = (parque.descricao || '').toLowerCase();
      const loc = (parque.localizacao || '').toLowerCase();
      return nome.includes(termo) || desc.includes(termo) || loc.includes(termo);
    });
  }

  // Filtro por aeroporto
  if (aeroporto !== 'todos') {
    parquesFiltrados = parquesFiltrados.filter((parque) => parque.localizacao === aeroporto);
  }

  // Filtro por tipo (Coberto / Descoberto)
  if (tipo !== 'todos') {
    parquesFiltrados = parquesFiltrados.filter((parque) => parque.categoria === tipo);
  }

  // Ordenação
  if (ordenacao === 'preco-asc') {
    parquesFiltrados.sort((a, b) => (a.precoDia || 0) - (b.precoDia || 0));
  } else if (ordenacao === 'preco-desc') {
    parquesFiltrados.sort((a, b) => (b.precoDia || 0) - (a.precoDia || 0));
  } else if (ordenacao === 'avaliacao-desc') {
    parquesFiltrados.sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0));
  } else if (ordenacao === 'distancia-asc') {
    parquesFiltrados.sort((a, b) => (a.distanciaTerminalMin || 0) - (b.distanciaTerminalMin || 0));
  }

  // Função para repor todos os filtros
  const handleLimparFiltros = () => {
    setBusca('');
    setAeroporto('todos');
    setTipo('todos');
    setOrdenacao('padrao');
  };

  return (
    <div className="parques-page">
      <div className="parques-header">
        <h2 className="parques-title">Parques de Estacionamento</h2>
        <p className="parques-subtitle">
          Reserve o seu lugar com transfer gratuito, máxima segurança e o melhor preço garantido.
        </p>
      </div>

      {/* Componente de Filtros e Pesquisa */}
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

      {/* Se não houver resultados com os filtros aplicados */}
      {parquesFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-circle">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
          </div>
          <h3 className="empty-title">Nenhum parque encontrado</h3>
          <p className="empty-desc">
            Não encontrámos nenhum parque com os filtros ou termo de pesquisa selecionados.
          </p>
          <button
            type="button"
            className="empty-reset-btn"
            onClick={handleLimparFiltros}
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        /* Container Flex Responsivo (3 por linha no desktop) */
        <div className="parques-flex-container">
          {parquesFiltrados.map((parque) => (
            <div key={parque.id} className="parque-flex-item">
              <ParqueCard parque={parque} />
            </div>
          ))}
        </div>
      )}

      {/* Estilos CSS */}
      <style>{`
        .parques-page {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 20px 60px 20px;
          box-sizing: border-box;
        }

        .parques-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .parques-title {
          font-size: 34px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
          letter-spacing: -0.6px;
        }

        .parques-subtitle {
          font-size: 16px;
          color: #64748b;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* Display Flex com 3 cards por linha */
        .parques-flex-container {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: flex-start;
          align-items: stretch;
          width: 100%;
          box-sizing: border-box;
        }

        /* 3 por linha em telas grandes (Desktop) */
        .parque-flex-item {
          flex: 0 0 calc((100% - 48px) / 3);
          box-sizing: border-box;
          display: flex;
        }

        /* 2 por linha em telas médias (Tablets) */
        @media (max-width: 1024px) {
          .parque-flex-item {
            flex: 0 0 calc((100% - 24px) / 2);
          }
        }

        /* 1 por linha em telas pequenas (Mobile) */
        @media (max-width: 680px) {
          .parques-flex-container {
            gap: 20px;
          }
          .parque-flex-item {
            flex: 0 0 100%;
          }
          .parques-title {
            font-size: 26px;
          }
        }

        /* Empty State */
        .empty-state {
          background-color: #ffffff;
          border: 2px dashed #cbd5e1;
          border-radius: 24px;
          padding: 48px 24px;
          text-align: center;
          margin: 20px auto 40px;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-icon-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .empty-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .empty-desc {
          font-size: 14.5px;
          color: #64748b;
          margin: 0 0 20px 0;
          line-height: 1.4;
        }

        .empty-reset-btn {
          background-color: #3b82f6;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }

        .empty-reset-btn:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}