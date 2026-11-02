// Usuarios de prueba (más adelante esto lo reemplazás por una base de datos real)
const USUARIOS_BASE = [
  { usuario: "ana",   clave: "1234", rol: "alumno",  nombre: "Ana Pérez" },
  { usuario: "luis",  clave: "1234", rol: "alumno",  nombre: "Luis Gómez" },
  { usuario: "marta", clave: "abcd", rol: "docente", nombre: "Marta Ruiz" }
];

// Alumnos nuevos que crea el docente (se guardan en el navegador)
const CLAVE_USUARIOS = "escuela_usuarios_v1";

function leerUsuariosExtra() {
  try {
    const g = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));
    return Array.isArray(g) ? g : [];
  } catch (e) { return []; }
}

const USUARIOS = USUARIOS_BASE.concat(leerUsuariosExtra());

function guardarUsuariosExtra() {
  try {
    localStorage.setItem(CLAVE_USUARIOS,
      JSON.stringify(USUARIOS.filter(u => !USUARIOS_BASE.includes(u))));
    return true;
  } catch (e) { return false; }
}

const PAGINAS = { alumno: "alumno.html", docente: "docente.html" };

function iniciarSesion(usuario, clave, rol) {
  const u = USUARIOS.find(x => x.usuario === usuario.trim().toLowerCase() && x.clave === clave);
  if (!u) return { error: "Usuario o contraseña incorrectos." };
  if (u.rol !== rol) return { error: "Ese usuario no está registrado como " + rol + "." };
  sessionStorage.setItem("sesion", JSON.stringify({ usuario: u.usuario, rol: u.rol, nombre: u.nombre }));
  return { usuario: u };
}

function obtenerSesion() {
  try { return JSON.parse(sessionStorage.getItem("sesion")); }
  catch { return null; }
}

// Se llama al principio de alumno.html / docente.html
function protegerPagina(rolRequerido) {
  const s = obtenerSesion();
  if (!s) { location.href = "index.html"; return null; }
  if (s.rol !== rolRequerido) { location.href = PAGINAS[s.rol]; return null; }
  return s;
}

function cerrarSesion() {
  sessionStorage.removeItem("sesion");
  location.href = "index.html";
}