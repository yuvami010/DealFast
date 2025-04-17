// inicio rediricionamento de pagina

document.getElementById("botaoRediricionamento").addEventListener("click", function(){
    window.location.href = "lg-carrinho.html";
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

document.querySelectorAll('.abrir_modal').forEach(item => {
    item.addEventListener('click', event => {
        const modalId = event.currentTarget.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
    }
}

// Fim do código do modal