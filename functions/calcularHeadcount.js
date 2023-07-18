const calcularHeadcount = (datasAtivos, datasInativos, totalFuncionarios) => {
  const datasCompletas = [...datasAtivos, ...datasInativos];
  const datasUnicas = [...new Set(datasCompletas)];

  const headcount = [];
  const datasLabels = [];

  for (let i = 0; i < datasUnicas.length; i++) {
    const data = datasUnicas[i];
    const [dia, mes, ano] = data.split('/');

    const mesAno = `${mes}/${ano}`;

    if (!datasLabels.includes(mesAno)) {
      datasLabels.push(mesAno);

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
      headcount.push({
        headcount: turnover,
        data: mesAno
      });
    }
  }

  headcount.sort((a, b) => {
    const [mesA, anoA] = a.data.split('/');
    const [mesB, anoB] = b.data.split('/');

    if (anoA === anoB) {
      return parseInt(mesA) - parseInt(mesB);
    } else {
      return parseInt(anoA) - parseInt(anoB);
    }
  });

  return headcount;
};


export { calcularHeadcount }
