(function(){
  // ---- Navbar scroll state ----
  var navbar = document.getElementById('navbar');
  var scrollTopBtn = document.getElementById('scrollTop');
  function onScroll(){
    if(window.scrollY > 12){ navbar.classList.add('scrolled'); }
    else{ navbar.classList.remove('scrolled'); }
    if(window.scrollY > 480){ scrollTopBtn.classList.add('show'); }
    else{ scrollTopBtn.classList.remove('show'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---- Scroll to top ----
  scrollTopBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // ---- Mobile nav ----
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', function(){
    var isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      mobileNav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // ---- Booking modal ----
  var overlay = document.getElementById('bookingOverlay');
  var modalCard = overlay.querySelector('.modal-card');
  var formView = document.getElementById('bookingFormView');
  var successView = document.getElementById('bookingSuccessView');
  var form = document.getElementById('bookingForm');
  var serviceSelect = document.getElementById('bkService');
  var lastFocused = null;

  function openBooking(serviceName){
    if(serviceName){
      var opts = serviceSelect.options;
      for(var i=0;i<opts.length;i++){
        if(opts[i].value === serviceName || opts[i].text === serviceName){ serviceSelect.selectedIndex = i; break; }
      }
    }
    formView.hidden = false;
    successView.hidden = true;
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ document.getElementById('bkName').focus(); }, 250);
  }
  function closeBooking(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(lastFocused){ lastFocused.focus(); }
  }

  document.querySelectorAll('.js-open-booking').forEach(function(btn){
    btn.addEventListener('click', function(){
      openBooking(btn.getAttribute('data-service'));
    });
  });
  document.getElementById('bookingClose').addEventListener('click', closeBooking);
  document.getElementById('bookingDone').addEventListener('click', closeBooking);
  overlay.addEventListener('click', function(e){ if(e.target === overlay){ closeBooking(); } });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')){ closeBooking(); }
  });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    formView.hidden = true;
    successView.hidden = false;
    form.reset();
  });

  // ---- Service accordion rows ----
  var rows = document.querySelectorAll('.idx-row');
  rows.forEach(function(row){
    var head = row.querySelector('.idx-row-head');
    head.addEventListener('click', function(){
      row.classList.toggle('open');
      head.setAttribute('aria-expanded', row.classList.contains('open') ? 'true' : 'false');
    });
  });

  // ---- Category filter ----
  var pills = document.querySelectorAll('.filter-pill');
  var groups = document.querySelectorAll('.idx-group');

  pills.forEach(function(pill){
    pill.addEventListener('click', function(){
      pills.forEach(function(p){ p.classList.remove('active'); });
      pill.classList.add('active');
      var filter = pill.getAttribute('data-filter');

      if(filter === 'all'){
        groups.forEach(function(g){ g.style.display = ''; });
      } else {
        groups.forEach(function(g){
          g.style.display = (g.getAttribute('data-group') === filter) ? '' : 'none';
        });
      }
    });
  });

  // ---- FAQ accordion ----
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var q = item.querySelector('.faq-q');
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function(){
      item.classList.toggle('open');
      q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
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