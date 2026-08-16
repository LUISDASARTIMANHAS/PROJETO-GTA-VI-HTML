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


// Registrar o plugin ScrollTrigger do GSAP
gsap.registerPlugin(ScrollTrigger);

// 3. VÍDEO QUE ANDA COM O SCROLL COM GSAP
const capa = document.querySelector(".capa");
const capaConteudo = document.querySelector(".capa-conteudo");
const capaBarra = document.querySelector(".capa-barra");

if (video) {
  // Criamos uma timeline controlada pelo scroll utilizando ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: capa,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // Sincroniza a animação com a rolagem do scroll
    }
  });

  // Sumir com o conteúdo da capa bem rápido logo no início do scroll
  tl.to(capaConteudo, { opacity: 0, duration: 0.3 }, 0)
    .to(capaBarra, { opacity: 0, duration: 0.3 }, 0)
    // Revelar o vídeo de forma gradual
    .to(video, { opacity: 1, duration: 0.4 }, 0)
    // Avançar o tempo de reprodução do vídeo proporcionalmente ao scroll
    .to(video, {
      currentTime: () => video.duration || 0,
      ease: "none"
    }, 0);
}
