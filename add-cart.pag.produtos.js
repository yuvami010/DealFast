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

    // Encontrar o subcontainer que contém o produto (para qualquer tipo de subcontainer)
    const productElement = button.closest(".sub-container-medio, .sub-container-mini"); // Aqui ajustamos para pegar ambos os tipos de subcontainer
    if (!productElement) {
      console.error("Elemento do produto não encontrado!");
      return;
    }

    // Pega os dados do produto
    const productId = productElement.getAttribute("data-id");
    const productName = productElement.querySelector(".modelo, .modelo-produto")?.innerText; // Considera ambos os tipos de título de produto
    const priceElement = productElement.querySelector(".p-bt p, .texto-botao p"); // Considera diferentes formas de preço
    const priceText = priceElement ? priceElement.innerText : "";
    const productPrice = parseFloat(priceText.replace(/[^\d]/g, ""));
    const productImage = productElement.querySelector("img")?.src;

    console.log("Dados do produto:", { productId, productName, productPrice, productImage });

    if (!productId || !productName || isNaN(productPrice) || !productImage) {
      console.error("Dados incompletos do produto.");
      return;
    }

    // Cria o objeto de produto a ser adicionado ao carrinho
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    // Chama a função para adicionar ao carrinho
    addToCart(product);
    alert("Produto adicionado ao carrinho!");
  });
});