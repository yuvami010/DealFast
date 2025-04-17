const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('toggle'); // Adiciona/Remove a classe 'toggle'
});

document.querySelector('.icone-pesquisa').addEventListener('click', function() {
    const formularioPesquisa = document.querySelector('.formulario-pesquisa');
    formularioPesquisa.classList.toggle('active');
});