import { logout } from '../services/auth.js'; // Importas desde tu capa de servicio

if (localStorage.getItem('token')) {
    const iniciarSesion = document.getElementById('link-login');
    const misReparaciones = document.getElementById('link-misreparaciones');
    const btnLogout = document.getElementById('btn-logout');
    btnLogout.style.display = 'block'; // Muestra el botón de cerrar sesión si hay
    iniciarSesion.style.display = 'none'; // Oculta el enlace de iniciar sesión
    misReparaciones.style.display = 'block'; // Muestra el enlace de mis reparaciones
    if (localStorage.getItem('isAdmin') === 'true') {
        const linkAdmin = document.getElementById('link-admin');
        linkAdmin.style.display = 'block'; // Muestra el enlace de admin
    }
} else {
    const iniciarSesion = document.getElementById('link-login');
    const misReparaciones = document.getElementById('link-misreparaciones');
    const btnLogout = document.getElementById('btn-logout');
    btnLogout.style.display = 'none'; // Oculta el botón de cerrar sesión si no
    iniciarSesion.style.display = 'block'; // Muestra el enlace de iniciar sesión
    misReparaciones.style.display = 'none'; // Oculta el enlace de mis reparaciones
}

async function handleLogout() {
    await logout(); // Llama a la función de logout del servicio
}

document.getElementById('btn-logout').addEventListener('click', handleLogout); // Añade el evento al botón de cerrar sesión

// Lógica para el modal de contacto
const linkContacto = document.getElementById('link-contacto-header');
const modalContacto = document.getElementById('modal-contacto');
const cerrarModalContacto = document.getElementById('cerrar-modal-contacto');
const btnContactoPrincipal = document.getElementById('btn-contacto-principal');

if (linkContacto && modalContacto && cerrarModalContacto) {
  linkContacto.addEventListener('click', function(e) {
    e.preventDefault();
    modalContacto.classList.remove('hidden');
  });
  cerrarModalContacto.addEventListener('click', function() {
    modalContacto.classList.add('hidden');
  });
  // Cerrar modal al hacer clic fuera del contenido
  modalContacto.addEventListener('click', function(e) {
    if (e.target === modalContacto) {
      modalContacto.classList.add('hidden');
    }
  });
}