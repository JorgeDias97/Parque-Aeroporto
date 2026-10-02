import styles from './ParqueCard.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=80'
];

export default function ParqueCard({ parque }) {
  if (!parque) return null;

  const cardImage = parque.imagem || DEFAULT_IMAGES[(parque.id || 1) % DEFAULT_IMAGES.length];

  const extras = parque.extras || {};
  const lavagem = Boolean(parque.lavagem ?? extras.lavagem);
  const carregamentoEletrico = Boolean(parque.carregamentoEletrico ?? extras.carregamentoEletrico);
  const videovigilancia = Boolean(parque.videovigilancia ?? extras.videovigilancia);
  const distancia = parque.distanciaTerminalMin ?? extras.distanciaTerminalMin ?? 10;
  const coberto = parque.categoria === 'Coberto';

  const precoFormatado = Number(parque.precoDia ?? parque.preco ?? 0).toLocaleString('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + '€';

  const servicos = [
    {
      id: 'videovigilancia',
      nome: 'Videovigilância 24/7',
      disponivel: videovigilancia,
      tooltip: videovigilancia
        ? 'Parque com monitorização e videovigilância 24h por dia'
        : 'Sem videovigilância ativa 24/7',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'carregamentoEletrico',
      nome: 'Posto Elétrico',
      disponivel: carregamentoEletrico,
      tooltip: carregamentoEletrico
        ? 'Postos de carregamento para carros 100% elétricos e híbridos'
        : 'Sem posto de carregamento elétrico',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      id: 'lavagem',
      nome: 'Lavagem de Viaturas',
      disponivel: lavagem,
      tooltip: lavagem
        ? 'Serviço opcional de lavagem e higienização durante a estadia'
        : 'Sem serviço de lavagem',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m8 14 2.5-3 2 2 3.5-4" />
          <path d="M12 3v3" />
        </svg>
      )
    },
    {
      id: 'categoria',
      nome: coberto ? 'Parque Coberto' : 'Parque ao Ar Livre',
      disponivel: true,
      tooltip: coberto
        ? 'Parque 100% coberto e protegido das intempéries'
        : 'Parque ao ar livre em recinto vedado',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    }
  ];

  return (
    <div className={styles["parque-card"]}>
      <div className={styles["card-media-wrapper"]}>
        <img
          src={cardImage}
          alt={parque.nome}
          className={styles["card-image"]}
          loading="lazy"
        />

        <div className={styles["badge-distancia"]}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="2" />
            <path d="m9 20 3-6 3 2 2 5" />
            <path d="m6 13 4-2 3 3 4-1" />
          </svg>
          <span>{distancia} MINS</span>
        </div>
      </div>

      <div className={styles["card-body"]}>
        <div className={styles["card-header-row"]}>
          <div className={styles["title-area"]}>
            <h3 className={styles["card-title"]}>{parque.nome}</h3>
            <p className={styles["card-subtitle"]}>
              {parque.descricao || `Localizado no ${parque.localizacao || 'Aeroporto'}`}
            </p>
          </div>
        </div>

        <div className={styles["services-toolbar"]}>
          <span className={styles["services-label"]}>Comodidades:</span>
          <div className={styles["services-icons-list"]}>
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className={`${styles["service-icon-wrapper"]} ${servico.disponivel ? styles.active : styles.disabled}`}
              >
                <div className={styles["icon-circle"]}>
                  {servico.icon}
                </div>
                <div className={styles["tooltip"]}>
                  <span className={styles["tooltip-title"]}>{servico.nome}</span>
                  <span className={styles["tooltip-desc"]}>{servico.tooltip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className={styles["card-highlights"]}>
          {servicos.filter((s) => s.disponivel).map((s) => (
            <li key={s.id}>
              <svg className={styles["check-icon"]} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>{s.nome}</span>
            </li>
          ))}
        </ul>

        <div className={styles["card-footer"]}>
          <div className={styles["price-container"]}>
            <span className={styles["price-amount"]}>{precoFormatado}</span>
            <span className={styles["price-unit"]}>/dia</span>
          </div>

          <Link
            to={`/parque/${parque.id}`}
            className={styles["btn-detalhes"]}
            title={`Ver detalhes e calcular reserva de ${parque.nome}`}
          >
            <span>Ver Detalhes</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}