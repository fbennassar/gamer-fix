import { register } from '../services/auth.js'; // ¡Importas desde tu capa de servicio!

const registerForm = document.querySelector('#register-form'); // Asegúrate de ponerle un id a tu form
if (!registerForm) {
  console.error('El formulario de registro no se encontró en el DOM');
}
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

  const email = registerForm.email.value;
  const nombre = registerForm.nombre.value;
  const password = registerForm.password.value;
  const cedula = registerForm.cedula.value;
  const direccion = registerForm.direccion.value;
  const telefono = registerForm.telefono.value;

  try {
    await register(email, password, nombre, cedula, direccion, telefono); // Llama a la función de registro del servicio
    // Optionally redirect or show a success message
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Handle validation errors
      const errors = error.response.data.errors; // Assuming the server returns errors in this format
      // Display the errors to the user (e.g., next to the corresponding form fields)
      console.error('Validation errors:', errors);
      alert('There were errors in your registration. Please check the form.'); // Replace with a better UI
    } else {
      // Handle other errors (network issues, server errors, etc.)
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again later.');
    }
  }
});