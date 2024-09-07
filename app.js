const buscarBtn = document.getElementById('buscar');
const inputBusca = document.getElementById('buscar-heroi')
const batalharBtn = document.getElementById('batalhar');
const inimigoDiv = document.getElementById('inimigo');
const heroiDiv = document.getElementById('heroiDiv');
const resultadoDiv = document.getElementById('resultado');
const contadorDeVitorias = document.getElementById('contador-vitorias')
const mochila = document.getElementById('recompensas-recebidas');
var heroiEncontrado;
var inimigoMissao;
contadorDeVitorias.innerHTML = 0;

function _resetCampoHeroi() {
  heroiDiv.innerHTML = "";
  batalharBtn.disabled = false;
}

function _criarMensagemAlerta() {
  let alerta = document.createElement('div');
  alerta.innerHTML = "Busque um heroi para começar"
  alerta.classList.add('alerta-inicial');
  return alerta;
}

function _erroClasseNaoEncontrada() {
  let erroResultado = document.createElement('div');
  erroResultado.innerHTML = "Não foi encontrado um heroi especifico para esta busca."
  erroResultado.classList.add('erro-busca')
  return erroResultado;
}
function _erroInimigoNãoEncontrado() {
  let erroResultado = document.createElement('div');
  erroResultado.innerHTML = "Parece que você derrotou todos os inimigos. Volte mais tarde!"
  erroResultado.classList.add('erro-busca')
  return erroResultado;
}
function createEnemy() {
  inimigoMissao = escolherInimigoAleatorio(inimigos);
  if (!inimigoMissao) {
    inimigoDiv.appendChild(_erroInimigoNãoEncontrado())
  }
  inimigoDiv.innerHTML = `
    <p>Tipo: ${inimigoMissao.tipo}</p>
    <p>Local do ataque: ${inimigoMissao.local_ataque}</p>
    <p>Recompensa: ${inimigoMissao.premio}</p>
  `
}
function iniciarJogo() {
  if (!heroiEncontrado) {
    heroiDiv.appendChild(_criarMensagemAlerta());
  }
  createEnemy();
}

buscarBtn.addEventListener('click', () => {
  const termoBusca = inputBusca.value;
  heroiEncontrado = buscarHeroi(herois, termoBusca);
  _resetCampoHeroi();
  if (heroiEncontrado.length > 1 || !heroiEncontrado.length) {
    heroiDiv.appendChild(_erroClasseNaoEncontrada())
    return;
  }
  heroiDiv.innerHTML = `
    <p>Nome: ${heroiEncontrado[0].nome}</p>
    <p>Vida: ${heroiEncontrado[0].vida}</p>
    <p>Defesa: ${heroiEncontrado[0].defesa}</p>
    <p>Ataque: ${heroiEncontrado[0].ataque}</p>
    <p>Equipamento: ${heroiEncontrado[0].equipamento}</p>
    <p>Habilidade: ${heroiEncontrado[0].habilidade}</p>
  `
  verificaExaustao(heroiEncontrado[0], heroiDiv, batalharBtn);
});

batalharBtn.addEventListener('click', () => {
  const resultadoDaBatalha = batalha(heroiEncontrado[0], inimigoMissao)
  resultadoDiv.innerHTML = `
    <p>${resultadoDaBatalha.vencedor === 'heroi' ? 'VITÓRIA' : 'DERROTA'}</p>
    <p>Turnos: ${resultadoDaBatalha.turnos}</p>
  `;
  if (resultadoDaBatalha.vencedor === 'heroi') {
    contadorDeVitorias.innerHTML += 1;
    mochila.appendChild(adicionarEspolio(resultadoDaBatalha?.inimigo?.premio));
    atualizarArrayDePersonagens(inimigos, herois, resultadoDaBatalha)
    createEnemy();
  }
});

iniciarJogo();