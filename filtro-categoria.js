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
  