import { supabase } from '../db/supabaseClient.js';
import { isAdmin } from '../db/usuarios.js';

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
    return null;
  }

  if (data.user) {
    localStorage.setItem('token', data.session.access_token);

    // ¡Aquí está el cambio! Pasamos data.user directamente a isAdmin.
    if (await isAdmin(data.user)) {
      window.location.href = '../views/adminDashboard.html';
    } else {
      window.location.href = '../../index.html';
    }
  }

  return data.user;
};

export const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem('token'); // Limpia el token del localStorage
  window.location.href = '/src/views/login.html'; // Redirige al login
};