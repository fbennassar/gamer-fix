import { supabase } from '../db/supabaseClient.js';
import { isAdmin } from '../db/usuarios.js';
import swal from 'sweetalert';
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    swal(error.message);
    return null;
  }

  if (data.user) {
    localStorage.setItem('token', data.session.access_token);

    
    if (await isAdmin(data.user)) {
      localStorage.setItem('isAdmin', 'true'); // Guarda el estado de admin en localStorage
      localStorage.setItem('isAdmin', 'true');
      swal("Acesso a modo administrador!", "Inicio de sesión exitoso", "success")
        .then((value) => {
          window.location.href = '../views/adminDashboard.html';
        });
    } else {
      swal("Bienvenido!", "Inicio de sesión exitoso", "success")
        .then((value) => {
          window.location.href = '../../index.html';
        });
    }
  }

  return data.user;
};

export const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem('token'); // Limpia el token del localStorage
  if (localStorage.getItem('isAdmin')) {
    swal("Sesión finalizada", "Has cerrado sesión exitosamente", "success")
      .then((value) => {
        localStorage.removeItem('isAdmin'); // Limpia el estado de admin si existe
        window.location.href = '../../index.html'; // Redirige al login
      });
  } else {
    window.location.href = '../../index.html'; // Redirige al login
  }
};

export const register = async (email, password, nombre, cedula, direccion, telefono) => {
  const { data, error } = await supabase.auth.signUp(
  {
    email,
    password,
    options: {
      data: {
        nombre,
        cedula,
        direccion,
        telefono,
      }
    }
  }
);
  if (error) {
    swal(error.message);
    return null;
  }

  return { data, error };
}