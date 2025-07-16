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

    
    if (await isAdmin(data.user)) {
      localStorage.setItem('isAdmin', 'true'); // Guarda el estado de admin en localStorage
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
  window.location.href = '../../index.html'; // Redirige al login
};