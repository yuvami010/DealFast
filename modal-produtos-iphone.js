// Objeto para armazenar as seleções do produto
let productSelections = {};

// Preços por capacidade de armazenamento OU preço único (default)
const productPrices = {
    Iphone15: {
        '128GB': '850.000 AOA',
        '256GB': '980.000 AOA',
        '512GB': '1.200.000 AOA'
    },

    Iphone16e: {
        '128GB': '800.000 AOA',
        '256GB': '930.000 AOA',
        '512GB': '1.200.000 AOA'
    },
    Iphone16Pro: {
        '128GB': '870.000 AOA',
        '256GB': '900.000 AOA',
        '512GB': '1.400.000 AOA'
    } 
};

// Informações do produto
const productInfo = {
    Iphone15: {
        name: 'Iphone15',
        description: storage => `O iPhone 15 com ${storage} traz um salto em inovação com seu novo design em vidro e alumínio, câmera de 48MP
                        com foco
                        em detalhes, chip poderoso e a tão aguardada porta USB-C, oferecendo uma experiência completa.`
    },
    Iphone16e: {
        name: 'iPhone 16e',
        description: storage => `O iPhone 16e com ${storage} oferece uma experiência eficiente e acessível, com
                        excelente
                        desempenho, câmeras confiáveis e um design moderno.`
    },
    Iphone16Pro: {
        name: 'iPhone 16 Pro',
        description: storage => `O iPhone 16 Pro com ${storage} redefine a experiência mobile com um design sofisticado,
                        câmeras inovadoras e um desempenho incomparável.`
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