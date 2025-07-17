import { supabase } from "./supabaseClient";

export const getCategoriasProductos = async () => {
  const { data, error } = await supabase
    .from("categorias_productos")
    .select("*");

  if (error) {
    console.error("Error al obtener categorías de productos:", error);
    return [];
  }

  return data;
};

export const removeCategoria = async (id) => {
  const { error } = await supabase
    .from("categorias_productos")
    .delete()
    .eq("id_categorias_productos", id);

  if (error) {
    console.error("Error al eliminar la categoría:", error);
    return false;
  }

  return true;
};

export const addCategoria = async (nombre, descripcion) => {
  const { data, error } = await supabase
    .from("categorias_productos")
    .insert([{ nombre, descripcion }])
    .select();

  if (error) {
    console.error("Error al agregar la categoría:", error);
    return null;
  }

  return data[0];
};

export const updateCategoria = async (id, nombre, descripcion) => {
  const { data, error } = await supabase
    .from("categorias_productos")
    .update({ nombre, descripcion })
    .eq("id_categorias_productos", id);

  if (error) {
    console.error("Error al actualizar la categoría:", error);
    return null;
  }

  return data[0];
};
