<?php
session_start();

// Redirecionar usuário já logado
if (isset($_SESSION['usuario_id'])) {
    header("Location: lg-serviços.html");
    exit;
}

// Verifica se o formulário foi enviado
if (isset($_POST['submit'])) {
    include_once('conexao.php'); // Conectar ao banco de dados

    // Receber dados do formulário
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $senha = $_POST['senha'];

    // Verificar se o e-mail existe no banco de dados
    $stmt = $conexao->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Usuário encontrado, verificar a senha
        $usuario = $result->fetch_assoc();
        if (password_verify($senha, $usuario['senha'])) {
            // Senha correta, login bem-sucedido
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nome'] = $usuario['nome'];
            header('Location: lg-serviços.html'); // Redireciona para a página de dashboard
            exit;
        } else {
            // Senha incorreta
            $erro = "Senha incorreta!";
        }
    } else {
        // E-mail não encontrado
        $erro = "E-mail não encontrado!";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="pt-ao">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DealFast - Entrar</title>
    <link rel="stylesheet" href="bootstrap-icons-1.11.3/font/bootstrap-icons.min.css">
    <style>
        /* Estilos CSS copiados do seu código */
        * {
          font-weight: 300;
        }

        body {
          overflow-x: hidden;
          background-color: #f5f7f8c5;
          font-family: Arial, Helvetica, sans-serif;
          color: black;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 99;
          background-color: #289094;
          width: 100%;
          height: 5rem;
        }

        .logo {
          color: white;
          font-size: 2.5rem;
          text-decoration: none;
        }
        .logo span {
          color: #2adae0;
        }

        .nav-links {
          display: flex;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          margin-left: 1rem;
          color: #fff;
          font-size: 1.2rem;
        }

        .nav-links a::after {
          content: "";
          width: 0;
          height: 3px;
          display: block;
          background-color: #fff;
          transition: 0.5s;
          margin: 0 auto;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        button {
          background-color: transparent;
          border: 1px solid #f2f5f7;
          border-radius: 2rem;
          padding: 0.4rem 0.6rem;
          margin-left: 2vw;
          font-size: 1.1rem;
          cursor: pointer;
          color: #fff;
        }
        button:hover {
          color: #289094;
          background-color: #f2f5f7;
          border: 1.5px solid #f2f5f7;
          transition: all ease-in-out 350ms;
        }

        .sessao-1 {
          margin-top: 18rem;
        }

        .form {
          margin-top: 5rem;
          position: relative;
          z-index: 1;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400px;
          padding: 40px;
          transform: translate(-50%, -50%);
          background-color: #289094;
          box-shadow: 2px 2px 2px 2px rgba(219, 209, 209, 0.836);
          border-radius: 10px;
        }

        .form input {
          width: 100%;
          padding: 10px 0;
          font-size: 13px;
          color: #fff;
          margin-bottom: 30px;
          border: none;
          border-bottom: 1px solid #fff;
          outline: none;
          background: transparent;
        }

        .form input::placeholder {
          color: #fff;
        }

        h2 {
          color: white;
        }

        .form .message {
          margin: 15px 0 0;
          color: #fff;
          font-size: 14px;
        }

        .form .message a {
          color: #2adae0;
          text-decoration: none;
        }
        .form .message a:hover {
          text-decoration: underline;
        }

        .form button {
          background-color: #2adae0;
          padding: 10px 20px;
          color: #fff;
          font-size: 16px;
          text-decoration: none;
          transition: 0.5s;
          margin-top: 15px;
          letter-spacing: 2px;
          border-radius: 5px;
          border: 0;
        }

        .form button:hover {
          filter: brightness(0.8);
          color: #fff;
          border-radius: 5px;
        }

        .erro {
        color: red;
        font-size: 1rem;
        display: block;
        position: relative;
        bottom: 25px;
    
        }
    </style>
</head>

<body>
    <header>
        <a href="#" class="logo">Deal<span>Fast</span></a>
        <nav>
            <ul class="nav-links">
                <a href="inicio.html">Inicio</a> 
                <a href="produtos.html">Produtos</a>
                <a href="serviços.html">Serviços</a>
                <a href="sobre.html">Sobre</a>
                <button id="botaoRediricionamento">Carrinho</button>
            </ul>
        </nav>
    </header>

    <section class="sessao-1">
        <h2>Entrar na Conta</h2>
    </section>

    <section>
        <div class="form">
            <form action="entrar-reparacao.php" method="POST">
                <h2>Entrar</h2>

                <!-- Campo de E-mail -->
                <input type="email" name="email" placeholder="E-mail" required>

                <!-- Campo de Senha -->
                <input type="password" name="senha" placeholder="Senha" required>

                <!-- Exibição de Erro -->
                <?php if (isset($erro)): ?>
                    <span class="erro"><?php echo htmlspecialchars($erro); ?></span>
                <?php endif; ?>

                <!-- Botão de Envio -->
                <button type="submit" name="submit">Entrar</button>

                <!-- Link para Registro -->
                <p class="message">Ainda não tem uma conta? <a href="criarconta-reparacao.php">Criar Conta</a></p>
            </form>
        </div>
    </section>
</body>

</html>