<?php
// Inicializar variáveis de erro
$erro_nome = $erro_email = $erro_numero = $erro_senha = "";

// Verificar se o formulário foi enviado
if (isset($_POST['submit'])) {
    include_once('conexao.php');

    // Receber e validar dados do formulário
    $nome = mysqli_real_escape_string($conexao, $_POST['nome']);
    $numero = mysqli_real_escape_string($conexao, $_POST['numero']);
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $senha = $_POST['senha'];
    $validado = true;

    // Validação básica
    if (empty($nome)) {
        $erro_nome = "O nome é obrigatório.";
        $validado = false;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro_email = "Formato de e-mail inválido.";
        $validado = false;
    } else {
        // Verificar se o e-mail já existe no banco de dados
        $stmt = $conexao->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $erro_email = "Este e-mail já está em uso.";
            $validado = false;
        }
    }

    if (empty($numero) || !preg_match('/^[0-9]{9,15}$/', $numero)) {
        $erro_numero = "Insira um número de telefone válido (9-15 dígitos).";
        $validado = false;
    }

    if (strlen($senha) < 8) {
        $erro_senha = "A senha deve ter pelo menos 8 caracteres.";
        $validado = false;
    }

    // Inserir dados no banco se todos os campos forem válidos
    if ($validado) {
        $senha = password_hash($senha, PASSWORD_DEFAULT); // Criptografar senha
        $stmt = $conexao->prepare("INSERT INTO usuarios (nome, numero, email, senha) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nome, $numero, $email, $senha);

        if ($stmt->execute()) {
            echo "Conta criada com sucesso!";
            header("Location: entrar-carrinho.php"); // Redirecionar após sucesso
            exit();
        } else {
            echo "Erro ao criar conta: " . $stmt->error;
        }
    }


}
?>

<!DOCTYPE html>
<html lang="pt-ao">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css">
    <title>DealFast</title>
    <link rel="stylesheet" href="criarconta.css">
    <link rel="stylesheet" href="bootstrap-icons-1.11.3/font/bootstrap-icons.min.css">
</head>

<body>
    <header>
        <a href="#" class="logo">Deal<span>Fast</span></a>
        <nav>
            <div class="hamburger">
                <i class="bi bi-list"></i>
            </div>
            <ul class="nav-links">
                <a href="inicio.html">Inicio</a>
                <a href="produtos.html">Produtos</a>
                <a href="serviços.html">Serviços</a>
                <a href="sobre.html">Sobre</a>
                <button id="botaoRediricionamento">Carrinho <i class="bi bi-cart"></i></button>
            </ul>
        </nav>
    </header>

    <section class="sessao-1">
        <h2>Criar Conta</h2>
    </section>

    <section class="sessao-2">
        <div class="form">
            <form action="criarconta-carrinho.php" method="POST">

                <h2>Criar Conta</h2>
                <!-- Nome -->
                
                    <input type="text" name="nome" placeholder="Nome completo"
                        value="<?php echo isset($_POST['nome']) ? htmlspecialchars($_POST['nome']) : ''; ?>" required>
                    <span class="erro"><?php echo $erro_nome; ?></span>
                

                <!-- Número de telefone -->
                
                    <input type="text" name="numero" placeholder="Número de telefone"
                        value="<?php echo isset($_POST['numero']) ? htmlspecialchars($_POST['numero']) : ''; ?>"
                        required>
                    <span class="erro"><?php echo $erro_numero; ?></span>
                

                <!-- E-mail -->
                
                    <input type="email" name="email" placeholder="E-mail"
                        value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required>
                    <span class="erro"><?php echo $erro_email; ?></span>
                

                <!-- Senha -->
                
                    <input type="password" name="senha" placeholder="Senha" required>
                    <span class="erro"><?php echo $erro_senha; ?></span>
                
                
                <!-- Botão de enviar -->
                <button type="submit" name="submit">Criar Conta</button>

                <!-- Link para quem já tem conta -->
                <p class="message">Já tem uma conta? <a href="entrar-carrinho.php">Entrar</a></p>
            </form>
        </div>
    </section>

</body>

<script src="criarconta.js"></script>

</html>

<style>
    .erro {
        color: red;
        font-size: 0.9rem;
        display: block;
        position: relative;
        bottom: 25px;
    }
</style>

