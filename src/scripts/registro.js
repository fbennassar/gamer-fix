import { register } from '../services/auth.js';
import swal from 'sweetalert';

const registerForm = document.querySelector('#register-form');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = registerForm.email.value;
    const nombre = registerForm.nombre.value;
    const password = registerForm.password.value;
    const cedula = registerForm.cedula.value;
    const direccion = registerForm.direccion.value;
    const telefono = registerForm.telefono.value;

    // Llamamos a la función de registro
    const { data, error } = await register(email, password, nombre, cedula, direccion, telefono);

    if (error) {
      // Si hay un error (ej: usuario ya existe, contraseña débil), lo mostramos.
      swal("Error en el registro", error.message, "error");
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      // Un caso especial de Supabase: si el email ya está tomado pero no confirmado.
      swal("Error", "Este correo electrónico ya está registrado pero no ha sido confirmado.", "warning");
    }
    else {
      // ¡Éxito! El usuario fue creado y el email de confirmación fue enviado.
      swal({
        title: "¡Registro exitoso!",
        text: "Hemos enviado un enlace de confirmación a tu correo electrónico. Por favor, revisa tu bandeja de entrada.",
        icon: "success",
        button: "Entendido",
      }).then(() => {
        
        window.location.href = './login.html';
      });
    }
  });
} else {
  console.error('El formulario de registro no se encontró en el DOM');
}