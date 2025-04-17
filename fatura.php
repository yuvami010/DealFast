        <?php
        // Conexão com o banco
        $conn = new mysqli("localhost", "root", "", "dealfast");

        if ($conn->connect_error) {
            die("Erro na conexão: " . $conn->connect_error);
        }

        // Pegar o pedido pelo ID
        $id = $_GET['id'] ?? 0;
        $stmt = $conn->prepare("SELECT * FROM pedidos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            echo "Pedido não encontrado.";
            exit();
        }

        $pedido = $result->fetch_assoc();
        ?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Fatura do Pedido #<?= $pedido['id'] ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f8f8;
            padding: 30px;
        }
        .fatura {
            background: white;
            max-width: 700px;
            margin: auto;
            padding: 40px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2, h3 {
            text-align: center;
            margin-bottom: 30px;
        }
        .linha {
            margin-bottom: 15px;
        }
        .rotulo {
            font-weight: bold;
            color: #444;
        }
        .info {
            margin-left: 10px;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
            margin-top: 30px;
        }
        .banco {
            margin-top: 25px;
            background: #eaf3ff;
            padding: 15px;
            border-left: 4px solid #007bff;
        }
        .botao {
            display: block;
            margin: 30px auto 0;
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
        }
        .botao:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>

<div class="fatura">
    <h2>Fatura do Pedido #<?= $pedido['id'] ?></h2>

    <div class="linha"><span class="rotulo">Nome:</span><span class="info"><?= $pedido['nome'] ?></span></div>
    <div class="linha"><span class="rotulo">Email:</span><span class="info"><?= $pedido['email'] ?></span></div>
    <div class="linha"><span class="rotulo">Forma de Entrega:</span><span class="info"><?= $pedido['forma_entrega'] ?></span></div>
    <div class="linha"><span class="rotulo">Endereço:</span><span class="info"><?= $pedido['endereco'] ?></span></div>
    <div class="linha"><span class="rotulo">Método de Pagamento:</span><span class="info"><?= $pedido['metodo_pagamento'] ?></span></div>
    <div class="linha"><span class="rotulo">Itens:</span><span class="info"><?= $pedido['itens'] ?></span></div>

    <div class="total">Total: <?= number_format($pedido['total'], 2, ',', '.') ?> Kz</div>

    <?php if ($pedido['metodo_pagamento'] === "Transferência Bancária"): ?>
        <div class="banco">
            <h3>Instruções de Pagamento</h3>
            <p><strong>Banco:</strong> BAI</p>
            <p><strong>IBAN:</strong> AO06 0006 0000 0000 0000 10101</p>
            <p><strong>Titular:</strong> Deal Fast</p>
            <p>Envie o comprovativo de pagamento para: <strong>pagamentos@dealfast.ao</strong></p>
        </div>
    <?php endif; ?>

    <button class="botao" onclick="window.print()">Imprimir Fatura</button>
</div>

</body>
</html>