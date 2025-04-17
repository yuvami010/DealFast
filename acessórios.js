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