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

  /* ---------- FREE AUDIT MODAL ---------- */
  var auditModal = document.getElementById('auditModal');
  var auditModalClose = document.getElementById('auditModalClose');
  var lastFocused = null;
  function openAuditModal(){
    lastFocused = document.activeElement;
    closeMobileNav();
    auditModal.classList.add('open');
    auditModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    var firstField = document.getElementById('a-name');
    if(firstField){ setTimeout(function(){ firstField.focus(); }, 300); }
  }
  function closeAuditModal(){
    auditModal.classList.remove('open');
    auditModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    if(lastFocused){ lastFocused.focus(); }
    setTimeout(function(){
      var form = document.getElementById('auditForm');
      var success = document.getElementById('auditSuccess');
      if(success.classList.contains('show')){
        success.classList.remove('show');
        form.style.display = '';
        form.reset();
      }
    }, 350);
  }
  document.querySelectorAll('.js-open-audit').forEach(function(btn){
    btn.addEventListener('click', openAuditModal);
  });
  auditModalClose.addEventListener('click', closeAuditModal);
  auditModal.addEventListener('click', function(e){
    if(e.target === auditModal){ closeAuditModal(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && auditModal.classList.contains('open')){ closeAuditModal(); }
  });

  /* ---------- FORM SUBMIT (front-end only demo) ---------- */
  var auditForm = document.getElementById('auditForm');
  if(auditForm){
    auditForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(!auditForm.checkValidity()){
        auditForm.reportValidity();
        return;
      }
      auditForm.style.display = 'none';
      document.getElementById('auditSuccess').classList.add('show');
    });
  }

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