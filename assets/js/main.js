const reviews = [
  {
    name: 'Joel Rodríguez',
    photo: 'assets/img/avaliacoes/Joel Rodríguez.png',
    stars: 5,
    text: 'Tive um acidente com o meu carro e acabei arranhando todo o lado direito ao bater no portão. O carro era praticamente novo e eu estava bem preocupado com o resultado. Levei o carro para a Sul Prime e, sinceramente, foram muito profissionais. Entregaram em apenas dois dias, exatamente no prazo combinado — mostram muita responsabilidade. Além disso, deixaram o carro como novo, parece que nunca sofreu um impacto. Até lavaram o veículo antes de entregar. Atendimento excelente, tanto da recepcionista quanto de toda a equipe. Recomendo 100% e, sempre que precisar fazer algo no meu carro, voltarei aqui sem dúvidas.',
    source: 'Google Meu Negócio'
  },
  {
    name: 'Dario David',
    photo: 'assets/img/avaliacoes/Dario David.png',
    stars: 5,
    text: 'Foi atendido com agendamento no dia exato e ficou pronto também quando foi prometido. Fiz reconstrução do para-choque dianteiro que tinha umas batidas e ficou perfeito. Ainda vou fazer com eles outros detalhes do meu carro. Pagamento facilitando e preço justo.',
    source: 'Google Meu Negócio'
  },
  {
    name: 'Bruno Guollo',
    photo: 'assets/img/avaliacoes/Bruno Guollo.png',
    stars: 5,
    text: 'Fizeram um ótimo trabalho, conseguiram recuperar meu pára-choque e deixaram praticamente como novo!',
    source: 'Google Meu Negócio'
  },
  {
    name: 'Pedro Primão',
    photo: 'assets/img/avaliacoes/Pedro Primão.png',
    stars: 5,
    text: 'Serviço impecável!! E ainda entregaram o carro todo limpinho por dentro. Fui pelas avaliações aqui do Google e não me arrependo, super indico :)',
    source: 'Google Meu Negócio'
  },
  {
    name: 'Fabio Franco',
    photo: 'assets/img/avaliacoes/Fabio Franco.png',
    stars: 5,
    text: 'Venho aqui parabenizar o excelente atendimento que tive quando solicitei o orçamento do meu veículo. Super profissional , avaliou tudo com muita calma , explicando todos os detalhes. Fiz vários orçamentos até pela minha seguradora , mais a sul prime me passou muita confiança. Com certeza sempre que eu puder, vou realizar serviços somente com eles .',
    source: 'Google Meu Negócio'
  },
  {
    name: 'Anderson Ribeiro',
    photo: 'assets/img/avaliacoes/Anderson Ribeiro.png',
    stars: 5,
    text: 'Serviço de altíssimo nível! Tive meu carro reparado na Sulprime após um processo bastante burocrático com a seguradora, e posso dizer com tranquilidade: valeu a pena esperar. Desde o primeiro contato, a equipe demonstrou profissionalismo, paciência e um compromisso genuíno com a qualidade. O atendimento foi sempre cordial e transparente, me mantendo informado sobre cada etapa. A oficina foi extremamente cuidadosa com cada detalhe e o resultado final ficou impecável. O carro voltou como novo, com acabamento perfeito, pintura de alto padrão e tudo dentro do prazo prometido. Agradeço a todos os envolvidos pelo excelente trabalho. Indico de olhos fechados e, sem dúvida, voltaria a confiar meu carro à Sulprime. Parabéns pela excelência!',
    source: 'Google Meu Negócio'
  },
  {
    name: 'Celi',
    photo: 'assets/img/avaliacoes/Celi.png',
    stars: 5,
    text: 'Está foi a segunda vez q levei meu carro na Sul Prime e fiquei satisfeita e feliz com o serviço. O preço é justo, o atendimento humanizado e eficiente, e o serviço ficou nota dez nas duas ocasiões. O carro foi entregue rapidamente e ainda lavado e o interior higienizado. Eu adorei. Confio neles e vou levar meu carro sempre lá quando precisar. Obrigada sul prime! Parabéns e continuem assim 💙',
    source: 'Google Meu Negócio'
  }
];

function createReviewSlide(review, index) {
  const slide = document.createElement('article');
  slide.className = 'carousel-slide';
  slide.setAttribute('data-index', index);

  const meta = document.createElement('div');
  meta.className = 'review-meta';

  const photoWrapper = document.createElement('div');
  photoWrapper.className = 'review-photo';
  if (review.photo) {
    const img = document.createElement('img');
    img.src = review.photo;
    img.alt = `${review.name} photo`;
    photoWrapper.appendChild(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'review-placeholder';
    const initials = review.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2);
    placeholder.textContent = initials;
    photoWrapper.appendChild(placeholder);
  }

  const textMeta = document.createElement('div');
  textMeta.className = 'review-meta-text';
  const nameEl = document.createElement('div');
  nameEl.className = 'review-name';
  nameEl.textContent = review.name;
  const stars = document.createElement('div');
  stars.className = 'review-stars';
  stars.textContent = '★'.repeat(review.stars);
  textMeta.append(nameEl, stars);


  meta.append(photoWrapper, textMeta);

  const text = document.createElement('p');
  text.className = 'depo-text';
  text.textContent = review.text;

  const author = document.createElement('div');
  author.className = 'depo-author';
  author.innerHTML = `${review.name} <span>— via ${review.source}</span>`;

  slide.append(meta, text, author);
  return slide;
}

