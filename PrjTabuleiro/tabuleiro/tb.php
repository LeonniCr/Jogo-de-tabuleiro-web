<?php
$eventosSelecionados = [];

if (isset($_POST['eventos'])) {
    foreach ($_POST['eventos'] as $id => $dados) {
        if (isset($dados['ativo']) && !empty($dados['casa'])) {
            $eventosSelecionados[] = [
                'id' => $id,
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'],
                'modificador' => $dados['modificador'],
                'casa' => (int)$dados['casa']
            ];
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Tabuleiro com Eventos</title>
  <link rel="stylesheet" href="./tb.css">
</head>
<body>

  <div id="game-container">
  <!-- Scroll lateral -->
  <div id="board-wrapper">
    <img src="imageTabuleiro/tabuleiro.png" alt="Tabuleiro" id="board-bg">
    <div id="board"></div>
  </div>

  <!-- Onda fixa embaixo -->
  <div id="wave">
    <img src="imageTabuleiro/onda.png" alt="Onda" id="wave-img">
  </div>
</div>

  <script>
    const eventos = <?php echo json_encode($eventosSelecionados, JSON_UNESCAPED_UNICODE); ?>;
  </script>
  <script src="./tb.js"></script>
</body>
</html>

