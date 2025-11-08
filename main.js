// scripts.js — interações: modal de personagem, menu mobile, carrinho simples
document.addEventListener('DOMContentLoaded', function(){
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // MOBILE MENU (simple toggle)
  const burger = document.querySelector('.btn-burger');
  const nav = document.querySelector('.main-nav');
  if(burger){
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'flex';
    });
  }

  // PERSON MODAL
  const cards = document.querySelectorAll('.person-card');
  const modal = document.getElementById('person-modal');
  const modalClose = modal.querySelector('.modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalRole = document.getElementById('modal-role');
  const modalDesc = document.getElementById('modal-desc');

  function openModalFromCard(card){
    const img = card.querySelector('img');
    const name = card.dataset.name || 'Personagem';
    const role = card.dataset.role || '';
    const desc = card.dataset.desc || '';
    modalImg.src = img.src || 'assets/placeholder.png';
    modalImg.alt = name;
    modalTitle.textContent = name;
    modalRole.textContent = role;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModalFromCard(card));
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') openModalFromCard(card);
    });
  });
  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // mock cart
  const cartBanner = document.getElementById('cart-banner');
  const cartText = document.getElementById('cart-text');
  const addButtons = document.querySelectorAll('.add-cart');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.dataset.product || 'Produto';
      cartText.textContent = `${product} adicionado ao carrinho!`;
      cartBanner.hidden = false;
      setTimeout(() => { cartBanner.hidden = true; }, 2500);
    });
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(ev){
      const href = a.getAttribute('href');
      if(href.length > 1){
        ev.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });

});



  const scrollContainer = document.querySelector('.carrossel-scroll');
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => isDown = false);
  scrollContainer.addEventListener('mouseup', () => isDown = false);

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // velocidade
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

