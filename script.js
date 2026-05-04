// Ждём пока страница загрузится
window.addEventListener('load', () => {

  // === АНИМАЦИЯ ПОЯВЛЕНИЯ ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // === УВЕДОМЛЕНИЕ И КОРЗИНА ===
  let cart = [];

  document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', () => {

      // Уведомление
      const notification = document.getElementById('notification');
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);

      // Добавляем в корзину
      const card = button.closest('.card');
      const name = card.querySelector('h3').innerText;
      const price = card.querySelector('span').innerText;
      cart.push({ name, price });
      updateCart();
    });
  });

  // Обновление корзины
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Корзина пуста 🌸</p>';
      cartTotal.style.display = 'none';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const priceNum = parseInt(item.price.replace(/\D/g, ''));
      total += priceNum;
      cartItems.innerHTML += `
        <div class="cart-item">
          <span>${item.name}</span>
          <strong>${item.price}</strong>
          <button onclick="removeItem(${index})">✕</button>
        </div>
      `;
    });

    document.getElementById('total-price').innerText = total.toLocaleString();
    cartTotal.style.display = 'block';
  }

  // Удаление товара
  window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCart();
  }

}); // закрывает window.addEventListener