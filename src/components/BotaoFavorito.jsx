function BotaoFavorito({ ativo, aoAlternar }) {
  return (
    <button
      type="button"
      className="botao-favorito"
      onClick={aoAlternar}
      aria-label={ativo ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {ativo ? "♥" : "♡"}
    </button>
  );
}

export default BotaoFavorito;