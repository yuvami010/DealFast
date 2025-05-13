// Objeto para armazenar as seleções do produto
let productSelections = {};

// Preços por capacidade de armazenamento OU preço único (default)
const productPrices = {
    MacBookAir13: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '700.000 AOA',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.400.000kzs'
    },
    MacBookAir16: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '1.950.000 AOA',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.450.000 AOA'
    },
    MacBookPro13: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '2.100.000 AOA',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.900.000 AOA'
    },
    MacBookPro16: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '2.150.000 AOA',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.950.000 AOA'
    }
};

// Informações do produto
const productInfo = {
    MacBookAir13: {
        name: 'MacBook Air M4 13"',
        description: storage => `  O MacBook Air com ${storage} chip M4 combina potência e portabilidade com um design ultrafino e leve.`
    },
    MacBookAir16: {
        name: 'MacBook Air M4 16"',
        description: storage => `  O MacBook Air com ${storage} chip M4 combina potência e portabilidade com um design ultrafino e leve.`
    },
   
    MacBookPro13: {
        name: 'MacBook Pro M4 13"',
        description: storage => `O MacBook Pro com ${storage} chip M4 traz velocidade, bateria duradoura e gráficos incríveis para tarefas profissionais e criativas.`
    },
    MacBookPro16: {
        name: 'MacBook Pro M4 16"',
        description: storage => `O MacBook Pro com ${storage} chip M4 traz velocidade, bateria duradoura e
                        gráficos
                        incríveis para tarefas profissionais e criativas.`
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