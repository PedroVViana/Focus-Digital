const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff,
    autoPlayInterval; // Variável para armazenar o intervalo de autoplay

const showHideIcons = () => {
    // Exibindo e ocultando os ícones de prev/next de acordo com o valor de rolagem do carrossel
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // obtendo a largura máxima rolável
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // obtendo a largura da primeira imagem e adicionando 14 ao valor da margem
        // se o ícone clicado for o da esquerda, reduzir o valor da largura do carrossel da esquerda, senão adicionar a ele
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => {
            showHideIcons();
            stopAutoPlay(); // Pausar o autoplay quando o cliente clicar no botão
        }, 60); // chamando showHideIcons após 60ms
    });
});

const autoSlide = () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        // Se o carrossel alcançou o final, volte ao início
        carousel.scrollLeft = 0;
    } else {
        // Se não, role para a direita
        carousel.scrollLeft += firstImgWidth;
    }
    showHideIcons();
};

const startAutoPlay = () => {
    autoPlayInterval = setInterval(autoSlide, 4000); // Defina o intervalo de autoplay para 2 segundos (2000ms)
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval); // Limpar o intervalo de autoplay quando o usuário interagir manualmente
};

const dragStart = (e) => {
    // atualizando os valores das variáveis globais no evento de clique do mouse
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    // rolando imagens/carrossel para a esquerda de acordo com o ponteiro do mouse
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// Iniciar o autoplay quando a página carregar
startAutoPlay();
