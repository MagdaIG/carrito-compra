// Clases para gestionar productos y carrito
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = parseInt(precio);
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        // Verifica si el producto ya está en el carrito
        const productoEnCarrito = this.productos.find(item => item.producto.nombre === producto.nombre);

        if (productoEnCarrito) {
            // Si el producto ya está, suma la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está, lo agrega con su cantidad
            this.productos.push({ producto, cantidad });
        }
        this.mostrarResumen();
    }


    calcularTotal() {
        let total = this.productos.reduce((suma, producto) => suma + producto.producto.precio * producto.cantidad, 0);
        return total;
    }

    mostrarResumen() {
        const resumenDiv = document.getElementById('resumenCompra');
        resumenDiv.innerHTML = ''; // Limpiamos el contenido anterior

        if (this.productos.length === 0) {
            resumenDiv.innerHTML = '<p>Aún no has agregado productos.</p>';
            return;
        }

        let listaProductos = '<ul>';
        this.productos.forEach((item) => {
            listaProductos += `<li>${item.cantidad} x ${item.producto.nombre} - $${item.producto.precio} (Total: $${(item.producto.precio * item.cantidad).toFixed(0)})</li>`;
        });
        listaProductos += '</ul>';

        const total = this.calcularTotal();
        listaProductos += `<p><strong>Total: $${total.toFixed(0)}</strong></p>`;

        resumenDiv.innerHTML = listaProductos;
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            alert('No tienes productos en tu carrito.');
            return;
        }
        alert(`Total de la compra: $${this.calcularTotal().toFixed(0)}\n¡Gracias por tu compra!`);
        this.productos = [];
        this.mostrarResumen();  // Limpiar el resumen después de la compra
    }
}

// Inicializar el carrito
const carrito = new Carrito();

// Productos disponibles
const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// *** Modal de productos disponibles ***
const modal = document.getElementById('productosModal');
const btnVerProductos = document.getElementById('ver-productos');
const spanClose = document.getElementsByClassName('close')[0];

// Abre el modal al hacer clic en "Productos disponibles"
btnVerProductos.onclick = function() {
    modal.style.display = "block";
}

// Cierra el modal al hacer clic en "x"
spanClose.onclick = function() {
    modal.style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Manejo de agregar productos al carrito desde el modal de productos
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productoIndex = this.getAttribute('data-producto-index');
        const producto = productosDisponibles[productoIndex];

        // Obtener la cantidad del input correspondiente al producto
        const cantidadInputId = `cantidad-${parseInt(productoIndex)+1}`;
        const cantidad = parseInt(document.getElementById(cantidadInputId).value);

        carrito.agregarProducto(producto, cantidad); // Agrega la cantidad seleccionada
        alert(`${cantidad} ${producto.nombre}(s) ha(n) sido agregado(s) al carrito.`);
    });
});

// Función para agregar productos seleccionados al carrito desde el modal "Iniciar tu compra"
document.getElementById('agregarProducto').addEventListener('click', function() {
    const productoIndex = document.getElementById('productoSelect').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (cantidad > 0) {
        const producto = productosDisponibles[productoIndex];
        carrito.agregarProducto(producto, cantidad); // Agregar al carrito
        alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
        carrito.mostrarResumen(); // Actualizar resumen del carrito
    } else {
        alert('Por favor, selecciona una cantidad válida.');
    }
});

// Botón para ir al carrito desde el modal de productos
document.getElementById('irAlCarrito').addEventListener('click', function() {
    modal.style.display = "none";  // Cerrar modal de productos
    iniciarCompraModal.style.display = "block";  // Abrir modal de compra
    carrito.mostrarResumen();  // Mostrar el resumen del carrito
});

// *** Modal de "Iniciar tu compra" ***
const iniciarCompraModal = document.getElementById('iniciarCompraModal');
const btnIniciarCompra = document.getElementById('iniciar-compra');
const spanCloseCompra = iniciarCompraModal.getElementsByClassName('close')[0];

// Abre el modal de "Iniciar tu compra"
btnIniciarCompra.onclick = function() {
    iniciarCompraModal.style.display = "block";
    carrito.mostrarResumen(); // Muestra el resumen del carrito al abrir el modal
}

// Cierra el modal de "Iniciar tu compra"
spanCloseCompra.onclick = function() {
    iniciarCompraModal.style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === iniciarCompraModal) {
        iniciarCompraModal.style.display = "none";
    }
}

// Botón para finalizar la compra
document.getElementById('finalizarCompra').addEventListener('click', () => {
    carrito.finalizarCompra(); // Finaliza la compra y vacía el carrito
    iniciarCompraModal.style.display = "none"; // Cierra el modal
});
