<?php
session_start();
session_destroy(); // Destrói a sessão
header("Location: inicio.html"); // Redireciona para a página de login
exit;
?>