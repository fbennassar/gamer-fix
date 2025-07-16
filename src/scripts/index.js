import { login } from '../services/auth.js'; // Importas desde tu capa de servicio

if (localStorage.getItem('token')) {
    const iniciarSesion = document.getElementById('link-login');
    const misReparaciones = document.getElementById('link-misreparaciones');
    iniciarSesion.style.display = 'none'; // Oculta el enlace de iniciar sesión
    misReparaciones.style.display = 'block'; // Muestra el enlace de mis reparaciones
} else {
    const iniciarSesion = document.getElementById('link-login');
    const misReparaciones = document.getElementById('link-misreparaciones');
    iniciarSesion.style.display = 'block'; // Muestra el enlace de iniciar sesión
    misReparaciones.style.display = 'none'; // Oculta el enlace de mis reparaciones
}
