document.addEventListener('DOMContentLoaded', function() {
    const cartTableBody = document.getElementById('cart-table-body');

    // Inicializar el carrito desde el almacenamiento local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mostrar los productos del carrito en la tabla
    if (cartTableBody) {
        displayCartItems();
    }

    document.getElementById('send-to-whatsapp').addEventListener('click', function() {
        sendToWhatsApp();
    });

    function displayCartItems() {
        cartTableBody.innerHTML = '';  // Limpiar la tabla antes de añadir los productos

        if (cart.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="3" class="text-center">El carrito está vacío</td>
            `;
            cartTableBody.appendChild(row);
        } else {
            cart.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.product}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm" data-index="${index}" onclick="changeQuantity(${index}, -1)">-</button>
                        ${item.quantity}
                        <button class="btn btn-secondary btn-sm" data-index="${index}" onclick="changeQuantity(${index}, 1)">+</button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" data-index="${index}" onclick="removeItem(${index})">Eliminar</button>
                    </td>
                `;
                cartTableBody.appendChild(row);
            });
        }
    }

    window.changeQuantity = function(index, amount) {
        if (cart[index].quantity + amount > 0) {
            cart[index].quantity += amount;
        } else {
            cart.splice(index, 1);  // Eliminar el producto si la cantidad es 0
        }
        localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar el carrito en el almacenamiento local
        displayCartItems();  // Actualizar la tabla
    };

    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar el carrito en el almacenamiento local
        displayCartItems();  // Actualizar la tabla
    };

    function sendToWhatsApp() {
        let products = [];
        cart.forEach(item => {
            products.push(`${item.quantity}x ${item.product}`);
        });

        const message = `¡Hola! Quiero comprar: ${products.join(', ')}`;
        const phoneNumber = '941520925';  // Reemplaza con tu número de teléfono
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }
});
