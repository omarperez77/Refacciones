// Función para cargar las refacciones a la tabla
function cargarRefacciones() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3001/refacciones', true); // Asegúrate de que el puerto sea correcto.

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const tbody = document.getElementById('refacciones-tbody');
            tbody.innerHTML = '';

            data.forEach(refaccion => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${refaccion.nombre}</td>
                    <td>${refaccion.categoria}</td>
                    <td>${refaccion.precio}</td>
                    <td>
                        <button onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">Editar</button> |
                        <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Error al cargar las refacciones:', xhr.statusText);
        }
    };
    xhr.send();
}

// Función para agregar una refacción a la BD
document.getElementById('refaccion-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const refaccion = {
        nombre,
        categoria,
        precio
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/refacciones', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 201) {
            document.getElementById('refaccion-form').reset();
            cargarRefacciones();
        } else {
            console.error('Error al agregar la refacción:', xhr.statusText);
        }
    };
    xhr.send(JSON.stringify(refaccion));
});

// Función para eliminar una refacción
function eliminarRefaccion(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3001/refacciones/${id}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            cargarRefacciones();
        } else {
            console.error('Error al eliminar la refacción:', xhr.statusText);
        }
    };
    xhr.send();
}

// Función para mostrar el modal con la información de la refacción
function mostrarModal(id, nombre, categoria, precio) {
    document.getElementById('update-nombre').value = nombre;
    document.getElementById('update-categoria').value = categoria;
    document.getElementById('update-precio').value = precio;

    const modal = document.getElementById('updateModal');
    modal.style.display = 'block';

    // Actualizar la refacción con AJAX
    document.getElementById('updateRefaccion-form').onsubmit = function (e) {
        e.preventDefault();
        const updatedRefaccion = {
            nombre: document.getElementById('update-nombre').value,
            categoria: document.getElementById('update-categoria').value,
            precio: document.getElementById('update-precio').value
        };

        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', `http://localhost:3001/refacciones/${id}`, true); // Asegúrate de que el puerto coincida.
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                cargarRefacciones(); // Actualizar la tabla
                modal.style.display = 'none'; // Cerrar modal
            } else {
                console.error('Error al actualizar refacción:', xhr.statusText);
            }
        };
        xhr.send(JSON.stringify(updatedRefaccion));
    };
}

// Cargar las refacciones al iniciar la página
cargarRefacciones();
