// ===== Redirecionamento de página =====
document.getElementById("btnEntrar").addEventListener("click", function(){
  window.location.href = "entrar-carrinho.php";
});
document.getElementById("btnCriarConta").addEventListener("click", function(){
  window.location.href = "criarconta-carrinho.php";
});

// ===== Função de feedback visual =====
function mostrarFeedback(msg) {
  const feedback = document.getElementById("mensagem-feedback");
  if (feedback) {
    feedback.innerText = msg;
    feedback.style.display = "block";
    setTimeout(() => {
      feedback.style.display = "none";
    }, 2000);
  }
}

// ===== Renderizar o carrinho =====
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTable = document.querySelector(".cart-table");
  const cartContainer = document.querySelector(".cart-table tbody");
  const mainContainer = document.querySelector("main");
  let totalCarrinho = 0;

  if (cart.length === 0) {
    if (cartTable) cartTable.style.display = "none";

    let emptyCartContainer = document.querySelector(".empty-cart-container");
    if (!emptyCartContainer) {
      emptyCartContainer = document.createElement("div");
      emptyCartContainer.classList.add("empty-cart-container");
      mainContainer.appendChild(emptyCartContainer);
    }

    emptyCartContainer.innerHTML = `
      <h2>Seu Carrinho está Vazio</h2>
      <button class="explore-button" onclick="window.location.href='produtos.html';">
        Explorar Produtos
      </button>
    `;

    const totalElement = document.getElementById("total-value");
    if (totalElement) totalElement.innerText = "0,00 AOA";
    return;
  } else {
    if (cartTable) cartTable.style.display = "";
    const emptyCartContainer = document.querySelector(".empty-cart-container");
    if (emptyCartContainer) emptyCartContainer.remove();
  }

  cartContainer.innerHTML = "";

  cart.forEach(product => {
    const subtotal = product.price * product.quantity;
    totalCarrinho += subtotal;

    const row = document.createElement("tr");
    row.classList.add("card-product");
    row.setAttribute("data-id", product.id);

    row.innerHTML = `
      <td class="product-identification" data-id="${product.id}">
        <img class="card-product-image" src="${product.image}" alt="${product.name}">
        <strong class="card-product-title">${product.name}</strong>
      </td>
      <td>
        <span class="card-product-price">
          ${product.price.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AOA
        </span>
      </td>
      <td>
        <input class="product-qtd-input" type="number" value="${product.quantity}" min="1">
      </td>
      <td>
        <span class="product-subtotal">
          ${subtotal.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AOA
        </span>
      </td>
      <td>
        <button class="remove-product-button" type="button">X</button>
      </td>
    `;

    cartContainer.appendChild(row);
  });

  const totalElement = document.getElementById("total-value");
  if (totalElement) {
    totalElement.innerText = totalCarrinho.toLocaleString("pt-PT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + " AOA";
  }

  addCartEventListeners();
}

// ===== Remover produto do carrinho =====
function removeProductFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== Atualizar quantidade do produto =====
function updateProductQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map(item => {
    if (item.id === productId) {
      item.quantity = newQuantity;
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== Event listeners =====
function addCartEventListeners() {
  // Botões de remoção
  document.querySelectorAll(".remove-product-button").forEach(button => {
    button.addEventListener("click", event => {
      const row = event.target.closest(".card-product");
      const productId = row.getAttribute("data-id");

      const confirmar = confirm("Deseja realmente remover este produto do carrinho?");
      if (confirmar) {
        row.classList.add("fade-out");
        setTimeout(() => {
          removeProductFromCart(productId);
          renderCart();
        }, 300);
      }
    });
  });

  // Inputs de quantidade
  document.querySelectorAll(".product-qtd-input").forEach(input => {
    input.addEventListener("input", event => {
      if (event.target.value < 1) {
        event.target.value = 1;
      }
    });

    input.addEventListener("change", event => {
      const newQuantity = parseInt(event.target.value);
      const row = event.target.closest(".card-product");
      const productId = row.getAttribute("data-id");

      if (newQuantity === 0) {
        removeProductFromCart(productId);
        renderCart();
        return;
      }

      if (newQuantity < 1 || isNaN(newQuantity)) {
        event.target.value = 1;
        updateProductQuantity(productId, 1);
        renderCart();
        return;
      }

      updateProductQuantity(productId, newQuantity);
      mostrarFeedback("Quantidade atualizada!");
      renderCart();
    });
  });
}

// ===== Renderiza o carrinho no carregamento da página =====
document.addEventListener("DOMContentLoaded", renderCart);

// ===== IntersectionObserver (animação scroll) =====
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});
document.querySelectorAll('.scroll').forEach(element => myObserver.observe(element));

// ===== Código de modais =====
function abrirModal(id) { document.getElementById(id).showModal(); }
function fecharModal(id) { document.getElementById(id).close(); }
function trocarModal(fechar, abrir) {
  fecharModal(fechar);
  abrirModal(abrir);
}