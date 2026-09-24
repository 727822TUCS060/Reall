(function(){
  // ---- Navbar scroll state ----
  var navbar = document.getElementById('navbar');
  function onScroll(){
    if(window.scrollY > 12){ navbar.classList.add('scrolled'); }
    else{ navbar.classList.remove('scrolled'); }
    var scrollTop = document.getElementById('scrollTop');
    if(window.scrollY > 500){ scrollTop.classList.add('show'); }
    else{ scrollTop.classList.remove('show'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  document.getElementById('scrollTop').addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // ---- Mobile nav ----
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  function closeMobileNav(){
    mobileNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  navToggle.addEventListener('click', function(){
    var isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMobileNav);
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // ---- Filter + search ----
  var pills = document.querySelectorAll('.filter-pill');
  var cards = document.querySelectorAll('.post-card');
  var searchInput = document.getElementById('postSearch');
  var filterCount = document.getElementById('filterCount');
  var emptyState = document.getElementById('emptyState');
  var postGrid = document.getElementById('postGrid');
  var currentFilter = 'all';

  function applyFilters(){
    var term = searchInput.value.trim().toLowerCase();
    var visible = 0;
    cards.forEach(function(card){
      var matchesCategory = (currentFilter === 'all' || card.getAttribute('data-category') === currentFilter);
      var haystack = (card.getAttribute('data-title') + ' ' + card.getAttribute('data-excerpt')).toLowerCase();
      var matchesSearch = term === '' || haystack.indexOf(term) !== -1;
      var show = matchesCategory && matchesSearch;
      card.classList.toggle('hide', !show);
      if(show) visible++;
    });
    filterCount.textContent = visible + (visible === 1 ? ' article' : ' articles');
    emptyState.classList.toggle('show', visible === 0);
    postGrid.style.display = visible === 0 ? 'none' : 'grid';
  }

  pills.forEach(function(pill){
    pill.addEventListener('click', function(){
      pills.forEach(function(p){ p.classList.remove('active'); });
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      applyFilters();
    });
  });
  searchInput.addEventListener('input', applyFilters);
  applyFilters();

  // ---- Load more (demo: just hides the button once all are visible) ----
  document.getElementById('loadMoreBtn').addEventListener('click', function(btn){
    this.textContent = 'You\'re all caught up';
    this.disabled = true;
    this.style.opacity = 0.6;
    this.style.cursor = 'default';
  });

  // ---- Newsletter submit (front-end only demo) ----
  var newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(!newsletterForm.checkValidity()){ newsletterForm.reportValidity(); return; }
    newsletterForm.classList.add('hidden');
    document.getElementById('newsletterSuccess').classList.add('show');
  });

  // ---- Free audit buttons: send to homepage contact/audit ----
  ['navAuditBtn','navAuditBtnMobile'].forEach(function(id){
    var btn = document.getElementById(id);
    if(btn){ btn.addEventListener('click', function(){ window.location.href = 'index.html#contact'; }); }
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