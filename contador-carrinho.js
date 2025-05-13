function atualizarContadorCarrinho() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantidade = cart.length;
  
  
    const contador = document.getElementById("contador-carrinho");
    if (contador) {
      contador.innerText = totalQuantidade;
      contador.style.display = totalQuantidade > 0 ? "inline-block" : "none";
    }
  }
  
  document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);