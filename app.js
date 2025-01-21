// Referencias al DOM
const formProducto = document.getElementById("form-producto");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");

// Array para almacenar el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizar el carrito en el DOM
function renderCarrito() {
  listaCarrito.innerHTML = ""; // Limpia el contenido del carrito
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

    // Botón para eliminar producto
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarProducto(index);
    li.appendChild(btnEliminar);

    listaCarrito.appendChild(li);

    // Calcular el total
    total += producto.precio * producto.cantidad;
  });

  totalElemento.textContent = total;

  // Guardar carrito actualizado en LocalStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar un producto al carrito
formProducto.onsubmit = (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (nombre && precio > 0 && cantidad > 0) {
    const producto = { nombre, precio, cantidad };
    carrito.push(producto);
    renderCarrito();
    formProducto.reset(); // Limpiar el formulario
  }
};

// Eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderCarrito();
}

// Vaciar todo el carrito
btnVaciarCarrito.onclick = () => {
  carrito = [];
  renderCarrito();
};

// Renderizar al cargar la página
renderCarrito();
