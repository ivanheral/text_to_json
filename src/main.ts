let text = `
(0||CalendarData()(
  (0||DaysOfWeek()(
      (0||1()(

      ))
      (0||2()(
          (0||0(s|08:00|f|12:00)())
          (0||1(s|13:00|f|17:00)())
      ))
      (0||3()(
          (0||0(s|08:00|f|12:00)())
          (0||1(s|13:00|f|17:00)())
      ))
      (0||4()(
          (0||0(s|08:00|f|12:00)())
          (0||1(s|13:00|f|17:00)())
      ))
      (0||5()(
          (0||0(s|08:00|f|12:00)())
          (0||1(s|13:00|f|17:00)())
      ))
      (0||6()(
          (0||0(s|08:00|f|12:00)())
          (0||1(s|13:00|f|17:00)())
      ))
      (0||7()(

      ))
  ))
  (0||Exceptions()(

  ))
))
`;
const t0 = performance.now();
// format date
const patronDate = /s\|(\d{2}:\d{2})\|f\|(\d{2}:\d{2})/g;
// pattern (0||KEY(FORMAT?)(VALUE?))
const patronValue = /\((\d+)\|{2}(\d+)\((.*?)\)\(\)\)/g;
text = text.replace(patronValue, '($1||$2){"$3"}').replace(patronDate, '$1:00-$2:00');
text = text.replace(/\s+/g, '');
text = text
  .replaceAll('())', '{""}')
  .replaceAll('()(', '){')
  .replaceAll('))', '}')
  .replaceAll('()', ')')
  .replaceAll('0||', '');

const patron = /\(([^)]+)\)\{([^}]+)\}/g;

const convertir = (cadena: string) => {
  return cadena.replace(patron, '{"$1":$2}');
};

const convertirRecursivo = (cadena: string) => {
  let resultado = convertir(cadena);
  while (resultado !== cadena) {
    cadena = resultado;
    resultado = convertir(cadena);
  }
  return resultado;
};

const solution = convertirRecursivo(text).replaceAll('}{', ',');
const objeto = JSON.parse(solution);
const days = objeto.CalendarData.DaysOfWeek;
const parsed: unknown = {
  monday: Object.values(days['2']),
  tuesday: Object.values(days['3']),
  wednesday: Object.values(days['4']),
  thursday: Object.values(days['5']),
  friday: Object.values(days['6']),
};
const t1 = performance.now();
console.log(t1 - t0 + ' milisegundos.');
console.log(parsed);
