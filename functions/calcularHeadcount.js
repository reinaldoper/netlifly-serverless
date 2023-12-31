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
      let contadorInativos = 0;

      for (let j = 0; j < datasAtivos.length; j++) {
        const [diaAtivo, mesAtivo, anoAtivo] = datasAtivos[j].split('/');
        const dataAtivo = new Date(parseInt(anoAtivo), parseInt(mesAtivo) - 1, parseInt(diaAtivo));

        if (dataAtivo >= dataAtual && dataAtivo < dataProximoMes) {
          contadorAtivos++;
        }
      }

      if (datasInativos.length > 0) {
        for (let k = 0; k < datasInativos.length; k++) {
          const [diaInativo, mesInativo, anoInativo] = datasInativos[k].split('/');
          const dataInativo = new Date(parseInt(anoInativo), parseInt(mesInativo) - 1, parseInt(diaInativo));

          if (dataInativo >= dataAtual && dataInativo < dataProximoMes) {
            contadorInativos++;
          }
        }
      }

      const turnover = (totalFuncionarios - contadorAtivos - contadorInativos) / totalFuncionarios;
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
