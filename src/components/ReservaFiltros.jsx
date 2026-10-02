import styles from './ReservaFiltros.module.css';
import React from 'react';

export default function ReservaFiltros({
  busca,
  setBusca,
  ordenacao,
  setOrdenacao,
  totalResultados = 0,
  totalGeral = 0,
  onLimparFiltros
}) {
  const temFiltrosAtivos = busca !== '' || ordenacao !== 'mais-recentes';

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
            placeholder="Pesquisar por nome ou email..."
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
              <option value="mais-recentes">Entrada: Mais recentes</option>
              <option value="mais-antigas">Entrada: Mais antigas</option>
              <option value="nome-asc">Nome (A-Z)</option>
              <option value="nome-desc">Nome (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles["filtros-bottom-row"]} style={{ justifyContent: 'space-between', width: '100%' }}>
        <span className={styles["results-counter"]}>
          A mostrar <strong>{totalResultados}</strong> de {totalGeral} reservas
        </span>

        {temFiltrosAtivos && (
          <div className={styles["filtros-actions-area"]}>
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
          </div>
        )}
      </div>
    </div>
  );
}
