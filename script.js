function mostrarDetalhes(serie) {
  const detalhes = document.getElementById("detalhes-serie");

const dados = {
  stranger_things: {
    nome: "Stranger Things",
    descricao: "Ambientada nos anos 80, a série acompanha um grupo de amigos que vive em uma pequena cidade marcada por estranhos acontecimentos. O desaparecimento de um garoto revela experimentos secretos, forças sobrenaturais e uma dimensão paralela conhecida como Mundo Invertido, colocando todos em perigo enquanto eles tentam salvar quem amam.",
    duracao: "50 min",
    temporadas: "4",
    imagem: "imagens/stranger_things.jpeg"
  },
  breakingbad: {
    nome: "Breaking Bad",
    descricao: "A história acompanha Walter White, um professor de química que recebe um diagnóstico de câncer terminal e decide mudar completamente sua vida. Ao entrar no mundo do tráfico de drogas para garantir o futuro financeiro de sua família, ele se envolve em situações cada vez mais perigosas, mostrando como o poder e a ambição podem transformar uma pessoa.",
    duracao: "47 min",
    temporadas: "5",
    imagem: "imagens/breaking_bad.jpeg"
  },
  the_crown: {
    nome: "The Crown",
    descricao: "A série retrata o reinado da Rainha Elizabeth II, explorando os bastidores da monarquia britânica e os eventos históricos que marcaram o século XX. Entre conflitos políticos, dramas familiares e decisões difíceis, a trama mostra o peso da coroa e os desafios pessoais enfrentados por quem governa um império.",
    duracao: "58 min",
    temporadas: "6",
    imagem: "imagens/the_crown.webp"
  },
  game_of_thrones: {
    nome: "Game of Thrones",
    descricao: "Em um mundo fantástico dividido por reinos rivais, famílias nobres disputam o poder e o controle do Trono de Ferro. Enquanto intrigas políticas, traições e guerras moldam o destino dos Sete Reinos, uma ameaça antiga cresce além da Muralha, colocando toda a humanidade em risco.",
    duracao: "55 min",
    temporadas: "8",
    imagem: "imagens/game_of_thrones.png"
  }
};


  document.getElementById("detalhe-nome").innerText = dados[serie].nome;
  document.getElementById("detalhe-descricao").innerText = dados[serie].descricao;
  document.getElementById("detalhe-duracao").innerText = dados[serie].duracao;
  document.getElementById("detalhe-temporadas").innerText = dados[serie].temporadas;
  document.getElementById("detalhe-imagem").src = dados[serie].imagem;

  detalhes.style.display = "block";
  detalhes.scrollIntoView({ behavior: "smooth" });
}
