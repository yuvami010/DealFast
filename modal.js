
// inicio
function abrirModal(id) { document.getElementById(id).showModal(); }
function fecharModal(id) { document.getElementById(id).close(); }
function trocarModal(fechar, abrir) { fecharModal(fechar); abrirModal(abrir); }
// fim