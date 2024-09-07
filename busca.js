function buscarHeroi(listaHerois, termoBusca) {
    const resultados = [];
    const termoMinusculo = termoBusca.toLowerCase();

    for (let i = 0; i < listaHerois.length; i++) {
        const heroi = listaHerois[i];
        const classeMinuscula = heroi.classe.toLowerCase();
        const tagsMinusculas = heroi.tags.toLowerCase().split(',');

        if (classeMinuscula.includes(termoMinusculo) || tagsMinusculas.includes(termoMinusculo)) {
            resultados.push(heroi);
        }
    }

    return resultados;
}

function escolherInimigoAleatorio(listaInimigos) {
    const MAX_TENTATIVAS = listaInimigos.length * 2; // Prevenção looping infinito
    let tentativas = 0;
    let inimigoAleatorio;
    do {
        const indiceAleatorio = Math.floor(Math.random() * listaInimigos.length);
        inimigoAleatorio = listaInimigos[indiceAleatorio];
        tentativas++;
    } while (inimigoAleatorio.exaustao === 1 && tentativas < MAX_TENTATIVAS);

    if (tentativas >= MAX_TENTATIVAS) {
        return null;
    } else {
        return inimigoAleatorio;
    }
}