const calcularTurnover = (datasAtivos, datasInativos, totalFuncionarios) => {
  const meses = [...new Set(datasAtivos.map(data => data.split('/')[1]))];
  const turnovers = [];

  if (datasInativos.length === 0) {
    const ativosTotais = datasAtivos.length;
    const turnoverSemInativos = 0 / ((ativosTotais + totalFuncionarios) / 2);
    turnovers.push({
      turnover: turnoverSemInativos,
      data: null
    });
  } else {
    for (const mes of meses) {
      const ativosMes = datasAtivos.filter(data => data.split('/')[1] === mes).length;
      const inativosMes = datasInativos.filter(data => data.split('/')[1] === mes).length;

      const turnover = inativosMes / ((ativosMes + totalFuncionarios) / 2);
      turnovers.push({
        turnover,
        data: mes
      });
    }
  }

  turnovers.sort((a, b) => {
    if (a.data === null) return 1;
    if (b.data === null) return -1;
    return new Date(a.data) - new Date(b.data);
  });

  return turnovers;
};



export { calcularTurnover };