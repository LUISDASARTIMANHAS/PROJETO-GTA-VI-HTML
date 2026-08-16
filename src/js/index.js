// OBJETIVO: dar comportamento ao site do GTA VI com JavaScript.

// Passos:
// 1. MENU QUE SOME AO ROLAR
//    - achar o menu no HTML
//    - escutar o evento de rolagem da janela

const menu = document.getElementById("menu");
const blocos = document.querySelectorAll(".aparecer");
const video = document.querySelector(".capa-video");

//    - escutar o evento de rolagem da janela
window.addEventListener("scroll", (event) => {
  //    - se a página desceu mais de 50px, adicionar a classe "menu-rolado"
  if (window.scrollY > 50) {
    menu.classList.add("menu-rolado");
  } else {
    //    - se voltou pro topo, remover a classe
    menu.classList.remove("menu-rolado");
  }
});

// 2. BLOCOS QUE APARECEM
//    - achar todos os elementos com a classe "aparecer"
//    - avisar quando cada um entrar na tela
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
		//    - ao entrar, adicionar a classe "visivel"
    if (entrada.isIntersecting) {
			entrada.target.classList.add("visivel");
		}
  });
});

blocos.forEach((bloco) => {
	observador.observe(bloco);
});


// 3. VÍDEO QUE ANDA COM O SCROLL
//    - achar o vídeo da capa
//    - prender a capa na tela enquanto a pessoa rola
//    - sumir com o conteúdo da capa e revelar o vídeo
//    - avançar o tempo do vídeo conforme o scroll
const capa = document.querySelector(".capa");
const capaConteudo = document.querySelector(".capa-conteudo");
const capaBarra = document.querySelector(".capa-barra");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const capaHeight = capa.offsetHeight - window.innerHeight;

  if (capaHeight > 0) {
    let progresso = scrollTop / capaHeight;
    if (progresso < 0) progresso = 0;
    if (progresso > 1) progresso = 1;

    // Se o vídeo já tiver a duração carregada, atualiza o tempo proporcionalmente ao scroll
    if (video.duration) {
      video.currentTime = progresso * video.duration;
    }

    // Faz o conteúdo da capa sumir conforme rola (fade out)
    const opacidade = 1 - progresso * 1.5;
    capaConteudo.style.opacity = opacidade >= 0 ? opacidade : 0;
    capaBarra.style.opacity = opacidade >= 0 ? opacidade : 0;

    // Revela o vídeo conforme o scroll
    const opacidadeVideo = progresso * 1.5;
    video.style.opacity = opacidadeVideo <= 1 ? opacidadeVideo : 1;
  }
});
