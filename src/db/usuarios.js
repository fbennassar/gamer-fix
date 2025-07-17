import { supabase } from './supabaseClient.js';

export const isAdmin = async (user) => {
  if (!user) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('admin')
      .eq('id', user.id)
      .single();

    if (error) {
      return false; // Si hay error (ej: no se encuentra la fila), no es admin.
    }


    return data.admin === true;

  } catch (catchError) {

    return false;
  }
};