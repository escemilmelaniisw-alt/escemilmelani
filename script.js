document.addEventListener('DOMContentLoaded', () => {
  // Navigasi Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Pemesanan
  const variantSelect = document.getElementById('iceCreamVariant');
  const toppingSelection = document.getElementById('toppingSelection');
  const toppingOptionsDiv = toppingSelection.querySelector('.topping-options');
  const maxToppingCountSpan = document.getElementById('maxToppingCount');
  const quantityInput = document.getElementById('quantity');
  const totalPriceSpan = document.getElementById('totalPrice');
  const customerNameInput = document.getElementById('customerName');
  const orderForm = document.getElementById('orderForm');

  const toppingsList = [
    "Choco Chips", "Meses Warna-warni", "Kacang Crunchy",
    "Choco Ball", "Wafer Stick", "Bubuk Matcha"
  ];

  let selectedToppingsCount = 0;
  let maxToppings = 0;

  function generateToppings() {
    toppingOptionsDiv.innerHTML = '';
    toppingsList.forEach(topping => {
      const div = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = topping;
      checkbox.addEventListener('change', handleToppingChange);
      const label = document.createElement('label');
      label.textContent = topping;
      div.appendChild(checkbox);
      div.appendChild(label);
      toppingOptionsDiv.appendChild(div);
    });
  }

  function calculateTotal() {
    const variantPrice = parseInt(variantSelect.value || 0);
    const quantity = parseInt(quantityInput.value || 1);
    totalPriceSpan.textContent = `Rp ${(variantPrice * quantity).toLocaleString('id-ID')}`;
  }

  variantSelect.addEventListener('change', () => {
    const selectedVariant = parseInt(variantSelect.value);
    selectedToppingsCount = 0;

    if (selectedVariant === 5000) {
      maxToppings = 3;
      toppingSelection.style.display = 'block';
      maxToppingCountSpan.textContent = maxToppings;
      toppingOptionsDiv.querySelectorAll('input').forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
      });
    } else if (selectedVariant === 10000) {
      maxToppings = toppingsList.length;
      toppingSelection.style.display = 'block';
      maxToppingCountSpan.textContent = 'Semua';
      toppingOptionsDiv.querySelectorAll('input').forEach(cb => cb.checked = true);
    } else {
      toppingSelection.style.display = 'none';
    }
    calculateTotal();
  });

  function handleToppingChange(e) {
    const checkbox = e.target;
    if (variantSelect.value === '5000') {
      if (checkbox.checked) {
        if (selectedToppingsCount < maxToppings) {
          selectedToppingsCount++;
        } else {
          checkbox.checked = false;
          alert(`Maksimal ${maxToppings} topping untuk paket 5K.`);
        }
      } else {
        selectedToppingsCount--;
      }
    } else {
      checkbox.checked = true;
    }
  }

  orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const variant = variantSelect.value;
    const quantity = parseInt(quantityInput.value || 1);
    const name = customerNameInput.value.trim() || 'Pelanggan Baru';
    const selectedToppings = Array.from(toppingOptionsDiv.querySelectorAll('input:checked')).map(cb => cb.value);
    const total = totalPriceSpan.textContent;

    if (!variant) {
      alert('Pilih varian es krim terlebih dahulu.');
      return;
    }

    const pesan = `*Halo ES CEMIL MELANI!* Saya ingin memesan:\n\n` +
                  `Varian: ${variantSelect.options[variantSelect.selectedIndex].text}\n` +
                  `Jumlah: ${quantity} porsi\n` +
                  `Topping: ${selectedToppings.join(', ') || 'Tidak ada'}\n\n` +
                  `Nama: ${name}\nTotal: ${total}`;

    const waLink = `https://wa.me/6281292427016?text=${encodeURIComponent(pesan)}`;
    window.open(waLink, '_blank');
  });

  quantityInput.addEventListener('input', calculateTotal);

  generateToppings();
  calculateTotal();
});
