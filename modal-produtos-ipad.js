// Objeto para armazenar as seleções do produto
let productSelections = {};

// Preços por capacidade de armazenamento OU preço único (default)
const productPrices = {
    IpadAir13: {
        '128GB': '850.000 AOA',
        '256GB': '980.000 AOA',
        '512GB': '1.200.000 AOA'
    },
    IpadAir16: {
        '128GB': '850.000 AOA',
        '256GB': '980.000 AOA',
        '512GB': '1.200.000 AOA'
    },
    IpadPro13: {
        '128GB': '950.000 AOA',
        '256GB': '1.080.000 AOA',
        '512GB': '1.420.000 AOA'
    },
    IpadPro16: {
        '128GB': '955.000 AOA',
        '256GB': '1.085.000 AOA',
        '512GB': '1.450.000 AOA'
    }
};

// Informações do produto
const productInfo = {
    
    IpadAir13: {
        name: 'Ipad Air M3 13"',
        description: storage => `O iPad Air M3 com ${storage} oferece equilíbrio entre desempenho e leveza. Ideal para estudantes, profissionais
                        e
                        criadores de conteúdo, ele vem com o chip M3 para um uso fluido em qualquer tarefa.`
    },
    IpadAir16: {
        name: 'Ipad Air M3 16"',
        description: storage => `O iPad Air M3 com ${storage} oferece equilíbrio entre desempenho e leveza. Ideal para estudantes, profissionais
                        e
                        criadores de conteúdo, ele vem com o chip M3 para um uso fluido em qualquer tarefa.`
    },
    IpadPro13: {
        name: 'Ipad Pro M3 13"',
        description: storage => `O iPad Pro M3 com ${storage} é o tablet mais avançado da Apple, com poder de processamento profissional para
                        criação,
                        edição e multitarefas exigentes. Ideal para quem busca performance sem abrir mão da mobilidade.`
    },
    IpadPro16: {
        name: 'Ipad Pro M3 16"',
        description: storage => ` O iPad Pro M3 com ${storage} é o tablet mais avançado da Apple, com poder de processamento profissional para
                        criação,
                        edição e multitarefas exigentes. Ideal para quem busca performance sem abrir mão da mobilidade.`
    }
   
};

// Formata cor para exibição
function formatColor(color) {
    switch (color) {
        case 'silver': return 'Cinza';
        case 'black': return 'Preto';
        case 'blue': return 'Azul';
        case 'green': return 'Verde';
        case 'white': return 'Branco';
        case 'purple': return 'Roxo';
        case 'pink': return 'Rosa';
        case 'brown': return 'Deserto';
        default: return color;
    }
}

// Atualiza os detalhes do produto
function updateProductDetails(modalId) {
    const modal = document.getElementById(modalId);
    const titleElement = modal.querySelector('#product-title');
    const descriptionElement = modal.querySelector('#product-description');
    const imgElement = modal.querySelector('#product-image');
    const priceElement = modal.querySelector('#product-price');

    const { color, storage } = productSelections[modalId] || {};

    const imgFolder = modal.getAttribute('data-img-folder');

    // Define imagem
    if (color && imgFolder) {
        imgElement.src = `${imgFolder}/${color}.png`;
    } else if (imgFolder) {
        imgElement.src = `${imgFolder}/default.png`;
    }

    // Título e descrição
    if (productInfo[modalId]) {
        const product = productInfo[modalId];

        // Título
        if (product.name) {
            let title = product.name;
            if (storage) title += ` ${storage}`;
            if (color) title += ` (${formatColor(color)})`;
            titleElement.textContent = title;
        }

        // Descrição
        if (typeof product.description === 'function' && storage) {
            descriptionElement.textContent = product.description(storage);
        } else {
            descriptionElement.textContent = product.description;
        }
    }

    // Preço
    if (productPrices[modalId]) {
        if (storage && productPrices[modalId][storage]) {
            priceElement.textContent = productPrices[modalId][storage];
        } else if (productPrices[modalId].default) {
            priceElement.textContent = productPrices[modalId].default;
        }
    }
}

// Inicializa eventos em todos os modais
document.querySelectorAll('dialog').forEach(modal => {
    const modalId = modal.id;

    const defaultColor = modal.dataset.defaultColor || modal.querySelector('.color-options button')?.dataset.color;
    const defaultStorage = modal.dataset.defaultStorage || modal.querySelector('.storage-options button')?.dataset.storage;

    // Inicializa o objeto apenas se for necessário
    productSelections[modalId] = {};

    if (defaultColor) productSelections[modalId].color = defaultColor;
    if (defaultStorage) productSelections[modalId].storage = defaultStorage;

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

    // Atualiza com os valores padrões
    updateProductDetails(modalId);
});