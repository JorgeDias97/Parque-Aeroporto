import React from 'react';

export default function ParqueFiltros({
  busca,
  setBusca,
  aeroporto,
  setAeroporto,
  tipo,
  setTipo,
  ordenacao,
  setOrdenacao,
  aeroportosDisponiveis = [],
  totalResultados = 0,
  totalGeral = 0,
  onLimparFiltros
}) {
  const temFiltrosAtivos = busca !== '' || aeroporto !== 'todos' || tipo !== 'todos' || ordenacao !== 'padrao';

  return (
    <div className="filtros-container">
      {/* Linha Principal: Pesquisa de Texto e Ordenação */}
      <div className="filtros-top-row">
        {/* Input de Pesquisa por Texto */}
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar por nome ou descrição do parque..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          {busca && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setBusca('')}
              title="Limpar pesquisa"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown de Ordenação */}
        <div className="filter-group">
          <label htmlFor="ordenacao-select" className="filter-label">Ordenar por:</label>
          <div className="select-wrapper">
            <select
              id="ordenacao-select"
              className="custom-select"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
            >
              <option value="padrao">Recomendados / Padrão</option>
              <option value="preco-asc">Preço: Mais barato primeiro</option>
              <option value="preco-desc">Preço: Mais caro primeiro</option>
              <option value="avaliacao-desc">Avaliação: Melhor primeiro </option>
              <option value="avaliacao-asc">Avaliação: Pior primeiro</option>
              <option value="distancia-asc">Mais perto do Terminal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Linha Secundária: Filtros de Seleção (Aeroporto, Tipo) e Ações */}
      <div className="filtros-bottom-row">
        <div className="selectors-cluster">
          {/* Filtro por Aeroporto */}
          <div className="filter-group">
            <label htmlFor="aeroporto-select" className="filter-label">Aeroporto:</label>
            <div className="select-wrapper">
              <select
                id="aeroporto-select"
                className="custom-select"
                value={aeroporto}
                onChange={(e) => setAeroporto(e.target.value)}
              >
                <option value="todos">Todos os Aeroportos</option>
                {aeroportosDisponiveis.map((aero) => (
                  <option key={aero} value={aero}>
                    {aero}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro por Tipo de Parque */}
          <div className="filter-group">
            <label htmlFor="tipo-select" className="filter-label">Tipo de Parque:</label>
            <div className="select-wrapper">
              <select
                id="tipo-select"
                className="custom-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="todos">Todos os Tipos</option>
                <option value="Coberto">Coberto</option>
                <option value="Descoberto">Descoberto / Ar Livre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Indicador de Resultados & Botão Limpar Filtros */}
        <div className="filtros-actions-area">
          <span className="results-counter">
            A mostrar <strong>{totalResultados}</strong> de {totalGeral} parques
          </span>

          {temFiltrosAtivos && (
            <button
              type="button"
              className="btn-limpar-filtros"
              onClick={onLimparFiltros}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <span>Limpar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Estilos do Componente de Filtros */}
      <style>{`
        .filtros-container {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
          padding: 20px 24px;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          box-sizing: border-box;
          width: 100%;
        }

        .filtros-top-row {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
        }

        /* Input de Busca */
        .search-input-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 12px 38px 12px 42px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          font-size: 14.5px;
          color: #1e293b;
          outline: none;
          background-color: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          background: #cbd5e1;
          border: none;
          color: #475569;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          line-height: 1;
          transition: background-color 0.15s;
        }

        .clear-search-btn:hover {
          background-color: #94a3b8;
          color: #ffffff;
        }

        /* Linha Secundária */
        .filtros-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .selectors-cluster {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* Grupo de cada filtro */
        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
          white-space: nowrap;
        }

        .select-wrapper {
          position: relative;
          display: inline-block;
        }

        .custom-select {
          appearance: none;
          background-color: #f8fafc;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 9px 34px 9px 12px;
          font-size: 13.5px;
          color: #1e293b;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .custom-select:focus {
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        /* Área de Ações e Contador */
        .filtros-actions-area {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
        }

        .results-counter {
          font-size: 13.5px;
          color: #64748b;
        }

        .results-counter strong {
          color: #0f172a;
        }

        .btn-limpar-filtros {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #fee2e2;
          color: #b91c1c;
          border: none;
          border-radius: 8px;
          padding: 7px 12px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }

        .btn-limpar-filtros:hover {
          background-color: #fecaca;
          transform: translateY(-1px);
        }

        /* Responsividade dos Filtros */
        @media (max-width: 900px) {
          .filtros-top-row {
            flex-direction: column;
            align-items: stretch;
          }
          .filtros-bottom-row {
            flex-direction: column;
            align-items: stretch;
          }
          .selectors-cluster {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-group {
            flex-direction: column;
            align-items: flex-start;
          }
          .select-wrapper,
          .custom-select {
            width: 100%;
          }
          .filtros-actions-area {
            justify-content: space-between;
            margin-left: 0;
            padding-top: 6px;
          }
        }
      `}</style>
    </div>
  );
}

