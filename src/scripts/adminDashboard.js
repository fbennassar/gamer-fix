import { logout } from '../services/auth.js'; // Importas desde tu capa de servicio

async function handleLogout() {
    await logout(); // Llama a la función de logout del servicio
}

document.getElementById('btn-logout').addEventListener('click', handleLogout); // Añade el evento al botón de cerrar sesión