import styles from './ParqueFiltros.module.css';
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
    <div className={styles["filtros-container"]}>
      <div className={styles["filtros-top-row"]}>
        <div className={styles["search-input-wrapper"]}>
          <svg className={styles["search-icon"]} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className={styles["search-input"]}
            placeholder="Pesquisar por nome ou descrição do parque..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          {busca && (
            <button
              type="button"
              className={styles["clear-search-btn"]}
              onClick={() => setBusca('')}
              title="Limpar pesquisa"
            >
              ×
            </button>
          )}
        </div>

        <div className={styles["filter-group"]}>
          <label htmlFor="ordenacao-select" className={styles["filter-label"]}>Ordenar por:</label>
          <div className={styles["select-wrapper"]}>
            <select
              id="ordenacao-select"
              className={styles["custom-select"]}
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

      <div className={styles["filtros-bottom-row"]}>
        <div className={styles["selectors-cluster"]}>
          <div className={styles["filter-group"]}>
            <label htmlFor="aeroporto-select" className={styles["filter-label"]}>Aeroporto:</label>
            <div className={styles["select-wrapper"]}>
              <select
                id="aeroporto-select"
                className={styles["custom-select"]}
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

          <div className={styles["filter-group"]}>
            <label htmlFor="tipo-select" className={styles["filter-label"]}>Tipo de Parque:</label>
            <div className={styles["select-wrapper"]}>
              <select
                id="tipo-select"
                className={styles["custom-select"]}
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

        <div className={styles["filtros-actions-area"]}>
          <span className={styles["results-counter"]}>
            A mostrar <strong>{totalResultados}</strong> de {totalGeral} parques
          </span>

          {temFiltrosAtivos && (
            <button
              type="button"
              className={styles["btn-limpar-filtros"]}
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
    </div>
  );
}


