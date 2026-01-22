let serieAtualAtiva = "";
let notaSelecionada = 0;

const dados = {
    stranger_things: {
        nome: "Stranger Things",
        descricao: "Ambientada nos anos 80, a série acompanha um grupo de amigos que vive em uma pequena cidade marcada por estranhos acontecimentos.",
        duracao: "50 min",
        temporadas: "5",
        imagem: "imagens/stranger_things.jpeg",
        imdb: 8.5
    },
    breakingbad: {
        nome: "Breaking Bad",
        descricao: "A história acompanha Walter White, um professor de química que decide mudar sua vida ao entrar no mundo do tráfico de drogas.",
        duracao: "47 min",
        temporadas: "5",
        imagem: "imagens/breaking_bad.jpeg",
        imdb: 9.9
    },
    the_crown: {
        nome: "The Crown",
        descricao: "A série retrata o reinado da Rainha Elizabeth II, explorando os bastidores da monarquia britânica.",
        duracao: "58 min",
        temporadas: "6",
        imagem: "imagens/the_crown.webp",
        imdb: 9.0
    },
    game_of_thrones: {
        nome: "Game of Thrones",
        descricao: "Em um mundo fantástico, famílias nobres disputam o poder e o controle do Trono de Ferro.",
        duracao: "55 min",
        temporadas: "8",
        imagem: "imagens/game_of_thrones.png",
        imdb: 8.0
    }
};

window.onload = function() {
    Object.keys(dados).forEach(id => {
        atualizarDisplayNota(id);
    });
};

function mostrarDetalhes(idSerie) {
    serieAtualAtiva = idSerie;
    notaSelecionada = 0;
    const info = dados[idSerie];
    
    document.getElementById("detalhe-nome").innerText = info.nome;
    document.getElementById("detalhe-descricao").innerText = info.descricao;
    document.getElementById("detalhe-duracao").innerText = info.duracao;
    document.getElementById("detalhe-temporadas").innerText = info.temporadas;
    document.getElementById("detalhe-imagem").src = info.imagem;

    document.getElementById("detalhes-serie").style.display = "block";
    document.getElementById("detalhes-serie").scrollIntoView({ behavior: "smooth" });

    document.getElementById("feedback-voto").innerText = "";
    
    const estrelas = document.querySelectorAll('.star-btn');
    estrelas.forEach(s => s.classList.remove('active'));

    const votoSalvo = localStorage.getItem('voto_' + idSerie);
    if (votoSalvo) {
        pintarEstrelas(parseInt(votoSalvo));
    }
}

function selecionarEstrela(valor) {
    notaSelecionada = valor;
    pintarEstrelas(valor);
}

function pintarEstrelas(valor) {
    const estrelas = document.querySelectorAll('.star-btn');
    estrelas.forEach((s, i) => {
        if (i < valor) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

function salvarAvaliacao() {
    if (notaSelecionada === 0) {
        document.getElementById("feedback-voto").innerText = "Selecione uma nota!";
        return;
    }
    
    localStorage.setItem('voto_' + serieAtualAtiva, notaSelecionada);
    atualizarDisplayNota(serieAtualAtiva);
    document.getElementById("feedback-voto").innerText = "Nota registrada!";
}

function atualizarDisplayNota(id) {
    const notaImdb = dados[id].imdb;
    const votoUsuario = localStorage.getItem('voto_' + id);
    const display = document.getElementById('display-' + id);
    
    if (votoUsuario) {
        const media = (notaImdb + parseInt(votoUsuario)) / 2;
        display.innerText = media.toFixed(1);
    } else {
        display.innerText = notaImdb.toFixed(1);
    }
}
function scrollCarousel(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = 220; // largura do card + gap
  container.scrollLeft += direction * scrollAmount;
}
