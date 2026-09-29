import React from 'react';
import { Link } from 'react-router-dom';

// Imagens padrão de fallback realista
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=80'
];

export default function ParqueCard({ parque }) {
  if (!parque) return null;

  // Imagem do parque ou fallback
  const cardImage = parque.imagem || DEFAULT_IMAGES[(parque.id || 1) % DEFAULT_IMAGES.length];



  // Formatar preço por dia no formato português (ex: 7,00€)
  const precoFormatado = Number(parque.precoDia || 0).toLocaleString('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + '€';

  // Serviços booleanos com ícones e tooltips descritivos ao passar o rato
  const servicos = [
    {
      id: 'videovigilancia',
      nome: 'Videovigilância 24/7',
      disponivel: Boolean(parque.videovigilancia),
      tooltip: parque.videovigilancia
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
      disponivel: Boolean(parque.carregamentoEletrico),
      tooltip: parque.carregamentoEletrico
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
      disponivel: Boolean(parque.lavagem),
      tooltip: parque.lavagem
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
      nome: parque.categoria === 'Coberto' ? 'Parque Coberto' : 'Parque ao Ar Livre',
      disponivel: true,
      tooltip: parque.categoria === 'Coberto'
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
    <div className="parque-card">
      {/* 1. Imagem de Cabeçalho (com overflow hidden apenas nela para os cantos superiores) */}
      <div className="card-media-wrapper">
        <img
          src={cardImage}
          alt={parque.nome}
          className="card-image"
          loading="lazy"
        />

        {/* Badge da distância pedonal / minutos */}
        <div className="badge-distancia">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="2" />
            <path d="m9 20 3-6 3 2 2 5" />
            <path d="m6 13 4-2 3 3 4-1" />
          </svg>
          <span>{parque.distanciaTerminalMin || 10} MINS</span>
        </div>
      </div>


      <div className="card-body">
        <div className="card-header-row">
          <div className="title-area">
            <h3 className="card-title">{parque.nome}</h3>
            <p className="card-subtitle">
              {parque.descricao || `Localizado no ${parque.localizacao || 'Aeroporto'}`}
            </p>
          </div>
        </div>

        <div className="services-toolbar">
          <span className="services-label">Comodidades:</span>
          <div className="services-icons-list">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className={`service-icon-wrapper ${servico.disponivel ? 'active' : 'disabled'}`}
              >
                <div className="icon-circle">
                  {servico.icon}
                </div>
                <div className="tooltip">
                  <span className="tooltip-title">{servico.nome}</span>
                  <span className="tooltip-desc">{servico.tooltip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className="card-highlights">
          <li>
            <svg className="check-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>{parque.categoria === 'Coberto' ? 'Parque Coberto' : 'Parque Descoberto'}</span>
          </li>
          <li>
            <svg className="check-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>{parque.videovigilancia ? 'Videovigilância 24/7 ativa' : 'Acesso controlado 24/7'}</span>
          </li>
        </ul>

        <div className="card-footer">
          <div className="price-container">
            <span className="price-amount">{precoFormatado}</span>
            <span className="price-unit">/dia</span>
          </div>

          <Link
            to={`/parque/${parque.id}`}
            className="btn-detalhes"
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

      <style>{`
        /* Reset de alinhamento e container do Card */
        .parque-card {
          position: relative;
          background: #ffffff;
          border-radius: 28px;
          border: 1px solid #edf0f5;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
          /* overflow: visible para não cortar os tooltips nem badges */
          overflow: visible;
          display: flex;
          flex-direction: column;
          text-align: left;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
          width: 100%;
          box-sizing: border-box;
          z-index: 1;
        }

        /* Eleva o z-index do card ativo para ficar por cima dos cards vizinhos */
        .parque-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 38px -10px rgba(0, 0, 0, 0.14);
          z-index: 50;
        }

        /* Topo da Imagem (overflow hidden apenas aqui para recortar a foto nos cantos superiores) */
        .card-media-wrapper {
          position: relative;
          width: 100%;
          height: 190px;
          background-color: #e2e8f0;
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .parque-card:hover .card-image {
          transform: scale(1.04);
        }

        /* Badge Distância (canto inferior esquerdo da imagem) */
        .badge-distancia {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(6px);
          color: #1e3a5f;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
          z-index: 2;
        }

        

        /* Corpo do Cartão */
        .card-body {
          padding: 24px 22px 20px 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          overflow: visible;
        }

        /* Linha do Título e Mais Info */
        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }

        .title-area {
          flex: 1;
          padding-right: 48px; /* Espaço para não sobrepor o badge laranja */
        }

        .card-title {
          font-size: 21px;
          font-weight: 700;
          color: #1a2233;
          margin: 0 0 6px 0;
          line-height: 1.25;
        }

        .card-subtitle {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Link Mais Info */
        .mais-info-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
          transition: color 0.2s;
          margin-top: 2px;
        }

        .mais-info-link:hover {
          color: #1d4ed8;
        }

        /* Toolbar de Serviços / Ícones com Tooltip */
        .services-toolbar {
          position: relative;
          margin: 10px 0 16px 0;
          padding: 10px 14px;
          background-color: #f8fafc;
          border-radius: 14px;
          border: 1px dashed #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          overflow: visible;
        }

        .services-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .services-icons-list {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: visible;
        }

        /* Wrapper do Ícone e Tooltip */
        .service-icon-wrapper {
          position: relative;
          display: inline-flex;
          cursor: pointer;
          z-index: 2;
        }

        .service-icon-wrapper:hover {
          z-index: 100;
        }

        .icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .service-icon-wrapper.active .icon-circle {
          background-color: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .service-icon-wrapper.disabled .icon-circle {
          background-color: #f1f5f9;
          color: #94a3b8;
          border: 1px solid #e2e8f0;
          opacity: 0.55;
        }

        .service-icon-wrapper:hover .icon-circle {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.18);
        }

        /* Tooltip customizado flutuante */
        .tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background-color: #0f172a;
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 9px;
          font-size: 11.5px;
          line-height: 1.35;
          width: max-content;
          max-width: 220px;
          text-align: center;
          white-space: normal;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
          z-index: 9999;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #0f172a transparent transparent transparent;
        }

        .service-icon-wrapper:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .tooltip-title {
          font-weight: 700;
          color: #93c5fd;
          margin-bottom: 3px;
        }

        .tooltip-desc {
          color: #e2e8f0;
          font-size: 11px;
        }

        /* Lista de Destaques */
        .card-highlights {
          list-style: none;
          padding: 0;
          margin: 0 0 22px 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
          flex-grow: 1;
        }

        .card-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #334155;
          line-height: 1.35;
        }

        .check-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Rodapé do Cartão */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid #f1f5f9;
          margin-top: auto;
          gap: 12px;
        }

        .price-container {
          display: flex;
          align-items: baseline;
          gap: 3px;
        }

        .price-amount {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }

        .price-unit {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        /* Botão para a Página de Detalhes */
        .btn-detalhes {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #4275a5;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 9999px;
          padding: 11px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(66, 117, 165, 0.25);
          white-space: nowrap;
        }

        .btn-detalhes:hover {
          background-color: #33618d;
          box-shadow: 0 6px 16px rgba(51, 97, 141, 0.35);
          transform: translateY(-1px);
        }

        .btn-detalhes:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}