module.exports = (valor, atrasoDias = 0) => {
  let multa = 0;
  if (atrasoDias > 0) {
    multa = valor * 0.05; // 5% por atraso, conforme estatuto
  }
  const valor_liquido = valor - multa;
  return { multa, valor_liquido };
};
