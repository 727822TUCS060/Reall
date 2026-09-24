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
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  navToggle.addEventListener('click', toggleMobileNav);
  mobileNav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMobileNav); });

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
  handleSubmit('auditForm','auditSuccess');
  handleSubmit('projectForm','projectFormSuccess');

  /* ---------- WORK RAIL: sticky index + pill nav sync via IntersectionObserver (desktop) / tap-to-replace (mobile) ---------- */
  var panels = Array.prototype.slice.call(document.querySelectorAll('.rail-panel'));
  var indexItems = Array.prototype.slice.call(document.querySelectorAll('.rail-index-item'));
  var pillItems = Array.prototype.slice.call(document.querySelectorAll('.rail-pillnav a'));
  var railBreakpoint = 980;
  var railObservers = null;

  function isRailMobile(){ return window.innerWidth <= railBreakpoint; }

  function setActiveIndex(i){
    indexItems.forEach(function(el){ el.classList.toggle('active', el.getAttribute('data-index') === String(i)); });
    pillItems.forEach(function(el){ el.classList.toggle('active', el.getAttribute('data-index') === String(i)); });
  }

  /* On mobile, only one project panel is ever shown — this swaps which one instead of stacking all of them */
  function showMobilePanel(i){
    panels.forEach(function(p){
      p.classList.toggle('mobile-active', p.getAttribute('data-index') === String(i));
    });
    setActiveIndex(i);
  }

  function startDesktopScrollSpy(){
    if(railObservers || !('IntersectionObserver' in window)) return;
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); }
      });
    }, {threshold:0.15});
    panels.forEach(function(p){ revealObserver.observe(p); });

    var activeObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ setActiveIndex(entry.target.getAttribute('data-index')); }
      });
    }, {threshold:0, rootMargin:'-45% 0px -45% 0px'});
    panels.forEach(function(p){ activeObserver.observe(p); });

    railObservers = {reveal:revealObserver, active:activeObserver};
  }

  function stopDesktopScrollSpy(){
    if(!railObservers) return;
    railObservers.reveal.disconnect();
    railObservers.active.disconnect();
    railObservers = null;
  }

  function applyRailMode(){
    if(isRailMobile()){
      stopDesktopScrollSpy();
      var current = document.querySelector('.rail-pillnav a.active') || pillItems[0];
      showMobilePanel(current ? current.getAttribute('data-index') : '0');
    } else {
      panels.forEach(function(p){ p.classList.remove('mobile-active'); });
      if('IntersectionObserver' in window){ startDesktopScrollSpy(); }
      else { panels.forEach(function(p){ p.classList.add('in-view'); }); }
    }
  }
  applyRailMode();

  var railResizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(railResizeTimer);
    railResizeTimer = setTimeout(applyRailMode, 150);
  });

  /* Mobile pill tap: replace the visible project instead of scrolling to it */
  pillItems.forEach(function(link){
    link.addEventListener('click', function(e){
      if(isRailMobile()){
        e.preventDefault();
        e.stopImmediatePropagation();
        showMobilePanel(link.getAttribute('data-index'));
      }
    });
  });

  indexItems.forEach(function(item){
    function jump(){
      var i = item.getAttribute('data-index');
      if(isRailMobile()){
        showMobilePanel(i);
        return;
      }
      var target = panels[Number(i)];
      if(target){
        var offset = 84;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top: top, behavior:'smooth'});
      }
    }
    item.addEventListener('click', jump);
    item.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); jump(); } });
  });

  /* ---------- GROWTH SYSTEM: interactive steps (desktop panel + mobile accordion) ---------- */
  var growthTrack = document.getElementById('growthTrack');
  if(growthTrack){
    var growthSteps = Array.prototype.slice.call(growthTrack.querySelectorAll('.growth-step'));
    var gdNum = document.getElementById('growthDescNum');
    var gdTitle = document.getElementById('growthDescTitle');
    var gdText = document.getElementById('growthDescText');

    function setActiveGrowthStep(index, opts){
      opts = opts || {};
      var toggledOff = false;
      growthSteps.forEach(function(step, i){
        var isActive = i === index;
        if(isActive && opts.allowToggle && step.classList.contains('active')){
          isActive = false;
          toggledOff = true;
        }
        step.classList.toggle('active', isActive);
        step.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });

      var activeStep = toggledOff ? null : growthSteps[index];
      var pct = (!toggledOff && growthSteps.length > 1) ? (index / (growthSteps.length - 1)) * 100 : 0;
      growthTrack.style.setProperty('--gs-progress', pct + '%');

      if(activeStep && gdNum && gdTitle && gdText){
        var num = activeStep.querySelector('.gs-num').textContent;
        var title = activeStep.querySelector('.gs-title').textContent;
        var desc = activeStep.querySelector('.gs-desc').textContent;
        gdNum.textContent = num;
        gdTitle.textContent = title.charAt(0) + title.slice(1).toLowerCase();
        gdText.textContent = desc;
      }
    }

    growthSteps.forEach(function(step, i){
      step.addEventListener('click', function(){
        var isMobile = window.innerWidth <= 820;
        setActiveGrowthStep(i, {allowToggle: isMobile});
      });
    });

    setActiveGrowthStep(0);
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