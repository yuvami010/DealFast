// Redireciona para o carrinho ao clicar no botão "Carrinho"
document.getElementById("botaoRediricionamento").addEventListener("click", function() {
  window.location.href = "lg-carrinho.html";
});

// Filtro de categorias
document.getElementById("categoriaSelect").addEventListener("change", function() {
  const categoriaSelecionada = this.value;
  const produtos = document.querySelectorAll(".sub-container-medio");
  produtos.forEach(produto => {
    if (categoriaSelecionada === "todos" || produto.getAttribute("data-category") === categoriaSelecionada) {
      produto.style.display = "block";
    } else {
      produto.style.display = "none";
    }
  });
});

// Garante que "todos" seja a categoria padrão ao carregar a página
window.onload = function() {
  const select = document.getElementById("categoriaSelect");
  select.value = "todos";
  select.dispatchEvent(new Event('change'));
};

// Função para adicionar um produto ao carrinho usando localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Verifica se o produto já existe no carrinho e, se sim, atualiza a quantidade
  const index = cart.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cart[index].quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Carrinho atualizado:", cart);
}

// Adiciona o evento de clique para os botões "Adicionar"
document.querySelectorAll('.bt-carrinho').forEach(button => {
  button.addEventListener("click", function() {
    console.log("Botão clicado!");

    const productElement = button.closest(".sub-container-medio");
    if (!productElement) {
      console.error("Elemento do produto não encontrado!");
      return;
    }

    const productId = productElement.getAttribute("data-id");
    const productName = productElement.querySelector(".modelo")?.innerText;
    const priceElement = productElement.querySelector(".p-bt p");
    const priceText = priceElement ? priceElement.innerText : "";
    const productPrice = parseFloat(priceText.replace(/[^0-9,.]/g, "").replace(",", "."));
    const productImage = productElement.querySelector("img")?.src;

    console.log("Dados do produto:", { productId, productName, productPrice, productImage });

    if (!productId || !productName || isNaN(productPrice) || !productImage) {
      console.error("Dados incompletos do produto.");
      return;
    }

    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    addToCart(product);
    alert("Produto adicionado ao carrinho!");
  });
});

// Código do scroll com IntersectionObserver (opcional)
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