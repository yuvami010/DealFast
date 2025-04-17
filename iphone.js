// inicio rediricionamento de pagina

document.getElementById("botaoRediricionamento").addEventListener("click", function(){
    window.location.href = "carrinho.html";
})

// fim rediricionamento de pagina


// inicio do código do scroll

const myObserver = new IntersectionObserver ((observa) => {
    observa.forEach( (entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }else{
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.scroll')
elements.forEach((Element) => myObserver.observe(Element))

// Fim do código do scroll

// Abrir modal

function abrirModal(id) { document.getElementById(id).showModal(); }
        function fecharModal(id) { document.getElementById(id).close(); }
        function trocarModal(fechar, abrir) { fecharModal(fechar); abrirModal(abrir); }

        // Objeto para armazenar as seleções do produto (cor e armazenamento)
// Objeto global para armazenar as seleções por modal
let productSelections = {};

// Preços por capacidade de armazenamento (exemplo por modelo)
const productPrices = {
    modal16ProMax: {
        '64GB': '900.000kzs',
        '128GB': '1.100.000kzs',
        '256GB': '1.300.000kzs'
    },
    modal16: {
        '64GB': '900.000kzs',
        '128GB': '1.100.000kzs',
        '256GB': '1.300.000kzs'
    },
    modalMacbookPro: {
        '256GB': '1.800.000kzs',
        '512GB': '2.100.000kzs',
        '1TB': '2.500.000kzs'
    }
    // Adicione outros modais conforme necessário
};

// Atualiza os detalhes do produto com base na seleção
function updateProductDetails(modalId) {
    const modal = document.getElementById(modalId);
    const titleElement = modal.querySelector('#product-title');
    const descriptionElement = modal.querySelector('#product-description');
    const imgElement = modal.querySelector('#product-image');
    const priceElement = modal.querySelector('#product-price');

    const { color, storage } = productSelections[modalId];

    // Caminho dinâmico da pasta da imagem
    const imgFolder = modal.getAttribute('data-img-folder');
    imgElement.src = `${imgFolder}/${color}.png`;

    // Título e descrição
    titleElement.textContent = `iPhone 16 Pro ${storage} (${formatColor(color)})`;
    descriptionElement.textContent = `O iPhone 16 Pro com ${storage} redefine a experiência mobile com um design sofisticado, câmeras inovadoras e um desempenho incomparável.`;

    // Atualiza o preço, se definido para este modal
    if (productPrices[modalId] && productPrices[modalId][storage]) {
        priceElement.textContent = productPrices[modalId][storage];
    }
}

// Formata cor para exibição
function formatColor(color) {
    switch (color) {
        case 'silver': return 'Prata';
        case 'black': return 'Preto';
        case 'blue': return 'Azul';
        case 'white': return 'branco';
        default: return color;
    }
}

// Inicializa os eventos em todos os modais
document.querySelectorAll('dialog').forEach(modal => {
    const modalId = modal.id;
    const defaultColor = modal.dataset.defaultColor || modal.querySelector('.color-options button')?.dataset.color || 'silver';
    const defaultStorage = modal.dataset.defaultStorage || modal.querySelector('.storage-options button')?.dataset.storage || '64GB';
    // Inicializa seleção padrão
    productSelections[modalId] = {
        color: defaultColor,
        storage: defaultStorage
    };

    // Eventos para botões de cor
    modal.querySelectorAll('.color-options button').forEach(button => {
        button.addEventListener('click', e => {
            const selectedColor = e.target.dataset.color;
            productSelections[modalId].color = selectedColor;
            updateProductDetails(modalId);
        });
    });

    // Eventos para botões de armazenamento
    modal.querySelectorAll('.storage-options button').forEach(button => {
        button.addEventListener('click', e => {
            const selectedStorage = e.target.dataset.storage;
            productSelections[modalId].storage = selectedStorage;
            updateProductDetails(modalId);
        });
    });

    // Atualiza com valores padrões ao carregar
    updateProductDetails(modalId);
});
