document.addEventListener('DOMContentLoaded', function() {
    const cartTableBody = document.getElementById('cart-table-body');
    const buttons = document.querySelectorAll('.add-to-cart');

    // Inicializar el carrito desde el almacenamiento local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Añadir productos al carrito
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            addToCart(product);
        });
    });
    

    // Mostrar los productos del carrito en la tabla
    if (cartTableBody) {
        displayCartItems();
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.product === product);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ product: product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));  // Guardar el carrito en el almacenamiento local
        alert(`Producto "${product}" añadido al carrito.`);
    }
});