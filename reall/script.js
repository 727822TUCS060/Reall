(function(){
  "use strict";

  /* ---------- HERO REEL AMBIENT AUTOPLAY (safety net) ---------- */
  var heroReelVideoEl = document.getElementById('heroReelVideo');
  if(heroReelVideoEl){
    heroReelVideoEl.play().catch(function(){});
  }

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

  /* ---------- SERVICES FILTER ---------- */
  var serviceFilters = document.querySelectorAll('.service-filter');
  var serviceCards = document.querySelectorAll('.service-card');
  serviceFilters.forEach(function(btn){
    btn.addEventListener('click', function(){
      serviceFilters.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      serviceCards.forEach(function(card){
        var show = (f === 'all' || card.getAttribute('data-category') === f);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------- PROCESS PIPELINE (click a stage to reveal detail) ---------- */
  var pipelineData = [
    {
      title:'Research', desc:"Market, customer, competitor and business research — not opinion. We map the landscape before a single recommendation gets made. Every assumption is tested against real data, not internal guesswork. This is the evidence base everything else stands on.",
      grad:'linear-gradient(135deg,#151517 0%, #2a2a2e 100%)',
      icon:'<circle cx="10" cy="10" r="6"></circle><line x1="14.5" y1="14.5" x2="19" y2="19"></line>',
      art:'<circle cx="150" cy="90" r="46" fill="none" stroke="#e2222a" stroke-width="2" opacity=".55"/><circle cx="150" cy="90" r="46" fill="none" stroke="#e2222a" stroke-width="2" opacity=".25" transform="rotate(20 150 90)"/><line x1="184" y1="124" x2="226" y2="166" stroke="#e2222a" stroke-width="8" stroke-linecap="round"/><circle cx="150" cy="90" r="14" fill="#e2222a" opacity=".18"/>'
    },
    {
      title:'Discover', desc:"Turn raw research into a real insight about the opportunity, not just a pile of data points. We look for the pattern competitors have missed. That insight becomes the single idea everything downstream is built on. Without it, strategy is just a guess dressed up in a deck.",
      grad:'linear-gradient(135deg,#1a1a1c 0%, #2c1a1b 100%)',
      icon:'<path d="M10 2a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5a1 1 0 0 0 1 1h3.4a1 1 0 0 0 1-1v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 10 2z"></path><line x1="8" y1="19" x2="12" y2="19"></line>',
      art:'<circle cx="150" cy="80" r="34" fill="none" stroke="#e2222a" stroke-width="2"/><line x1="150" y1="34" x2="150" y2="22" stroke="#e2222a" stroke-width="3" stroke-linecap="round"/><line x1="188" y1="80" x2="200" y2="80" stroke="#e2222a" stroke-width="3" stroke-linecap="round" opacity=".7"/><line x1="100" y1="80" x2="112" y2="80" stroke="#e2222a" stroke-width="3" stroke-linecap="round" opacity=".7"/><line x1="176" y1="106" x2="184" y2="114" stroke="#e2222a" stroke-width="3" stroke-linecap="round" opacity=".7"/><line x1="124" y1="106" x2="116" y2="114" stroke="#e2222a" stroke-width="3" stroke-linecap="round" opacity=".7"/><rect x="140" y="128" width="20" height="14" rx="2" fill="#e2222a" opacity=".7"/>'
    },
    {
      title:'Strategize', desc:"Decide what to build, and why, before anything gets created. The insight from Discover is turned into a clear plan with priorities. Strategy determines which services actually get used, not the other way around. This is the blueprint every creative decision has to answer to.",
      grad:'linear-gradient(135deg,#151517 0%, #26262a 100%)',
      icon:'<circle cx="10" cy="10" r="7"></circle><circle cx="10" cy="10" r="3.6"></circle><circle cx="10" cy="10" r=".7" fill="#fff"></circle>',
      art:'<circle cx="150" cy="90" r="52" fill="none" stroke="#e2222a" stroke-width="1.6" opacity=".4"/><circle cx="150" cy="90" r="34" fill="none" stroke="#e2222a" stroke-width="1.6" opacity=".65"/><circle cx="150" cy="90" r="16" fill="none" stroke="#e2222a" stroke-width="1.6"/><circle cx="150" cy="90" r="4" fill="#e2222a"/><line x1="150" y1="20" x2="150" y2="0" stroke="#e2222a" stroke-width="2" opacity=".5"/>'
    },
    {
      title:'Create', desc:"Brand identity, content and creative direction, guided by strategy — not the other way around. Every visual and message ties back to the insight we uncovered earlier. Nothing gets made just because it looks good in isolation. Creative work here has a job to do, and it's measured on doing it.",
      grad:'linear-gradient(135deg,#1a1a1c 0%, #a80f16 130%)',
      icon:'<path d="M3 17l1-4L14 3l4 4L8 17l-5 0z"></path><line x1="12" y1="5" x2="15" y2="8"></line>',
      art:'<rect x="108" y="50" width="84" height="80" rx="3" fill="none" stroke="#e2222a" stroke-width="2" opacity=".6" transform="rotate(-6 150 90)"/><path d="M126 108 L170 64 L182 76 L138 120 L124 122Z" fill="#e2222a" opacity=".85"/><line x1="164" y1="70" x2="176" y2="82" stroke="#151517" stroke-width="2"/>'
    },
    {
      title:'Execute', desc:"Bring the strategy to life across every channel it needs to live in, on the timeline that matters. The same evidence guides every asset, so nothing drifts off-message mid-campaign. Execution here isn't a scramble — it follows the plan built in the earlier stages. Speed only matters if it's pointed the right way.",
      grad:'linear-gradient(135deg,#101012 0%, #3a1113 100%)',
      icon:'<path d="M10 2l2.5 5.5L18 9l-4.5 3.6L15 18l-5-3.2L5 18l1.5-5.4L2 9l5.5-1.5z"></path>',
      art:'<path d="M150 30 C165 30 178 45 178 70 C178 95 150 150 150 150 C150 150 122 95 122 70 C122 45 135 30 150 30Z" fill="none" stroke="#e2222a" stroke-width="2"/><circle cx="150" cy="68" r="14" fill="#e2222a" opacity=".8"/><line x1="132" y1="140" x2="122" y2="160" stroke="#e2222a" stroke-width="4" stroke-linecap="round" opacity=".6"/><line x1="168" y1="140" x2="178" y2="160" stroke="#e2222a" stroke-width="4" stroke-linecap="round" opacity=".6"/>'
    },
    {
      title:'Measure', desc:"Track what actually happens against success criteria set before launch, not vanity metrics chosen after the fact. We watch the numbers that were tied to the original strategy. This tells us honestly what worked and what didn't. Nothing gets called a win just because it feels like one.",
      grad:'linear-gradient(135deg,#151517 0%, #262024 100%)',
      icon:'<line x1="3" y1="17" x2="17" y2="17"></line><rect x="5" y="11" width="3" height="6"></rect><rect x="9.5" y="7" width="3" height="10"></rect><rect x="14" y="3" width="3" height="14"></rect>',
      art:'<line x1="98" y1="140" x2="98" y2="60" stroke="#3a3a3e" stroke-width="2"/><line x1="98" y1="140" x2="210" y2="140" stroke="#3a3a3e" stroke-width="2"/><rect x="112" y="108" width="18" height="32" fill="#e2222a" opacity=".5"/><rect x="140" y="88" width="18" height="52" fill="#e2222a" opacity=".7"/><rect x="168" y="64" width="18" height="76" fill="#e2222a"/>'
    },
    {
      title:'Optimize', desc:"Feed results back into the system and refine what's working, cutting what isn't. This is a continuous loop, not a one-off launch we walk away from. Small, evidence-led adjustments compound over time into real gains. The method keeps sharpening itself with every cycle.",
      grad:'linear-gradient(135deg,#151517 0%, #232326 100%)',
      icon:'<circle cx="10" cy="10" r="7"></circle><path d="M10 6v4l3 2"></path>',
      art:'<circle cx="150" cy="90" r="12" fill="none" stroke="#e2222a" stroke-width="2"/><path d="M150 60a30 30 0 0 1 28 20" fill="none" stroke="#e2222a" stroke-width="2"/><path d="M178 84l6-6 4 8" fill="none" stroke="#e2222a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M150 120a30 30 0 0 1-28-20" fill="none" stroke="#e2222a" stroke-width="2"/><path d="M122 96l-6 6-4-8" fill="none" stroke="#e2222a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    {
      title:'Scale', desc:"Scale what's proven, not what's promising. We never pour budget behind an assumption, only what the evidence says is working. This is where the method compounds — small wins turn into bigger, repeatable ones. Growth here is earned, not forced.",
      grad:'linear-gradient(135deg,#1a1a1c 0%, #2a1114 100%)',
      icon:'<line x1="3" y1="17" x2="17" y2="3"></line><polyline points="9,3 17,3 17,11"></polyline>',
      art:'<polyline points="100,130 128,100 150,116 200,58" fill="none" stroke="#e2222a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,58 200,58 200,80" fill="none" stroke="#e2222a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="130" r="4" fill="#e2222a"/><circle cx="128" cy="100" r="4" fill="#e2222a"/><circle cx="150" cy="116" r="4" fill="#e2222a"/><circle cx="200" cy="58" r="4" fill="#e2222a"/>'
    }
  ];
  var pnavItems = document.querySelectorAll('.pipeline-nav-item');
  var pipelineNav = document.querySelector('.pipeline-nav');
  var pipelineInteractive = document.querySelector('.pipeline-interactive');
  var pipelinePanel = document.getElementById('pipelinePanel');
  var pipelineClose = document.getElementById('pipelineClose');
  var pipelineArt = document.getElementById('pipelineArt');
  var pipelineIcon = document.getElementById('pipelineIcon');
  var pipelineTitle = document.getElementById('pipelineTitle');
  var pipelineDesc = document.getElementById('pipelineDesc');
  var pipelineMQ = window.matchMedia('(max-width:900px)');
  var activeStep = 0;

  function placePanel(){
    var activeBtn = document.querySelector('.pipeline-nav-item[data-step="'+activeStep+'"]');
    if(pipelineMQ.matches){
      /* mobile: panel sits directly below the clicked item, inside the nav column */
      if(activeBtn && activeBtn.nextSibling !== pipelinePanel){
        pipelineNav.insertBefore(pipelinePanel, activeBtn.nextSibling);
      }
    } else {
      /* desktop: panel sits in the right-hand column, always visible */
      pipelinePanel.style.display = '';
      if(pipelinePanel.parentNode !== pipelineInteractive){
        pipelineInteractive.appendChild(pipelinePanel);
      }
    }
  }

  function renderPipelineStep(i){
    activeStep = i;
    var d = pipelineData[i];
    placePanel();
    pipelinePanel.style.display = '';
    pipelinePanel.classList.remove('swap');
    void pipelinePanel.offsetWidth;
    pipelinePanel.classList.add('swap');
    pipelineArt.style.background = d.grad;
    pipelineArt.innerHTML = '<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">'+d.art+'</svg>';
    pipelineIcon.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">'+d.icon+'</svg>';
    pipelineTitle.textContent = d.title;
    pipelineDesc.textContent = d.desc;
    pnavItems.forEach(function(el){
      var active = parseInt(el.getAttribute('data-step'),10) === i;
      el.classList.toggle('active', active);
      el.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }
  pnavItems.forEach(function(el){
    el.addEventListener('click', function(){
      renderPipelineStep(parseInt(el.getAttribute('data-step'),10));
    });
  });
  if(pipelineClose){
    pipelineClose.addEventListener('click', function(){
      /* mobile-only: collapse the open card once they've read it */
      pipelinePanel.style.display = 'none';
      pnavItems.forEach(function(el){
        el.classList.remove('active');
        el.setAttribute('aria-selected','false');
      });
    });
  }
  if(pipelineMQ.addEventListener){
    pipelineMQ.addEventListener('change', placePanel);
  } else if(pipelineMQ.addListener){
    pipelineMQ.addListener(placePanel);
  }
  if(pnavItems.length){ renderPipelineStep(0); }

  /* ---------- WORK: STACKED CARD FAN ---------- */
  (function(){
    var fanCards = Array.prototype.slice.call(document.querySelectorAll('.fan-card'));
    var fanDots = Array.prototype.slice.call(document.querySelectorAll('.fan-dot'));
    if(!fanCards.length) return;
    var n = fanCards.length;
    var activeFan = 0;
    var autoTimer = null;

    function applySlot(card, slot){
      var isMobile = window.innerWidth < 620;
      var x=0, y=0, rot=0, scale=1, z=1;
      if(slot === 'center'){
        x = 0; y = isMobile ? -8 : -22; rot = 0; scale = 1.06; z = 30;
      } else if(slot === 'right'){
        x = isMobile ? 58 : 148; y = isMobile ? 18 : 28; rot = isMobile ? 7 : 11; scale = 0.9; z = 20;
      } else {
        x = isMobile ? -58 : -148; y = isMobile ? 18 : 28; rot = isMobile ? -7 : -11; scale = 0.9; z = 10;
      }
      card.style.zIndex = z;
      card.style.opacity = slot === 'center' ? '1' : '0.85';
      card.style.transform = 'translate(-50%,-50%) translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg) scale(' + scale + ')';
    }

    function layoutFan(){
      fanCards.forEach(function(card, i){
        var diff = (i - activeFan + n) % n;
        var slot = diff === 0 ? 'center' : (diff === 1 ? 'right' : 'left');
        applySlot(card, slot);
        card.classList.toggle('is-center', slot === 'center');
        card.setAttribute('aria-selected', slot === 'center' ? 'true' : 'false');
      });
      fanDots.forEach(function(dot, i){ dot.classList.toggle('active', i === activeFan); });
    }

    function setActive(i){
      activeFan = ((i % n) + n) % n;
      layoutFan();
    }

    function startAuto(){
      stopAuto();
      autoTimer = setInterval(function(){ setActive(activeFan + 1); }, 5000);
    }
    function stopAuto(){
      if(autoTimer){ clearInterval(autoTimer); autoTimer = null; }
    }

    fanCards.forEach(function(card, i){
      card.addEventListener('click', function(){ setActive(i); startAuto(); });
      card.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setActive(i); startAuto(); }
      });
    });
    fanDots.forEach(function(dot, i){
      dot.addEventListener('click', function(){ setActive(i); startAuto(); });
    });
    var fanWrap = document.querySelector('.work-fan');
    if(fanWrap){
      fanWrap.addEventListener('mouseenter', stopAuto);
      fanWrap.addEventListener('mouseleave', startAuto);
    }
    window.addEventListener('resize', layoutFan);
    layoutFan();
    startAuto();
  })();

  /* ---------- WHY: REASON FLIP CARDS (touch support) ---------- */
  (function(){
    var flips = document.querySelectorAll('.reason-flip');
    flips.forEach(function(card){
      card.addEventListener('click', function(){
        // Only needed on touch devices; harmless no-op alongside hover on desktop
        card.classList.toggle('is-flipped');
      });
      card.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          card.classList.toggle('is-flipped');
        }
      });
    });
  })();

  /* ---------- FAQ ACCORDION ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  function setFaqHeight(item, open){
    var a = item.querySelector('.faq-a');
    if(open){
      a.style.maxHeight = a.scrollHeight + 'px';
    } else {
      a.style.maxHeight = 0;
    }
  }
  faqItems.forEach(function(item){
    var q = item.querySelector('.faq-q');
    setFaqHeight(item, item.classList.contains('open'));
    q.addEventListener('click', function(){
      var willOpen = !item.classList.contains('open');
      faqItems.forEach(function(other){
        other.classList.remove('open');
        other.querySelector('.faq-q').setAttribute('aria-expanded','false');
        setFaqHeight(other, false);
      });
      if(willOpen){
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
        setFaqHeight(item, true);
      }
    });
  });
  window.addEventListener('resize', function(){
    faqItems.forEach(function(item){ if(item.classList.contains('open')) setFaqHeight(item, true); });
  });

  /* ---------- SHOW REEL LIGHTBOX ---------- */
  var reelModal = document.getElementById('reelModal');
  var reelModalClose = document.getElementById('reelModalClose');
  var reelVideo = document.getElementById('reelVideo');
  var heroReelVideo = document.getElementById('heroReelVideo');
  var reelLastFocused = null;
  function openReelModal(){
    reelLastFocused = document.activeElement;
    closeMobileNav();
    if(heroReelVideo){ heroReelVideo.pause(); }
    if(!reelVideo.querySelector('source')){
      var src = document.createElement('source');
      src.src = 'showreel.mp4';
      src.type = 'video/mp4';
      reelVideo.appendChild(src);
      reelVideo.load();
    }
    reelModal.classList.add('open');
    reelModal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    reelVideo.play().catch(function(){});
  }
  function closeReelModal(){
    reelModal.classList.remove('open');
    reelModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    reelVideo.pause();
    if(heroReelVideo){ heroReelVideo.play().catch(function(){}); }
    if(reelLastFocused){ reelLastFocused.focus(); }
  }
  document.querySelectorAll('.js-open-reel').forEach(function(btn){
    btn.addEventListener('click', openReelModal);
    btn.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openReelModal(); }
    });
  });
  reelModalClose.addEventListener('click', closeReelModal);
  reelModal.addEventListener('click', function(e){
    if(e.target === reelModal){ closeReelModal(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && reelModal.classList.contains('open')){ closeReelModal(); }
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
  handleSubmit('contactForm','generalSuccess');

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
