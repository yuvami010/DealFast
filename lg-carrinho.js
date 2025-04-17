// Função para renderizar o carrinho a partir dos dados salvos no localStorage
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Carrinho recuperado:", cart); // Depuração

  const cartTable = document.querySelector(".cart-table");
  const cartContainer = document.querySelector(".cart-table tbody");
  const mainContainer = document.querySelector("main");
  let totalCarrinho = 0;

  // Se o carrinho estiver vazio, oculta a tabela e exibe a mensagem
  if (cart.length === 0) {
    if (cartTable) {
      cartTable.style.display = "none";
    }

    let emptyCartContainer = document.querySelector(".empty-cart-container");
    if (!emptyCartContainer) {
      emptyCartContainer = document.createElement("div");
      emptyCartContainer.classList.add("empty-cart-container");
      mainContainer.appendChild(emptyCartContainer);
    }

    emptyCartContainer.innerHTML = `
      <h2>Seu Carrinho está Vazio</h2>
      <button class="explore-button" onclick="window.location.href='lg-produtos.html';">
        Explorar Produtos
      </button>
    `;

    const totalElement = document.getElementById("total-value");
    if (totalElement) totalElement.innerText = "0,00 AOA";
    return;
  } else {
    if (cartTable) {
      cartTable.style.display = "";
    }
    const emptyCartContainer = document.querySelector(".empty-cart-container");
    if (emptyCartContainer) {
      emptyCartContainer.remove();
    }
  }

  // Limpa o conteúdo atual do tbody antes de renderizar
  cartContainer.innerHTML = "";

  // Renderiza cada produto no carrinho
  cart.forEach(product => {
    const preco = parseFloat(product.price); // Garante que o preço é um número
    const subtotal = preco * product.quantity;
    totalCarrinho += subtotal;

    // Cria uma linha para o produto
    const row = document.createElement("tr");
    row.classList.add("card-product");
    row.setAttribute("data-id", product.id);

    row.innerHTML = `
      <td class="product-identification" data-id="${product.id}">
        <button class="remove-product-button" type="button">X</button>
        <img class="card-product-image" src="${product.image}" alt="${product.name}">
        <strong class="card-product-title">${product.name}</strong>
      </td>
      <td>
        <span class="card-product-price">
          ${preco.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AOA
        </span>
      </td>
      <td>
        <input class="product-qtd-input" type="number" value="${product.quantity}" min="0">
      </td>
      <td>
        <span class="product-subtotal">
          ${subtotal.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AOA
        </span>
      </td>
    `;

    cartContainer.appendChild(row);
  });

  // Atualiza o valor total exibido
  const totalElement = document.getElementById("total-value");
  if (totalElement) {
    totalElement.innerText =
      totalCarrinho.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " AOA";
  }

  // Reaplica os event listeners para remoção e atualização de quantidade
  addCartEventListeners();
}

// Função para remover um produto do carrinho
function removeProductFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Atualiza a quantidade de um produto e salva no localStorage
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

// Adiciona event listeners para botões de remoção e inputs de quantidade
function addCartEventListeners() {
  document.querySelectorAll(".remove-product-button").forEach(button => {
    button.addEventListener("click", event => {
      const row = event.target.closest(".card-product");
      const productId = row.getAttribute("data-id");
      removeProductFromCart(productId);
      renderCart();
    });
  });

  document.querySelectorAll(".product-qtd-input").forEach(input => {
    input.addEventListener("change", event => {
      const newQuantity = parseInt(event.target.value);
      const row = event.target.closest(".card-product");
      const productId = row.getAttribute("data-id");

      if (newQuantity === 0) {
        removeProductFromCart(productId);
        renderCart();
        return;
      }

      if (newQuantity < 1) {
        event.target.value = 1;
        updateProductQuantity(productId, 1);
        renderCart();
        return;
      }

      updateProductQuantity(productId, newQuantity);
      renderCart();
    });
  });
}

// Renderiza o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", renderCart);

// Efeito de scroll animado
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