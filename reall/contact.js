(function(){
  "use strict";

  /* ---------- NAVBAR SCROLL STATE ---------- */
  var navbar = document.getElementById('navbar');
  var scrollTopBtn = document.getElementById('scrollTop');
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    if(y > 40){ navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); }
    if(y > 480){ scrollTopBtn.classList.add('show'); } else { scrollTopBtn.classList.remove('show'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- SCROLL TO TOP ---------- */
  scrollTopBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  /* ---------- MOBILE NAV ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  function closeMobileNav(){
    mobileNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  function toggleMobileNav(){
    var isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  navToggle.addEventListener('click', toggleMobileNav);
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMobileNav);
  });

  /* ---------- CONVERSATION CARD TABS ---------- */
  var tabs = document.querySelectorAll('.convo-tab');
  var panels = { message: document.getElementById('panel-message'), audit: document.getElementById('panel-audit') };
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      Object.keys(panels).forEach(function(k){ panels[k].classList.remove('active'); });
      panels[tab.getAttribute('data-tab')].classList.add('active');
    });
  });
  function activateAuditTab(){
    tabs.forEach(function(t){ t.classList.toggle('active', t.getAttribute('data-tab') === 'audit'); });
    Object.keys(panels).forEach(function(k){ panels[k].classList.toggle('active', k === 'audit'); });
  }

  /* ---------- BOOKING MODAL (Get free audit CTA -> opens request form) ---------- */
  var auditModal = document.getElementById('auditModal');
  var auditModalClose = document.getElementById('auditModalClose');
  var bookingFormView = document.getElementById('bookingFormView');
  var bookingForm = document.getElementById('bookingForm');
  var bookingSuccess = document.getElementById('bookingSuccess');
  var bookingSuccessText = document.getElementById('bookingSuccessText');

  function resetBookingModal(){
    bookingForm.reset();
    bookingForm.style.display = '';
    bookingFormView.style.display = '';
    bookingSuccess.classList.remove('show');
  }

  function openAuditModal(){
    resetBookingModal();
    auditModal.classList.add('open');
    auditModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
  function closeAuditModal(){
    auditModal.classList.remove('open');
    auditModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }
  document.querySelectorAll('.js-open-audit').forEach(function(btn){
    btn.addEventListener('click', function(){
      closeMobileNav();
      openAuditModal();
    });
  });
  auditModalClose.addEventListener('click', closeAuditModal);
  auditModal.addEventListener('click', function(e){ if(e.target === auditModal){ closeAuditModal(); } });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && auditModal.classList.contains('open')){ closeAuditModal(); } });

  bookingForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(!bookingForm.checkValidity()){
      bookingForm.reportValidity();
      return;
    }
    bookingSuccessText.textContent = 'We\'ll review your details and get back to you within 2 business days to schedule your call.';
    bookingFormView.style.display = 'none';
    bookingSuccess.classList.add('show');
  });

  /* ---------- FORM SUBMIT (front-end only demo) ---------- */
  function handleSubmit(formId, successId){
    var form = document.getElementById(formId);
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      form.style.display = 'none';
      document.getElementById(successId).classList.add('show');
    });
  }
  handleSubmit('contactForm','generalSuccess');
  handleSubmit('auditFormInline','auditInlineSuccess');

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if(item.classList.contains('open')){ a.style.maxHeight = a.scrollHeight + 'px'; }
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        if(openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-q').setAttribute('aria-expanded','false');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        q.setAttribute('aria-expanded','false');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- SMOOTH ANCHOR SCROLL W/ NAV OFFSET ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var id = link.getAttribute('href');
      if(id.length < 2) return;
      var target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      var offset = window.innerWidth < 980 ? 64 : 84;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({top: top, behavior:'smooth'});
      closeMobileNav();
    });
  });
})();
 function openMail(e) {
      var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        return true; // let native mailto: open the mail app
      }
      e.preventDefault();
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=work@reallcreation.com', '_blank', 'noopener,noreferrer');
      return false;
    }