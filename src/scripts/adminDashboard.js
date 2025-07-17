import { logout } from '../services/auth.js'; // Importas desde tu capa de servicio
import { getCategoriasProductos, removeCategoria, addCategoria, updateCategoria } from '../db/categorias_productos.js';
async function handleLogout() {
    await logout(); // Llama a la función de logout del servicio
}

document.getElementById('btn-logout').addEventListener('click', handleLogout); // Añade el evento al botón de cerrar sesión

async function cargarCategorias() {
    const categorias = await getCategoriasProductos();
    const categoriasTable = document.getElementById('categorias-table'); // Asegúrate de tener un elemento con este id en tu HTML
    if (!categoriasTable) {
        console.error('El elemento de tabla de categorías no se encontró en el DOM');
        return;
    }
    categoriasTable.innerHTML = ''; // Limpia la tabla antes de agregar nuevas categorías
    categorias.forEach(categoria => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-3 px-4 border-b">${categoria.nombre}</td>
            <td class="py-3 px-4 border-b">${categoria.descripcion}</td>
            <td class="py-3 px-4 border-b text-center">
                <button class="opacity-70 group-hover:opacity-100 text-red-700 hover:text-red-700 font-bold text-2xl px-2 py-0.5 rounded-full transition focus:outline-none">
                    <i class="fas fa-trash"></i>
                </button>
                <button
                    id="btn-remove-categoria-${categoria.id_categorias_productos}"
                  class="cursor-pointer opacity-70 group-hover:opacity-100 text-red-700 hover:text-red-700 font-bold text-2xl px-2 py-0.5 rounded-full transition focus:outline-none"
                  title="Quitar reparación"
                  aria-label="Quitar reparación"
                >
                  &times;
                </button>
            </td>
        `;
        categoriasTable.appendChild(row);
    });
    console.log(categorias);
}

cargarCategorias();

async function handleRemoveCategoria(id) {
    const success = await removeCategoria(id);
    if (success) {
        console.log(`Categoría con ID ${id} eliminada correctamente`);
        cargarCategorias(); // Recargar las categorías después de eliminar una
    } else {
        console.error(`Error al eliminar la categoría con ID ${id}`);
    }
}

async function handleAddCategoria() {
    const mostrarModal = () => {
        const modal = document.getElementById('modal-categoria');
        const cancelButton = document.getElementById('btn-cancelar-crear-categoria');
        if (modal) {
            modal.classList.remove('hidden');
        } else {
            console.error('El modal de agregar categoría no se encontró en el DOM');
        }
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        } else {
            console.error('El botón de cancelar no se encontró en el DOM');
        }
        
    };
    mostrarModal();

    const form = document.getElementById('form-add-categoria');
    if (!form) {
        console.error('El formulario de agregar categoría no se encontró en el DOM');
        return;
    }
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        const nombre = document.getElementById('nombre-categoria').value;
        const descripcion = document.getElementById('descripcion-categoria').value;

        if (!nombre || !descripcion) {
            console.error('Nombre y descripción son obligatorios');
            return;
        }

        const nuevaCategoria = await addCategoria(nombre, descripcion);
        if (nuevaCategoria) {
            console.log('Categoría agregada:', nuevaCategoria);
            cargarCategorias(); // Recargar las categorías después de agregar una nueva
            form.reset(); // Limpiar el formulario
            document.getElementById('modal-categoria').classList.add('hidden'); // Ocultar el modal
        } else {
            console.error('Error al agregar la categoría');
        }
    });
}



document.getElementById('btn-add-categoria').addEventListener('click', handleAddCategoria);

document.addEventListener('click', async (event) => {
    // Usamos .closest() para asegurarnos de que capturamos el botón
    // incluso si el usuario hace clic en un ícono dentro de él.
    const button = event.target.closest('[id^="btn-remove-categoria-"]');

    if (button) {
        const idString = button.id.split('-').pop(); // Extrae el ID como string
        
        // Convertimos el ID a un número entero
        const id = parseInt(idString, 10);

        // Verificamos si la conversión fue exitosa y es un número válido
        if (!isNaN(id)) {
            await handleRemoveCategoria(id);
        } else {
            console.error('No se pudo extraer un ID numérico válido del botón.', button.id);
        }
    }
});