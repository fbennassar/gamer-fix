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
                <button id="btn-edit-categoria-${categoria.id_categorias_productos}" class="cursor-pointer">
                    editar
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

// async function handleEditCategoria(id) {
//     const mostrarModal = () => {
//         const modal = document.getElementById('modal-edit-categoria');
//         const cancelButton = document.getElementById('btn-cancelar-editar-categoria');
//         if (modal) {
//             modal.classList.remove('hidden');
//         } else {
//             console.error('El modal de editar categoría no se encontró en el DOM');
//         }
//         if (cancelButton) {
//             cancelButton.addEventListener('click', () => {
//                 modal.classList.add('hidden');
//             });
//         } else {
//             console.error('El botón de cancelar no se encontró en el DOM');
//         }
//     };
//     mostrarModal();
//     const form = document.getElementById('form-edit-categoria');
//     if (!form) {
//         console.error('El formulario de editar categoría no se encontró en el DOM');
//         return;
//     }
//     form.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Evita el envío del formulario por defecto
//         const nombre = document.getElementById('edit-nombre-categoria').value;
//         const descripcion = document.getElementById('edit-descripcion-categoria').value;
//         if (!nombre || !descripcion) {
//             console.error('Nombre y descripción son obligatorios');
//             return;
//         }
//         const categoriaActualizada = await updateCategoria(id, nombre, descripcion);
//         if (categoriaActualizada) {
//             console.log('Categoría actualizada:', categoriaActualizada);
//             cargarCategorias(); // Recargar las categorías después de actualizar una
//             form.reset(); // Limpiar el formulario
//             document.getElementById('modal-edit-categoria').classList.add('hidden'); // Ocultar el modal
//         } else {
//             console.error('Error al actualizar la categoría');
//         }
//     });
//     const categoria = await getCategoriasProductos(id);
//     if (categoria) {
//         document.getElementById('edit-nombre-categoria').value = categoria.nombre;
//         document.getElementById('edit-descripcion-categoria').value = categoria.descripcion;
//     } else {
//         console.error('No se encontró la categoría con ID:', id);
//     }
// }

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


const editModal = document.getElementById('modal-edit-categoria');
const editForm = document.getElementById('form-edit-categoria');
const editNombreInput = document.getElementById('edit-nombre-categoria');
const editDescripcionInput = document.getElementById('edit-descripcion-categoria');
const cancelEditButton = document.getElementById('btn-cancelar-editar-categoria');

// Variable para guardar el ID de la categoría que se está editando
let currentEditingId = null;

function hideEditModal() {
    editModal.classList.add('hidden');
    currentEditingId = null; // Limpiamos el ID al cerrar
    editForm.reset(); // Limpiamos el formulario
}

async function handleEditCategoria(id) {
    // 1. Guardar el ID de la categoría que estamos editando
    currentEditingId = id;

    // 2. Obtener la lista completa de categorías
    const categorias = await getCategoriasProductos();
    // 3. Encontrar la categoría específica que queremos editar
    const categoria = categorias.find(c => c.id_categorias_productos === id);

    // 4. Si la encontramos, rellenamos el formulario y LUEGO mostramos el modal
    if (categoria) {
        editNombreInput.value = categoria.nombre;
        editDescripcionInput.value = categoria.descripcion;
        editModal.classList.remove('hidden'); // <-- Mostrar el modal aquí
    } else {
        console.error('No se encontró la categoría con ID:', id);
        swal("Error", "No se pudieron cargar los datos de la categoría para editar.", "error");
    }
}

async function handleEditFormSubmit(event) {
    event.preventDefault();
    if (!currentEditingId) return;

    const nombre = editNombreInput.value;
    const descripcion = editDescripcionInput.value;

    if (!nombre || !descripcion) {
        swal("Campos vacíos", "El nombre y la descripción son obligatorios.", "warning");
        return;
    }

    const categoriaActualizada = await updateCategoria(currentEditingId, nombre, descripcion);

    if (categoriaActualizada) {
        hideEditModal();
        cargarCategorias();
        swal("¡Actualizado!", "La categoría ha sido actualizada con éxito.", "success");
    } else {
        swal("Error", "Ocurrió un problema al actualizar la categoría.", "error");
    }
}

// --- CONFIGURACIÓN DE EVENT LISTENERS (UNA SOLA VEZ) ---

function setupEventListeners() {
    // ... (tu listener para logout y para el modal de agregar)

    // Listener para el envío del formulario de edición (se añade una sola vez)
    editForm.addEventListener('submit', handleEditFormSubmit);

    // Listener para el botón de cancelar en el modal de edición
    cancelEditButton.addEventListener('click', hideEditModal);

    // UN ÚNICO LISTENER PARA LOS CLICS EN LA TABLA (Delegación de eventos)
    document.addEventListener('click', async (event) => {
        // Botón de Editar
        const editButton = event.target.closest('[id^="btn-edit-categoria-"]');
        if (editButton) {
            const id = parseInt(editButton.id.split('-').pop(), 10);
            if (!isNaN(id)) {
                await handleEditCategoria(id);
            }
        }

        // Botón de Eliminar
        const removeButton = event.target.closest('[id^="btn-remove-categoria-"]');
        if (removeButton) {
            const id = parseInt(removeButton.id.split('-').pop(), 10);
            if (!isNaN(id)) {
                await handleRemoveCategoria(id); // Tu función existente
            }
        }
    });
}

// --- INICIALIZACIÓN ---
setupEventListeners();
cargarCategorias();

document.getElementById('btn-add-categoria').addEventListener('click', handleAddCategoria);
// document.addEventListener('click', async (event) => {
//     // Usamos .closest() para asegurarnos de que capturamos el botón
//     // incluso si el usuario hace clic en un ícono dentro de él.
//     const button = event.target.closest('[id^="btn-edit-categoria-"]');
//     if (button) {
//         const idString = button.id.split('-').pop(); // Extrae el ID como string
        
//         // Convertimos el ID a un número entero
//         const id = parseInt(idString, 10);

//         // Verificamos si la conversión fue exitosa y es un número válido
//         if (!isNaN(id)) {
//             await handleEditCategoria(id);
//         } else {
//             console.error('No se pudo extraer un ID numérico válido del botón.', button.id);
//         }
//     }
// });

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