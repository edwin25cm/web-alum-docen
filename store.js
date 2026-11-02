// Guarda y lee los datos en el navegador (localStorage).
// Si todavía no se guardó nada, usa los datos de ejemplo de datos.js.
const CLAVE_DATOS = "escuela_datos_v1";

function cargarDatos() {
  try {
    const guardado = localStorage.getItem(CLAVE_DATOS);
    if (guardado) return migrarDatos(JSON.parse(guardado));
  } catch (e) { /* si falla, usamos los datos de ejemplo */ }
  return migrarDatos(JSON.parse(JSON.stringify(DATOS_ALUMNOS)));
}

function guardarDatos(datos) {
  try { localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos)); return true; }
  catch (e) { return false; }
}

function restaurarDatos() {
  try {
    localStorage.removeItem(CLAVE_DATOS);
    localStorage.removeItem(CLAVE_USUARIOS);
  } catch (e) { /* nada */ }
}

// ---------- Fechas y meses ----------
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
               "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MESES_ESCOLARES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];   // marzo a diciembre
const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const ANIO_LECTIVO = new Date().getFullYear();

// Las fechas se guardan como texto "AAAA-MM-DD" (ej: "2026-05-12")
function fechaISO(anio, mes, dia) {
  return anio + "-" + String(mes).padStart(2, "0") + "-" + String(dia).padStart(2, "0");
}
function mesDeFecha(f) { return Number(f.slice(5, 7)); }
function diaDeSemana(f) {                       // 0 = domingo ... 6 = sábado
  const [y, m, d] = f.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}
function nombreDia(f) { return DIAS_SEMANA[diaDeSemana(f)]; }
function fechaCorta(f) { const [y, m, d] = f.split("-"); return d + "/" + m + "/" + y; }

// ---------- Asistencia ----------
// La asistencia de cada materia se guarda así:
//   { meses: { "5": { clases: 18 }, ... },        <- clases dadas en cada mes
//     faltas: ["2026-05-04", "2026-05-18", ...] }  <- fechas en que el alumno faltó
function faltasEnRango(a, desde, hasta) {
  return ((a && a.faltas) || [])
    .filter(f => { const m = mesDeFecha(f); return m >= desde && m <= hasta; })
    .sort();
}

// Clases dadas y cantidad de faltas entre los meses "desde" y "hasta" (1 a 12, inclusive)
function asistenciaEnRango(a, desde, hasta) {
  let clases = 0;
  for (const [k, v] of Object.entries((a && a.meses) || {})) {
    const m = Number(k);
    if (m >= desde && m <= hasta) clases += v.clases || 0;
  }
  return { clases, ausentes: faltasEnRango(a, desde, hasta).length };
}

function asistenciaTotal(a) { return asistenciaEnRango(a, 1, 12); }

// ---------- Compatibilidad con datos viejos ----------
// 1) Materia con solo totales { clases, ausentes }: se reparten entre marzo y noviembre.
function repartirPorMes(clases, ausentes, semilla) {
  const ms = [3, 4, 5, 6, 7, 8, 9, 10, 11];
  const meses = {};
  ms.forEach((m, i) => {
    meses[m] = { clases: Math.floor(clases / ms.length) + (i < clases % ms.length ? 1 : 0), ausentes: 0 };
  });
  let s = 0;
  for (const ch of String(semilla)) s += ch.charCodeAt(0);
  for (let k = 0; k < ausentes; k++) {
    const inicio = (k * 4 + s) % ms.length;
    for (let t = 0; t < ms.length; t++) {
      const m = ms[(inicio + t) % ms.length];
      if (meses[m].ausentes < meses[m].clases) { meses[m].ausentes++; break; }
    }
  }
  return { meses };
}

// Días de la semana en que se dicta una materia, según el horario ("Lunes y miércoles 8:00")
function diasDeClase(horario) {
  const t = String(horario || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const mapa = { domingo: 0, lunes: 1, martes: 2, miercoles: 3, jueves: 4, viernes: 5, sabado: 6 };
  const dias = Object.entries(mapa).filter(([n]) => t.includes(n)).map(([, v]) => v);
  return dias.length ? dias : [1, 2, 3, 4, 5];
}

// 2) Materia con ausencias contadas por mes { meses: { "5": { clases, ausentes } } }:
//    las convierte en fechas reales (en los días que se dicta la materia, hasta hoy).
function convertirAFaltas(a, horario, semilla) {
  const dias = diasDeClase(horario);
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  let s = 0;
  for (const ch of String(semilla)) s += ch.charCodeAt(0);

  const meses = {}, candidatos = {}, cuota = {};
  let sobrante = 0;
  for (const [k, v] of Object.entries(a.meses)) {
    const m = Number(k);
    meses[k] = { clases: v.clases || 0 };
    const cand = [];
    const ultimo = new Date(ANIO_LECTIVO, m, 0).getDate();
    for (let dia = 1; dia <= ultimo; dia++) {
      if (new Date(ANIO_LECTIVO, m - 1, dia) > hoy) break;
      if (dias.includes(new Date(ANIO_LECTIVO, m - 1, dia).getDay())) cand.push(fechaISO(ANIO_LECTIVO, m, dia));
    }
    candidatos[m] = cand;
    const quiero = v.ausentes || 0;
    cuota[m] = Math.min(quiero, cand.length);
    sobrante += quiero - cuota[m];
  }
  // Si algún mes no tiene días disponibles, las faltas que sobran van a otros meses con lugar
  for (const m of Object.keys(cuota).map(Number)) {
    while (sobrante > 0 && cuota[m] < candidatos[m].length && cuota[m] < meses[m].clases) { cuota[m]++; sobrante--; }
  }

  const faltas = [];
  for (const m of Object.keys(cuota).map(Number)) {
    const cand = candidatos[m], n = cuota[m];
    if (!n) continue;
    const paso = Math.max(1, Math.floor(cand.length / n));
    const usados = new Set();
    for (let i = 0; i < n; i++) {
      let idx = (s + m * 7 + i * paso) % cand.length;
      while (usados.has(idx)) idx = (idx + 1) % cand.length;
      usados.add(idx);
      faltas.push(cand[idx]);
    }
  }
  return { meses, faltas: faltas.sort() };
}

function migrarDatos(datos) {
  for (const d of Object.values(datos)) {
    for (const [materia, a] of Object.entries(d.asistencia || {})) {
      if (!a) continue;
      let nueva = a;
      if (!nueva.meses) nueva = repartirPorMes(a.clases || 0, a.ausentes || 0, materia);
      if (!nueva.faltas) {
        const mat = (d.materias || []).find(m => m.nombre === materia);
        nueva = convertirAFaltas(nueva, mat ? mat.horario : "", materia);
      }
      d.asistencia[materia] = nueva;
    }
  }
  return datos;
}