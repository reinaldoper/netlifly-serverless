const calcularHeadcount = (datasAtivos, datasInativos, totalFuncionarios) => {
  const datasCompletas = [...datasAtivos, ...datasInativos];
  const datasUnicas = [...new Set(datasCompletas)];

  const headcount = [];
  const mesesAnos = [];

  for (let i = 0; i < datasUnicas.length; i++) {
    const data = datasUnicas[i];
    const [dia, mes, ano] = data.split('/');

    const mesAno = `${mes}/${ano}`;

    if (!mesesAnos.includes(mesAno)) {
      mesesAnos.push(mesAno);

      const dataAtual = new Date(parseInt(ano), parseInt(mes) - 1, 1);
      const dataProximoMes = new Date(parseInt(ano), parseInt(mes), 1);

      let contadorAtivos = 0;

      for (let j = 0; j < datasAtivos.length; j++) {
        const [diaAtivo, mesAtivo, anoAtivo] = datasAtivos[j].split('/');
        const dataAtivo = new Date(parseInt(anoAtivo), parseInt(mesAtivo) - 1, parseInt(diaAtivo));

        if (dataAtivo >= dataAtual && dataAtivo < dataProximoMes) {
          contadorAtivos++;
        }
      }

      const turnover = (totalFuncionarios - contadorAtivos) / totalFuncionarios;
      headcount.push(turnover);
    }
  }

  return headcount;
}

export { calcularHeadcount }
