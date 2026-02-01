let serieAtualAtiva = "";
let notaSelecionada = 0;
let tipoAtual = "";
let notaFormulario = 0;
let imagemSelecionada = null;

let meuItensAdicionados = [];

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
    },
    it: {
        nome: "It: welcome to Derry",
        descricao: "Um grupo de crianças enfrenta seus piores medos quando um ser maligno, que assume a forma de um palhaço, começa a aterrorizar sua cidade.",
        duracao: "135 min",
        imagem: "imagens/it.jpeg",
        imdb: 7.5
    },
    the100: {
        nome: "The 100",
        descricao: "Após um apocalipse nuclear, 100 jovens delinquentes são enviados de volta à Terra para verificar se o planeta é habitável novamente.",
        duracao: "42 min",
        temporadas: "7",
        imagem: "imagens/the100.jpeg",
        imdb: 8.1
    },
    theboys: {
        nome: "The Boys",
        deacrição: "Em um mundo onde super-heróis abusam de seus poderes, um grupo de vigilantes decide enfrentá-los para proteger a humanidade.",
        duracao: "60 min",
        temporadas: "3",
        imagem: "imagens/theboys.jpeg",
        imdb: 8.7
    }
};

window.onload = function() {
    Object.keys(dados).forEach(id => {
        atualizarDisplayNota(id);
    });
    
    carregarItensSalvos();
};

function carregarItensSalvos() {
    const itensSalvos = localStorage.getItem('meus_itens');
    
    if(itensSalvos) {
        meuItensAdicionados = JSON.parse(itensSalvos);
        
        meuItensAdicionados.forEach(item => {
            adicionarItemNaTela(item);
        });
    }
}

function adicionarItemNaTela(item) {
    const containerId = item.tipo === 'serie' ? 'minhas-series' : 'meus-filmes';
    const container = document.querySelector('#' + containerId + ' .series-container, #' + containerId + ' .filme-container');
    
    const novoDiv = document.createElement('div');
    novoDiv.className = item.tipo === 'serie' ? 'series-item' : 'filme-item';

    novoDiv.onclick = function() {
        abrirDetalhesDinamico(item);
    };

    novoDiv.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <h3>${item.nota.toFixed(1)}<b class="star">★</b></h3>
    `;

    container.appendChild(novoDiv);
}

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

    if (display) {
        if (votoUsuario) {
            const media = parseInt(votoUsuario);
            display.innerText = media.toFixed(1);
        } else {
            display.innerText = notaImdb.toFixed(1);
        }
    }
}

function scrollCarousel(id, direction) {
  const container = document.getElementById(id);
  const scrollAmount = container.clientWidth;
  container.scrollLeft += direction * scrollAmount;
}

function abrirFormulario(tipo) {
    tipoAtual = tipo;
    notaFormulario = 0;
    imagemSelecionada = null;

    document.getElementById('modal-formulario').style.display = 'block';
    document.getElementById('titulo-formulario').innerText = tipo === 'serie' ? 'Adicionar Série' : 'Adicionar Filme';
    document.getElementById('input-nome').value = '';
    document.getElementById('preview-imagem').innerHTML = '';
    document.getElementById('input-imagem').value = '';

    const estrelasForm = document.querySelectorAll('.star-form');
    estrelasForm.forEach(s => s.classList.remove('ativo'));
}

function fecharFormulario() {
    document.getElementById('modal-formulario').style.display = 'none';
}

document.getElementById('input-imagem').addEventListener('change', function(e) {
    const arquivo = e.target.files[0];
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(evento) {
            imagemSelecionada = evento.target.result;
            document.getElementById('preview-imagem').innerHTML = '<img src="' + evento.target.result + '" alt="Preview">';
        };
        leitor.readAsDataURL(arquivo);
    }
});

function selecionarEstrelaForm(valor) {
    notaFormulario = valor;
    const estrelasForm = document.querySelectorAll('.star-form');
    estrelasForm.forEach((s, i) => {
        if (i < valor) {
            s.classList.add('ativo');
        } else {
            s.classList.remove('ativo');
        }
    });
}

function salvarItem() {
    const nome = document.getElementById('input-nome').value;

    if (!nome || !imagemSelecionada || notaFormulario === 0) {
        alert('Preencha todos os campos e selecione uma nota!');
        return;
    }

    const novoItem = {
        nome: nome,
        imagem: imagemSelecionada,
        nota: notaFormulario,
        tipo: tipoAtual
    };
    
    meuItensAdicionados.push(novoItem);
    
    localStorage.setItem('meus_itens', JSON.stringify(meuItensAdicionados));
    
    adicionarItemNaTela(novoItem);

    fecharFormulario();
}

function mostrarDetalhesFilme(idFilme) {
    alert('Detalhes do filme em desenvolvimento!');
}

function abrirDetalhesDinamico(objeto) {

    document.getElementById("detalhe-nome").innerText = objeto.nome;
    document.getElementById("detalhe-descricao").innerText = "Esta obra foi adicionada manualmente à sua lista.";
    document.getElementById("detalhe-duracao").innerText = "-";
    document.getElementById("detalhe-temporadas").innerText = "-";
    document.getElementById("detalhe-imagem").src = objeto.imagem;

    const secao = document.getElementById("detalhes-serie");
    secao.style.display = "block";
    secao.scrollIntoView({ behavior: "smooth" });

    pintarEstrelas(objeto.nota);
    document.getElementById("feedback-voto").innerText = "Nota inicial: " + objeto.nota;
}