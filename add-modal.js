// ===== Adicionar ao Carrinho a partir do Modal =====
document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      const modalId = modal.id;
      const { color, storage } = productSelections[modalId] || {};
  
      if (!color || !storage) {
        alert("Por favor, selecione a cor e o armazenamento.");
        return;
      }
  
      const nomeProdutoBase = productInfo[modalId]?.name || "Produto";
      const nomeFormatado = `${nomeProdutoBase} ${storage} (${formatColor(color)})`;
  
      const precoTexto = productPrices[modalId]?.[storage];
      if (!precoTexto) {
        alert("Preço não encontrado para essa configuração.");
        return;
      }
  
      const precoNumerico = parseInt(precoTexto.replace(/[^\d]/g, ""));
  
      const imagem = `${modal.getAttribute("data-img-folder")}${color}.png`;
  
      const novoProduto = {
        id: `${modalId}-${color}-${storage}`,
        name: nomeFormatado,
        price: precoNumerico,
        quantity: 1,
        image: imagem
      };
  
      let carrinho = JSON.parse(localStorage.getItem("cart")) || [];
  
      const existente = carrinho.find(p => p.id === novoProduto.id);
      if (existente) {
        existente.quantity += 1;
      } else {
        carrinho.push(novoProduto);
      }
  
      localStorage.setItem("cart", JSON.stringify(carrinho));
      alert(`“ foi adicionado ao carrinho!`);
      atualizarContadorCarrinho();
    });
  });