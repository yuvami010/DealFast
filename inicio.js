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

// inicio do código do modal
function abrirModal(id) { document.getElementById(id).showModal(); }
function fecharModal(id) { document.getElementById(id).close(); }
function trocarModal(fechar, abrir) { fecharModal(fechar); abrirModal(abrir); }
    
// Objeto para armazenar as seleções do produto
let productSelections = {};

// Preços por capacidade de armazenamento OU preço único (default)
const productPrices = {
    Iphone15: {
        '128GB': '850.000kzs',
        '256GB': '980.000kzs',
        '512GB': '1.200.000kzs'
    },
    IpadAir13: {
        '128GB': '850.000kzs',
        '256GB': '980.000kzs',
        '512GB': '1.200.000kzs'
    },
    IpadAir16: {
        '128GB': '850.000kzs',
        '256GB': '980.000kzs',
        '512GB': '1.200.000kzs'
    },
    IpadPro13: {
        '128GB': '950.000kzs',
        '256GB': '1.080.000kzs',
        '512GB': '1.420.000kzs'
    },
    IpadPro16: {
        '128GB': '955.000kzs',
        '256GB': '1.085.000kzs',
        '512GB': '1.450.000kzs'
    },
    Iphone16e: {
        '128GB': '800.000kzs',
        '256GB': '930.000kzs',
        '512GB': '1.200.000kzs'
    },
    Iphone16Pro: {
        '128GB': '870.000kzs',
        '256GB': '900.000kzs',
        '512GB': '1.400.000kzs'
    },
    MacBookAir13: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '1.900.000kzs',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.400.000kzs'
    },
    MacBookAir16: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '1.950.000kzs',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.450.000kzs'
    },
    MacBookPro13: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '2.100.000kzs',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.900.000kzs'
    },
    MacBookPro16: {
        '256GB SSD 16 GB RAM GPU-8-CORE': '2.150.000kzs',
        '512GB SSD 16 GB RAM GPU-8-CORE': '2.950.000kzs'
    },
    AirPods4: {
        default: '275.000kzs'
    },
    AirPodsPro2: {
        default: '389.000kzs'
    },
    AppleWatchSE: {
        default: '375.000kzs'
    },
    AppleWatchSeries10: {
        default: '375.000kzs'
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
    },
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
    },
    AirPods4: {
        name: 'AirPods 4',
        description: 'Os AirPods 4 oferecem uma experiência sonora envolvente, com som adaptativo e novo design.'
    },
    AirPodsPro2: {
        name: 'AirPods Pro 2',
        description: 'Os AirPods Pro 2 oferecem áudio de alta fidelidade com cancelamento ativo de ruído e som adaptativo.'
    },
    AppleWatchSE: {
        name: 'Apple Watch SE',
        description: ' O Apple Watch SE é a escolha ideal para quem busca funcionalidades essenciais Com design moderno, recursos de saúde e segurança, e integração perfeita com o iPhone. '                
    },
    AppleWatchSeries10: {
        name: 'Apple Watch Series 10',
        description: '  O Apple Watch Series 10 traz um novo design, sensores de saúde mais precisos e recursos inteligentes. '                
    },
   
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