function renderReviews(reviewsList) {
  const track = document.getElementById('carousel-track');
  track.innerHTML = '';

  reviewsList.forEach((review, index) => {
    track.appendChild(createReviewSlide(review, index));

    const dot = document.createElement('button');
    dot.className = 'carousel-indicator';
    dot.type = 'button';
    dot.dataset.index = index;
    dot.addEventListener('click', () => showSlide(index));
  });

  // Allow layout to settle, then detect overflow and add "Ler mais" when needed.
  // Use pixel maxHeight (lineHeight * 5) to reliably detect overflow and toggle per-card.
  setTimeout(() => {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));

    const collapseAllExcept = (except) => {
      slides.forEach((s) => {
        const pp = s.querySelector('.depo-text');
        const btn = s.querySelector('.read-more');
        if (!pp) return;
        if (s !== except) {
          pp.classList.remove('expanded');
          pp.classList.add('truncated');
          if (pp.dataset.maxHeight) pp.style.maxHeight = pp.dataset.maxHeight + 'px';
          if (btn) btn.textContent = 'Ler mais';
        }
      });
    };

    slides.forEach((slide) => {
      const p = slide.querySelector('.depo-text');
      if (!p) return;

      // compute line-height and max height for 5 lines
      const cs = window.getComputedStyle(p);
      let lineHeight = parseFloat(cs.lineHeight);
      if (Number.isNaN(lineHeight)) {
        // fallback: estimate from font-size * 1.2
        const fontSize = parseFloat(cs.fontSize) || 16;
        lineHeight = fontSize * 1.2;
      }
      const maxH = Math.round(lineHeight * 5);
      p.dataset.maxHeight = maxH;

      // apply truncation by default using max-height for broader browser support
      p.classList.add('truncated');
      p.style.overflow = 'hidden';
      p.style.maxHeight = maxH + 'px';

      // if content overflows the limited block, add a "Ler mais" button
      // Use scrollHeight vs maxH to detect overflow
      if (p.scrollHeight > maxH + 1) {
        // avoid adding duplicate buttons
        if (slide.querySelector('.read-more')) return;

        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'read-more';
        more.textContent = 'Ler mais';
        more.addEventListener('click', () => {
          // collapse others before toggling this one
          collapseAllExcept(slide);
          const expanded = p.classList.toggle('expanded');
          if (expanded) {
            // pause auto-scroll for 5 seconds when expanding a card
            pauseAutoSlide(5000);
            p.classList.remove('truncated');
            p.style.maxHeight = '';
            more.textContent = 'Ler menos';
            // ensure expanded slide is visible
            slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else {
            p.classList.add('truncated');
            p.style.maxHeight = p.dataset.maxHeight + 'px';
            more.textContent = 'Ler mais';
            slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        });
        slide.appendChild(more);
      }
    });
  }, 50);

  showSlide(0);
}

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const track = document.getElementById('carousel-track');
  const total = slides.length;
  const newIndex = (index + total) % total;
  const slide = slides[newIndex];

  if (slide && track) {
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const currentScroll = track.scrollLeft;
    const slideOffset = slide.offsetLeft;
    const target = slideOffset - (trackRect.width - slideRect.width) / 2;
    track.scrollTo({ left: target, behavior: 'smooth' });
  }

  slides.forEach((slideEl, idx) => {
    slideEl.classList.toggle('active', idx === newIndex);
  });
  currentSlide = newIndex;
}

let currentSlide = 0;
let autoSlideInterval;
let autoSlidePauseTimeout = null;

function pauseAutoSlide(ms) {
  // stop current auto slide and restart after `ms` milliseconds
  stopAutoSlide();
  if (autoSlidePauseTimeout) clearTimeout(autoSlidePauseTimeout);
  autoSlidePauseTimeout = setTimeout(() => {
    startAutoSlide();
    autoSlidePauseTimeout = null;
  }, ms);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 7000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function setupCarouselControls() {
  document.getElementById('review-prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
    stopAutoSlide();
    startAutoSlide();
  });

  document.getElementById('review-next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
    stopAutoSlide();
    startAutoSlide();
  });
}

function setupPanGestures() {
  const track = document.getElementById('carousel-track');
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let inactivityTimeout;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      startAutoSlide();
    }, 2000);
  };

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    stopAutoSlide();
    clearTimeout(inactivityTimeout);
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    resetInactivityTimer();
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 0.8;
    track.scrollLeft = scrollLeft - walk;
  });

  track.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    stopAutoSlide();
    clearTimeout(inactivityTimeout);
  });

  track.addEventListener('touchend', () => {
    isDown = false;
    resetInactivityTimer();
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 0.8;
    track.scrollLeft = scrollLeft - walk;
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  renderReviews(reviews);
  setupCarouselControls();
  setupPanGestures();
  startAutoSlide();
  console.log('assets/js/main.js carregado');
});
