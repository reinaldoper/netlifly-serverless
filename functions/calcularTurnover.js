const calcularTurnover = (datasAtivos, datasInativos, totalFuncionarios) => {
  const meses = [...new Set(datasAtivos.map(data => data.split('/')[1]))];
  const turnovers = [];

  for (const mes of meses) {
    const ativosMes = datasAtivos.filter(data => data.split('/')[1] === mes).length;
    const inativosMes = datasInativos.filter(data => data.split('/')[1] === mes).length;

    const turnover = inativosMes / ((ativosMes + totalFuncionarios) / 2);
    turnovers.push({
      turnover,
      data: mes
    });
  }

  turnovers.sort((a, b) => new Date(a.data) - new Date(b.data));

  return turnovers;
};

export { calcularTurnover };