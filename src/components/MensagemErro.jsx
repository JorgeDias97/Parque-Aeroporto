function MensagemErro({ mensagem = "Ocorreu um erro." }) {
	return <div className="mensagem-erro" role="alert">{mensagem}</div>;
}

export default MensagemErro;