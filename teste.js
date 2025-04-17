const imgInicial = document.getElementById("imgInicial");
const galeriaImg = document.getElementsByClassName("galeriaImg");

galeriaImg[0].onclick = function(){
imgInicial.src = galeriaImg[0].src;
}

galeriaImg[1].onclick = function(){
imgInicial.src = galeriaImg[1].src;
}

galeriaImg[2].onclick = function(){
imgInicial.src = galeriaImg[2].src;
}

galeriaImg[3].onclick = function(){
imgInicial.src = galeriaImg[3].src;
}