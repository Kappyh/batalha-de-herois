function _alertaExaustao() {
    const erroExaustao = document.createElement('div')
    erroExaustao.innerHTML = "Este heroi está exausto e não pode batalhar agora"
    erroExaustao.classList.add('erro-busca')
    return erroExaustao;
}

// calcula o bonus para cada tipo de classe
function classBonus(classe) {
    let habilidadeUsadas = 0;
    switch (classe) {
        case 'Mago':
            habilidadeUsadas = 4;
            break;
        case 'Ranger':
            habilidadeUsadas = 2;
            break;
        case 'Clériga':
            habilidadeUsadas = 2;
            break;
        case 'Ladino':
            habilidadeUsadas = 1;
            break;
        default:
            break;
    }
    return habilidadeUsadas;
}

function rolarDado20() {
    return Math.floor(Math.random() * 20) + 1;
}

function atacar(atacante, defensor) {
    const danoRolado = Math.floor(Math.random() * atacante.ataque) + 1;
    defensor.vida -= danoRolado;
    return danoRolado;
}

function verificarAcerto(atacante, defensor) {
    const rolagemAtaque = rolarDado20();
    return rolagemAtaque > defensor.defesa;
}

function batalha(heroi, inimigo) {
    let atacante = null;
    let turnos = 0;
    // Decide quem ataca primeiro
    if (rolarDado20() > rolarDado20()) {
        atacante = heroi;
    } else {
        atacante = inimigo;
    }

    while (heroi.vida > 0 && inimigo.vida > 0) {
        turnos += 1;
        if (atacante === heroi) {
            if (verificarAcerto(heroi, inimigo)) {
                const dano = atacar(heroi, inimigo);
                //Habilidade especial
                if (heroi.classe === "Mago" || heroi.classe === 'Ranger' && rolarDado20() === 20) {
                    const danoExtra = classBonus(heroi.classe);
                    inimigo.vida -= danoExtra;
                    console.log("Acerto crítico! Dano extra de", danoExtra);
                }
                console.log("Herói atacou e causou", dano, "de dano.");
            } else {
                console.log("Herói errou o ataque.");
            }
        } else {
            if (verificarAcerto(inimigo, heroi)) {
                const dano = atacar(inimigo, heroi);
                console.log("Inimigo atacou e causou", dano, "de dano.");
            } else {
                console.log("Inimigo errou o ataque.");
            }
        }
        atacante = atacante === heroi ? inimigo : heroi; // Alterna o atacante
    }
    return {
        vencedor: heroi.vida > 0 ? 'heroi' : 'inimigo',
        heroi: heroi,
        inimigo: inimigo,
        turnos, // Número de turnos da batalha
    };
}


function verificaExaustao(heroi, divHeroi, btnBatalha) {
    console.log(heroi.exaustao)
    if (heroi.exaustao >= 2 && divHeroi) {
        divHeroi.appendChild(_alertaExaustao())
        btnBatalha.disabled = true;
    }
    return;
}

function adicionarEspolio(espolio) {
    let espolioEl = document.createElement('li')
    espolioEl.innerHTML = `${espolio}`;
    return espolioEl;
}

function atualizarArrayDePersonagens(arrayInimigos, arrayHerois, resultadoBatalha) {
    const indiceHeroi = arrayHerois.findIndex(personagem => personagem === resultadoBatalha.heroi);
    const indiceInimigo = arrayInimigos.findIndex(personagem => personagem === resultadoBatalha.inimigo);

    arrayHerois[indiceHeroi].exaustao++;
    arrayInimigos[indiceInimigo].exaustao++;
}