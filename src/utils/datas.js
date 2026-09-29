export const contarDiasReserva = (dataInicio, dataFim) => {

    if (!dataInicio || !dataFim) {
        return 0;
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    inicio.setHours(0, 0, 0, 0);
    fim.setHours(0, 0, 0, 0);
    
    const diferenca = fim.getTime() - inicio.getTime();

    const dias = Math.round(diferenca / (1000 * 3600 * 24));

    return dias + 1;
};

export const getHojeFormatado = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    
    return `${ano}-${mes}-${dia}`;
}

