import { login } from '../services/auth.js'; // ¡Importas desde tu capa de servicio!

const loginForm = document.querySelector('#login-form'); // Asegúrate de ponerle un id a tu form
if (!loginForm) {
  console.error('El formulario de login no se encontró en el DOM');
}
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  await login(email, password); // Llama a la función de login del servicio
});