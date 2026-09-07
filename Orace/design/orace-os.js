(function(){

  /* ================= DATA (contenu réel du site) ================= */
  const SITE = { email:"orace.honfin@epitech.eu", phone:"+229 01 50 78 46 60", linkedin:"https://linkedin.com/in/oracehonfin" };
  const BIO = "Je suis Orace Honfin, ingénieur logiciel fullstack et cofondateur de Webspace. Je conçois des produits numériques de bout en bout, de l'architecture technique jusqu'à la mise en production. Mon travail se situe à la croisée du développement web et mobile, des systèmes, de l'intelligence artificielle et de la cybersécurité.";
  const INFO = [
    ["Cofondateur","Webspace"],
    ["Localisation","Cotonou, Bénin (GMT+1)"],
    ["Formation","Epitech — Expert en Informatique"],
    ["Focus","Systèmes, IA & ingénierie créative"],
    ["Statut","Ouvert — freelance / temps plein / co-fondation"],
  ];
  const SPECIALTIES = ["Systèmes bas niveau","Intelligence Artificielle","Sécurité applicative","Fullstack Web & Mobile"];
  const PROJECTS = [
    {slug:"trading-bot",title:"Bot de Trading IA",category:"Intelligence Artificielle",icon:"ia",tags:["IA","ML","Finance"],status:"ONLINE",demo:null,github:null,
      role:"Conception et développement solo — de l'algorithme au déploiement.",
      problem:"Suivre les marchés financiers à la main et réagir assez vite aux opportunités d'achat/vente ne tient pas à l'échelle.",
      approach:"Conception et développement d'un bot de trading automatisé intégrant des algorithmes d'IA pour analyser les marchés financiers et déclencher des décisions d'achat/vente en temps réel.",
      outcome:"Un bot fonctionnel qui transforme l'analyse de marché en décisions de trading automatisées, en temps réel."},
    {slug:"incubation",title:"Plateforme d'Incubation de Startups",category:"Produit Fullstack",icon:"web",tags:["Fullstack","Web","Mobile"],status:"ONLINE",demo:null,github:null,
      role:"Cofondateur et développeur principal chez Webspace.",
      problem:"Les startups en incubation avaient besoin d'un seul endroit pour passer du concept initial à un produit livré, plutôt que des outils épars.",
      approach:"Conception et développement d'une plateforme web et mobile fullstack de bout en bout, couvrant tout le parcours d'incubation.",
      outcome:"Une plateforme qui accompagne activement des startups dans leur construction et leur lancement."},
    {slug:"game-engine",title:"Moteur de Jeu & RPG Maison",category:"Moteur & Jeu",icon:"game",tags:["C","C++","Moteur"],status:"BETA",demo:null,github:null,
      role:"Conception et développement solo du moteur et des jeux.",
      problem:"Utiliser un moteur de jeu tout fait cache exactement ce qu'on cherche à apprendre.",
      approach:"Construction d'un moteur de jeu complet de zéro en C/C++ — architecture, rendu, boucle de jeu — puis livraison de jeux façon RPG, Hunter et Sokoban.",
      outcome:"Un moteur maison fonctionnel, avec deux jeux jouables construits directement dessus."},
    {slug:"haskell-lang",title:"Langage de Programmation Maison",category:"Langage & Compilateur",icon:"lang",tags:["Haskell","Compilateur"],status:"BETA",demo:null,github:null,
      role:"Conception et implémentation solo — parseur, typage, interprète.",
      problem:"Utiliser des langages existants ne dit rien sur ce qui se passe réellement entre le code source et son exécution.",
      approach:"Conception et implémentation d'un langage complet en Haskell — analyse lexicale, parsing, vérification de types et interprétation.",
      outcome:"Un langage fonctionnel avec son propre parseur, typeur et interprète."},
    {slug:"security-audits",title:"Audits de Sécurité Applicative",category:"Sécurité",icon:"sec",tags:["Pentest","Hardening"],status:"ONLINE",demo:null,github:null,
      role:"Audit, test d'intrusion et recommandations de correction.",
      problem:"Des applications mises en production sans revue de sécurité dédiée exposent des failles évitables.",
      approach:"Conduite d'audits de sécurité et de tests d'intrusion, puis durcissement des points faibles identifiés.",
      outcome:"Des applications plus robustes, avec des recommandations de correction priorisées."},
    {slug:"ia-sport",title:"Trophée IA & Sport",category:"Innovation",icon:"trophy",tags:["IA","Innovation"],status:"ONLINE",demo:null,github:null,
      role:"Lauréat — conception et présentation du projet gagnant.",
      problem:"Le concours proposait de repenser l'apport de l'IA à la performance sportive, en temps limité.",
      approach:"Conception d'un projet combinant intelligence artificielle et analyse de performance sportive, présenté devant un jury.",
      outcome:"Premier prix du concours, récompensant l'approche technique et sa présentation."},
  ];
  const SKILLS = [
    {name:"Langages",icon:'lang',level:"Usage quotidien",desc:"Bas niveau et haut niveau, du système au script.",tags:["C","C++","Python","Haskell"]},
    {name:"Web & Mobile",icon:'web',level:"Usage fréquent",desc:"Applications fullstack, du serveur à l'interface.",tags:["React","Next.js","Dart","API REST"]},
    {name:"IA & Data",icon:'ia',level:"Appliqué en production",desc:"Machine learning appliqué et trading algorithmique.",tags:["Machine Learning","PyTorch","scikit-learn"]},
    {name:"Sécurité & Ops",icon:'sec',level:"Pratique professionnelle",desc:"Audits, durcissement, et livraison continue.",tags:["Pentest","Docker","CI/CD","Linux"]},
  ];

  // Icônes d'application plates et colorées (grille plein écran)
  // localStorage peut lever en file:// (origine opaque) : tout est encapsulé.
  /* ============================================================
     MISE À L'ÉCHELLE DE L'INTERFACE
     L'interface garde la mise en page du PC sur tous les écrans. Quand le
     viewport est trop petit (téléphone en paysage), on applique un zoom global
     plutôt que de réorganiser quoi que ce soit.

     Conséquence : les coordonnées souris (clientX/Y) et les rectangles renvoyés
     par getBoundingClientRect sont dans l'espace « écran », alors que les styles
     (left/top/width) s'écrivent dans l'espace « interface ». Tout le code de
     positionnement passe donc par les convertisseurs ci-dessous.
     ============================================================ */
  const VIRTUAL_W = 1280, VIRTUAL_H = 640;

  function applyUiScale(){
    const s = Math.min(1, window.innerWidth / VIRTUAL_W, window.innerHeight / VIRTUAL_H);
    document.documentElement.style.setProperty('--ui-scale', s.toFixed(4));
    return s;
  }
  // échelle courante
  const S = ()=> parseFloat(getComputedStyle(document.body).zoom) || 1;
  // viewport exprimé dans l'espace interface
  const vw = ()=> window.innerWidth / S();
  const vh = ()=> window.innerHeight / S();
  // position souris exprimée dans l'espace interface
  const cx = (e)=> e.clientX / S();
  const cy = (e)=> e.clientY / S();
  // rectangle d'un élément exprimé dans l'espace interface
  function rectOf(elx){
    const r = elx.getBoundingClientRect(), k = S();
    return {left:r.left/k, top:r.top/k, right:r.right/k, bottom:r.bottom/k, width:r.width/k, height:r.height/k};
  }

  applyUiScale();
  window.addEventListener('resize', applyUiScale);
  window.addEventListener('orientationchange', ()=> setTimeout(applyUiScale, 120));

  const store = {
    get(k, fallback){
      try{ const v = localStorage.getItem('oraceos.'+k); return v === null ? fallback : JSON.parse(v); }
      catch(e){ return fallback; }
    },
    set(k, v){ try{ localStorage.setItem('oraceos.'+k, JSON.stringify(v)); }catch(e){} }
  };

  /* ---------------- Thème clair / sombre ---------------- */
  let theme = store.get('theme', 'dark');
  function applyTheme(t, quiet){
    theme = (t === 'light') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    store.set('theme', theme);
    // tous les interrupteurs « thème sombre » de l'interface restent synchronisés
    document.querySelectorAll('[data-theme-toggle]').forEach(tg=> tg.classList.toggle('on', theme === 'dark'));
    if(!quiet){
      sfx('toggle');
      logLine('gsettings', `thème : ${theme === 'dark' ? 'sombre' : 'clair'}`);
    }
  }
  function toggleTheme(){ applyTheme(theme === 'dark' ? 'light' : 'dark'); }
  applyTheme(theme, true);

  /* ---------------- Fonds d'écran ---------------- */
  const WALLPAPERS = [
    {f:'linux-1.jpg',         n:'Linux'},          // fond d'écran par défaut du bureau
    {f:'dragon-carbone.jpg',  n:'Dragon carbone'},
    {f:'kali-officiel.jpg',   n:'Kali officiel'},
    {f:'kali-violet.jpg',     n:'Kali violet'},
    {f:'kali-hd.jpg',         n:'Kali HD'},
    {f:'ubuntu-dragon.jpg',   n:'Ubuntu dragon'},
    {f:'paysage-1080p.jpg',   n:'Paysage'},
    {f:'sans-nom.jpg',        n:'Sans titre'},
  ];
  const WP_DIR = 'assets/wallpapers/';
  let currentWallpaper = null;

  function setWallpaper(file, persist){
    // Orace Phone garde un dégradé fixe (voir #ph-wallpaper en CSS), indépendant
    // du fond d'écran choisi côté bureau : on ne synchronise donc que #wp-photo.
    const wp = document.getElementById('wallpaper');
    const layer = document.getElementById('wp-photo');
    if(!file){                                   // aucun fichier : on garde le fond dessiné (bureau)
      wp.classList.remove('has-photo'); currentWallpaper = null;
      if(persist !== false) store.set('wallpaper', null);
      return;
    }
    layer.style.backgroundImage = `url('${WP_DIR}${file}')`;
    wp.classList.add('has-photo');
    currentWallpaper = file;
    if(persist !== false) store.set('wallpaper', file);
    document.querySelectorAll('.wp-thumb').forEach(t=> t.classList.toggle('sel', t.dataset.f === file));
    // la visionneuse d'images suit le fond courant
    document.querySelectorAll('.iv-stage img').forEach(img=> img.src = WP_DIR + file);
    document.querySelectorAll('.iv-bar span:first-child').forEach(sp=> sp.textContent = file);
  }

  // applique le choix enregistré, en repliant sur le premier fond disponible
  (function initWallpaper(){
    const saved = store.get('wallpaper', undefined);
    const tryLoad = (file, ok, ko)=>{
      const img = new Image();
      img.onload = ()=> ok(file);
      img.onerror = ko;
      img.src = WP_DIR + file;
    };
    if(saved) return tryLoad(saved, f=> setWallpaper(f, false), ()=> tryLoad(WALLPAPERS[0].f, f=> setWallpaper(f, false), ()=>{}));
    if(saved === null) return;                   // l'utilisateur a explicitement choisi « aucun »
    tryLoad(WALLPAPERS[0].f, f=> setWallpaper(f, false), ()=>{});
  })();

  const APP_ICONS_FLAT = {
    sysmon: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="7" fill="#14312A"/><path d="M5 21l5-7 4 5 5-9 4 7 4-4" stroke="#3DDC97" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    calc: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="2" width="22" height="28" rx="5" fill="#3B3B45"/><rect x="8" y="6" width="16" height="6" rx="2" fill="#C8F5E4"/><g fill="#9AA0B5"><circle cx="11" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><circle cx="21" cy="17" r="2"/><circle cx="11" cy="23" r="2"/><circle cx="16" cy="23" r="2"/></g><circle cx="21" cy="23" r="2" fill="#FF8A3D"/></svg>`,
    texted: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 3h13l6 6v20H7z" fill="#F2F4F8"/><path d="M20 3l6 6h-6z" fill="#C3CAD6"/><g stroke="#5B6478" stroke-width="2" stroke-linecap="round"><path d="M12 14h12M12 19h12M12 24h8"/></g></svg>`,
    clocks: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#F5F7FA"/><circle cx="16" cy="16" r="11" fill="#fff" stroke="#C3CAD6" stroke-width="1.5"/><path d="M16 8v8l6 3" stroke="#E8447F" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>`,
    software: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="7" fill="#2A2140"/><path d="M16 6l10 5v10l-10 5-10-5V11z" fill="none" stroke="#B49CFF" stroke-width="2.2" stroke-linejoin="round"/><path d="M6 11l10 5 10-5M16 16v10" stroke="#B49CFF" stroke-width="2.2" fill="none"/></svg>`,
    logs: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="26" height="24" rx="4" fill="#1E2430"/><g stroke="#7FE0C8" stroke-width="2" stroke-linecap="round"><path d="M8 11h6"/></g><g stroke="#7C8698" stroke-width="2" stroke-linecap="round"><path d="M8 16h14M8 21h10"/></g></svg>`,
    disks: `<svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="8" rx="11" ry="4.5" fill="#8C99B0"/><path d="M5 8v16c0 2.5 4.9 4.5 11 4.5s11-2 11-4.5V8" fill="#6E7B93"/><ellipse cx="16" cy="8" rx="11" ry="4.5" fill="#A8B3C7"/><circle cx="16" cy="8" r="3" fill="#4C596E"/></svg>`,
    archives: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 10h26v18a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="#D9A441"/><path d="M3 10l3-6h20l3 6z" fill="#F0BE5E"/><rect x="14" y="14" width="4" height="7" rx="1" fill="#8A6320"/></svg>`,
    imgview: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="5" width="26" height="22" rx="4" fill="#1F6FEB"/><circle cx="11" cy="12" r="2.6" fill="#FFD866"/><path d="M4 24l7-7 5 5 4-4 7 7z" fill="#7FD4A0"/></svg>`,
    chars: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="7" fill="#33263F"/><path d="M8 24V9h6a4 4 0 010 8H8" stroke="#F0ABFC" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 24l4.5-11L26 24" stroke="#F0ABFC" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    agenda: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="6" width="26" height="23" rx="4" fill="#F5F7FA"/><rect x="3" y="6" width="26" height="7" rx="4" fill="#E8447F"/><g fill="#8B93A7"><circle cx="10" cy="19" r="1.8"/><circle cx="16" cy="19" r="1.8"/><circle cx="22" cy="19" r="1.8"/><circle cx="10" cy="24" r="1.8"/></g><circle cx="16" cy="24" r="1.8" fill="#E8447F"/></svg>`,
    maps: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 7l8-3 10 3 8-3v21l-8 3-10-3-8 3z" fill="#7FD4A0"/><path d="M11 4v21M21 7v21" stroke="#4FA97A" stroke-width="1.6"/><path d="M16 12a3.4 3.4 0 00-3.4 3.4c0 2.6 3.4 6.6 3.4 6.6s3.4-4 3.4-6.6A3.4 3.4 0 0016 12z" fill="#E8447F"/></svg>`,
    aimodels: `<svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#2A2036"/>
      <circle cx="16" cy="10" r="3.6" fill="#F5793B"/>
      <circle cx="9" cy="21" r="3.2" fill="#F5A65B"/>
      <circle cx="23" cy="21" r="3.2" fill="#F5A65B"/>
      <path d="M16 13.4 9.6 18M16 13.4 22.4 18M11.4 22.6h9.2" stroke="#FFD9B0" stroke-width="1.7" stroke-linecap="round"/>
    </svg>`,
    browser: `<svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="#1E88E5"/>
      <path d="M2.6 12.5h26.8M2.6 19.5h26.8" stroke="#BBDEFB" stroke-width="1.6"/>
      <ellipse cx="16" cy="16" rx="6.4" ry="14" fill="none" stroke="#BBDEFB" stroke-width="1.6"/>
      <path d="M16 2v28" stroke="#BBDEFB" stroke-width="1.6"/>
    </svg>`,
    tradingbot: `<svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#10322A"/>
      <path d="M6 22.5 12 16l4.5 4L26 9.5" stroke="#33D69F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M20.5 9.5H26v5.5" stroke="#33D69F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`,
    vscode: `<svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#0F2A44"/>
      <path d="m11.5 11-4.5 5 4.5 5" stroke="#4FC1FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="m20.5 11 4.5 5-4.5 5" stroke="#4FC1FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="m17.8 9.5-3.6 13" stroke="#9CDCFE" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    settings: `<svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#3A3F4B"/>
      <circle cx="16" cy="16" r="4.2" fill="none" stroke="#E6E9EF" stroke-width="2.2"/>
      <path d="M16 5.5v3M16 23.5v3M26.5 16h-3M8.5 16h-3M23.4 8.6l-2.1 2.1M10.7 21.3l-2.1 2.1M23.4 23.4l-2.1-2.1M10.7 10.7 8.6 8.6" stroke="#E6E9EF" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,

    files: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 9a3 3 0 0 1 3-3h7l3 3h10a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" fill="#F0A02F"/>
          <path d="M3 13h26v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" fill="#FFC44D"/>
        </svg>`,
    terminal: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="2" y="4" width="28" height="24" rx="4" fill="#2B2B3A"/>
          <rect x="2" y="4" width="28" height="6" rx="3" fill="#3C3C50"/>
          <path d="m8 16 4 4-4 4" stroke="#4CD97B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M15 24h8" stroke="#8E8AA8" stroke-width="2.4" stroke-linecap="round"/>
        </svg>`,
    about: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="14" fill="#3DA5F4"/>
          <circle cx="16" cy="12.5" r="4.6" fill="#fff"/>
          <path d="M7.4 25.6a9 9 0 0 1 17.2 0A13.9 13.9 0 0 1 16 30a13.9 13.9 0 0 1-8.6-4.4Z" fill="#fff"/>
        </svg>`,
    skills: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="2" y="2" width="28" height="28" rx="7" fill="#7C4DFF"/>
          <rect x="7.5" y="7.5" width="7" height="7" rx="2" fill="#fff"/>
          <rect x="17.5" y="7.5" width="7" height="7" rx="2" fill="#C9B6FF"/>
          <rect x="7.5" y="17.5" width="7" height="7" rx="2" fill="#C9B6FF"/>
          <rect x="17.5" y="17.5" width="7" height="7" rx="2" fill="#fff"/>
        </svg>`,
    contact: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="2" y="6" width="28" height="20" rx="4" fill="#E8447F"/>
          <path d="M2.6 9.2 16 19 29.4 9.2" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>`,
    trash: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M7 9h18l-1.6 18.2A3 3 0 0 1 20.4 30h-8.8a3 3 0 0 1-3-2.8Z" fill="#8C99B0"/>
          <path d="M7 9h18l-.4 4.4H7.4Z" fill="#A8B3C7"/>
          <rect x="4.5" y="6" width="23" height="3.6" rx="1.8" fill="#6E7B93"/>
          <rect x="12.5" y="2.4" width="7" height="3.6" rx="1.8" fill="#6E7B93"/>
        </svg>`,
    meta: `<svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="2" y="2" width="28" height="28" rx="7" fill="#1E2438"/>
          <path d="M20 11c-4-3-9-4-13-4.2 5 1.4 9 3.2 11.4 5" stroke="#37E6FF" stroke-width="1.7" stroke-linecap="round" fill="none"/>
          <path d="M19.5 14.4c-3.6-1.6-8.4-2-13 -1 5-.2 9.4.4 13.2 1.8" stroke="#37E6FF" stroke-width="1.7" stroke-linecap="round" fill="none"/>
          <path d="M20.6 15.6c-2.6 1.6-3.4 5-1.6 7.4 1.8 2.4 5 2.4 7.4 4.4" stroke="#37E6FF" stroke-width="1.7" stroke-linecap="round" fill="none"/>
          <path d="M21.4 17.4c1.4-2 4.4-2.2 7 0" stroke="#37E6FF" stroke-width="1.7" stroke-linecap="round" fill="none"/>
        </svg>`
  };

  const APP_NAMES = {terminal:"Terminal", files:"Fichiers", about:"À propos", skills:"Compétences",
    contact:"Contact", trash:"Corbeille", meta:"Paramètres Système",
    aimodels:"AI Workbench", browser:"Navigateur", tradingbot:"Trading Bot IA",
    // Outils système : accessibles depuis la grille d'applications
    sysmon:"Moniteur système", calc:"Calculatrice", texted:"Éditeur de texte",
    clocks:"Horloges", software:"Logiciels", logs:"Journaux",
    disks:"Disques", archives:"Archives", imgview:"Visionneuse d'images",
    chars:"Table de caractères", agenda:"Agenda", maps:"Cartes"};

  // Dock du bas : mêmes icônes et mêmes conventions que le rail latéral, donc
  // le câblage existant (clic, app ouverte/active, tooltip, aperçu) s'y applique.
  (function buildBottomDock(){
    const dock = document.getElementById('bottomdock');
    // ordre du dock, bouton grille ajouté à la fin (voir plus bas)
    // 7 icônes max : outils et système. Les sections du portfolio vivent dans le rail.
    ['terminal','files','vscode','aimodels','browser','meta'].forEach(appId=>{
      // 'vscode' n'est pas une app à part : c'est un second accès au gestionnaire
      // de fichiers, côté code. Il porte donc data-app="files".
      const isAlias = appId === 'vscode';
      const target = isAlias ? 'files' : appId;
      const label = isAlias ? 'VS Code' : APP_NAMES[appId];
      const d = document.createElement('div');
      d.className = 'dock-icon';
      d.dataset.app = target;
      d.tabIndex = 0;
      d.setAttribute('role','button');
      d.setAttribute('aria-label', label);
      d.innerHTML = `<span class="ind"></span><span class="glyph">${APP_ICONS_FLAT[appId === 'meta' ? 'settings' : appId] || APP_ICONS_FLAT[target]}</span>`
                  + (appId === 'contact' ? '<span class="badge">1</span>' : '')
                  + `<span class="dock-tooltip">${label}</span>`;
      dock.appendChild(d);
    });
    // le bouton "toutes les applications" ferme la marche, comme demandé
    dock.appendChild(document.querySelector('#bottomdock .dock-sep-v'));
    dock.appendChild(document.getElementById('bottomdock-grid'));
  })();
  const PATHS = {terminal:"", files:"~/projects", about:"~/about", skills:"~/skills", contact:"~/contact",
    trash:"~/.trash", meta:"~/system", aimodels:"~/notebooks", browser:"~/web", tradingbot:"~/projects/trading-bot"};
  const STATUS_DEFAULT = {terminal:"Connecté — orace@kali", files:"5 éléments", about:"Profil public", skills:"4 catégories",
    contact:"Réponse sous 24–48h", trash:"Corbeille vide", meta:"Prototype front-end",
    aimodels:"Noyau Python 3", browser:"1 onglet", tradingbot:"Tableau de bord",
    sysmon:"Surveillance en cours", calc:"Prêt", texted:"Aucune modification",
    clocks:"4 fuseaux", software:"Dépôts à jour", logs:"journalctl -f",
    disks:"1 disque, 3 partitions", archives:"archive.tar.gz", imgview:"1 image",
    chars:"Unicode", agenda:"Mois courant", maps:"Cotonou, Bénin"};

  const ICONS = {
    sysmon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l4-6 3 4 4-8 3 6 4-3"/></svg>',
    calc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h2M12 12h2M16 12h.01M8 16h2M12 16h2M16 16h.01"/></svg>',
    texted:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h8l4 4v14H6z"/><path d="M9 12h6M9 16h6"/></svg>',
    clocks:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    software:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8l-9-5-9 5v8l9 5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/></svg>',
    logs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M7 9h4M7 13h8M7 17h6"/></svg>',
    disks:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/></svg>',
    archives:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18v13H3z"/><path d="M3 7l2-4h14l2 4M11 11h2v4h-2z"/></svg>',
    imgview:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 18 5-5 4 4 3-3 4 4"/></svg>',
    chars:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 19V7h5a3.5 3.5 0 010 7H6"/><path d="M14 19l4-8 4 8"/></svg>',
    agenda:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    maps:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14M15 6v14"/></svg>',
    terminal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z" stroke-opacity=".4"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>',
    files:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a1 1 0 011-1h4l2 2h10a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"/></svg>',
    about:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10h14V10"/></svg>',
    skills:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    contact:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 7h14M9 7V5h6v2m-8 0l1 13h8l1-13"/></svg>',
    meta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></svg>',
    folder:'<svg viewBox="0 0 24 24" fill="none" stroke="none"><path d="M3 7a1 1 0 011-1h5l2 2h9a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" fill="url(#g1)"/><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#37E6FF"/><stop offset="1" stop-color="#6C3BFF"/></linearGradient></defs></svg>',
    lang:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/></svg>',
    web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z"/></svg>',
    ia:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2"/></svg>',
    sec:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>',
    game:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="8" width="20" height="10" rx="5"/><path d="M7 11v4M5 13h4"/><circle cx="16" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="14" r="1" fill="currentColor"/></svg>',
    trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 5H5a3 3 0 003 3M16 5h3a3 3 0 01-3 3"/><path d="M12 13v3M9 20h6M10 16h4v4h-4z"/></svg>',
  };
  const PREVIEW_GRADIENTS = [
    'linear-gradient(155deg,#6C3BFF,#37E6FF)',
    'linear-gradient(155deg,#6C3BFF,#FF4ECD)',
    'linear-gradient(155deg,#37E6FF,#3d1f8f)',
  ];

  /* ================= BOOT ================= */
  const bootLines = [
    "[ OK ] Démarrage du noyau Orace 5.0-fullstack",
    "[ OK ] Montage de /home/webspace",
    "[ OK ] Chargement des modules : ia, systèmes, sécurité",
    "[ OK ] Cible atteinte : Réseau (Cotonou, GMT+1)",
    "[ OK ] Service démarré : contact-transceiver.sh",
    "",
    "Bienvenue sur Orace OS."
  ];
  const bootLogEl = document.getElementById('boot-log');
  const bootFill = document.getElementById('bootFill');
  let bootDone = false;
  function finishBoot(fromGesture){ if(bootDone) return; bootDone = true;
    // l'AudioContext exige un geste : pas de carillon sur une fin automatique
    if(fromGesture) sfx('chime'); document.getElementById('boot').classList.add('hide'); setTimeout(()=>document.getElementById('boot').style.display='none', 650); }
  bootLines.forEach((line, i)=>{
    setTimeout(()=>{
      const d = document.createElement('div');
      if(line.startsWith('[ OK ]')) d.innerHTML = '<span class="ok">[ OK ]</span>' + line.slice(6);
      else d.textContent = line || ' ';
      bootLogEl.appendChild(d);
      bootFill.style.width = Math.round(((i+1)/bootLines.length)*100)+'%';
    }, i*230);
  });
  setTimeout(finishBoot, bootLines.length*230 + 500);
  document.getElementById('boot').addEventListener('click', ()=> finishBoot(true));

  /* ================= CLOCK ================= */
  const DAYS = ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'];
  const MONTHS = ['Jan.','Fév.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'];
  const MONTHS_FULL = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  function formatClock(d){
    const hh = String(d.getHours()).padStart(2,'0'), mm = String(d.getMinutes()).padStart(2,'0');
    // date et heure séparées : la date est masquée en CSS sur petit écran
    return `<span class="clock-date">${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} - </span>${hh}:${mm}`;
  }
  function tickClock(){
    const d = new Date();
    const hhmm = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    document.getElementById('topbar-clock').innerHTML = formatClock(d);
    const lc = document.getElementById('lockClock');
    if(lc) lc.textContent = hhmm;
    const pc = document.getElementById('ph-clock');
    if(pc) pc.textContent = hhmm;
  }
  tickClock(); setInterval(tickClock, 10000);

  /* ================= WINDOW MANAGER ================= */
  const layer = document.getElementById('windows-layer');
  let zCounter = 10;
  let openWindows = {};
  let cascade = 0;
  let currentWs = 1;                     // bureau virtuel courant

  // 'big' : ~70% du viewport. Sinon plancher 850x550 appliqué par fitToViewport.
  const APP_CONFIG = {
    terminal:{w:900,h:580}, files:{w:1040,h:660,big:true}, about:{w:900,h:680,big:true},
    skills:{w:1000,h:640,big:true}, contact:{w:860,h:560}, trash:{w:850,h:550},
    meta:{w:880,h:600}, aimodels:{w:960,h:620,big:true}, browser:{w:1040,h:660,big:true},
    tradingbot:{w:1000,h:660,big:true},
    sysmon:{w:1000,h:640,big:true}, calc:{w:850,h:560}, texted:{w:960,h:640,big:true},
    clocks:{w:900,h:580}, software:{w:1000,h:660,big:true}, logs:{w:1000,h:600,big:true},
    disks:{w:900,h:580}, archives:{w:900,h:580}, imgview:{w:1000,h:660,big:true},
    chars:{w:900,h:600}, agenda:{w:880,h:600}, maps:{w:960,h:620,big:true},
  };

  // Taille d'ouverture : plancher 850x550, ~70% du viewport pour les grandes
  // fenêtres, le tout borné à l'espace réellement disponible.
  function fitToViewport(cfg){
    const availW = vw() - dockW() - 32;
    const availH = vh() - topbarH() - bottomInset() - 24;
    const w = Math.max(850, cfg.big ? Math.round(vw() * 0.7) : cfg.w);
    const h = Math.max(420, cfg.big ? Math.round(vh() * 0.7) : cfg.h);
    return { w: Math.max(320, Math.min(w, availW)), h: Math.max(220, Math.min(h, availH)) };
  }

  function setFocusedAppLabel(appId){
    document.getElementById('focused-app-name').textContent = appId ? ('— ' + APP_NAMES[appId]) : '';
  }
  // Hauteur réelle de la barre supérieure : lue au runtime pour rester juste
  // quel que soit le breakpoint (desktop / mobile).
  function topbarH(){ return document.getElementById('topbar').offsetHeight || 52; }
  // Largeur occupée par le dock latéral (0 quand il bascule en barre basse sur mobile)
  // Place prise par le dock du bas, pour que les fenêtres n'aillent pas se cacher dessous
  function bottomInset(){
    const d = document.getElementById('bottomdock');
    if(!d || getComputedStyle(d).display === 'none') return 0;
    return d.offsetHeight + 28;
  }

  function dockW(){
    const d = document.getElementById('sidedock');
    return (d && d.getBoundingClientRect().height > window.innerHeight/2) ? d.offsetWidth : 0;
  }

  function setRunning(appId, running){
    document.querySelectorAll(`[data-app="${appId}"]`).forEach(elx=>{
      if(elx.classList.contains('dock-icon')) elx.classList.toggle('running', running);
    });
  }
  // Marque l'icône du dock de l'application au premier plan.
  function setActiveDockIcon(appId){
    document.querySelectorAll('.dock-icon[data-app]').forEach(elx=>{
      elx.classList.toggle('active-app', !!appId && elx.dataset.app === appId);
    });
  }

  function openApp(appId){
    if(openWindows[appId]){ restoreAndFocus(appId); return; }
    const cfg = fitToViewport(APP_CONFIG[appId]);
    const elw = document.createElement('div');
    elw.className = 'win opening';
    elw.style.width = cfg.w+'px'; elw.style.height = cfg.h+'px';
    // centrée dans l'espace utile (hors barre du haut et rail), avec un décalage
    // discret pour que deux fenêtres ne se superposent pas exactement
    const off = (cascade - 1) * 18;
    const centerX = dockW() + (vw() - dockW() - cfg.w)/2;
    const centerY = topbarH() + (vh() - topbarH() - bottomInset() - cfg.h)/2;
    elw.style.left = Math.max(dockW() + 12, centerX + off)+'px';
    elw.style.top = Math.max(topbarH() + 12, centerY + off)+'px';
    cascade = (cascade+1) % 3;

    elw.innerHTML = `
      <div class="win-titlebar">
        <div class="win-titlebar-id">
          <span class="win-icon">${ICONS[appId] || APP_ICONS_FLAT[appId] || ''}</span>
          <span class="win-title">${APP_NAMES[appId]}</span>
          <span class="win-path">${PATHS[appId]||''}</span>
        </div>
        <div class="win-controls">
          <button class="win-btn min" title="Réduire" aria-label="Réduire">–</button>
          <button class="win-btn max" title="Agrandir" aria-label="Agrandir">▢</button>
          <button class="win-btn close" title="Fermer" aria-label="Fermer">×</button>
        </div>
      </div>
      <div class="win-body"></div>
      <div class="win-statusbar"><span class="ws-text">${STATUS_DEFAULT[appId]||''}</span></div>
      <div class="rz rz-n"></div><div class="rz rz-s"></div><div class="rz rz-e"></div><div class="rz rz-w"></div>
      <div class="rz rz-ne"></div><div class="rz rz-nw"></div><div class="rz rz-se"></div><div class="rz rz-sw"></div>
    `;
    layer.appendChild(elw);
    elw.querySelector('.win-body').appendChild(renderApp(appId, elw));

    openWindows[appId] = {el:elw, appId, minimized:false, maximized:false, prevRect:null, ws:currentWs};
    setRunning(appId, true);

    makeDraggable(elw);
    makeResizable(elw);
    elw.querySelector('.win-btn.min').addEventListener('click', ()=>minimizeWindow(appId));
    elw.querySelector('.win-btn.max').addEventListener('click', ()=>toggleMaximize(appId));
    elw.querySelector('.win-btn.close').addEventListener('click', ()=>closeWindow(appId));
    elw.querySelector('.win-titlebar').addEventListener('dblclick', (e)=>{ if(!e.target.closest('.win-controls')) toggleMaximize(appId); });
    elw.addEventListener('mousedown', ()=>focusWindow(appId));

    sfx('open');
    logLine('orace-wm', `fenêtre ouverte : ${APP_NAMES[appId]}`);
    focusWindow(appId);
  }

  function restoreAndFocus(appId){
    const w = openWindows[appId];
    w.minimized = false; w.el.classList.remove('minimized');
    focusWindow(appId);
  }
  function focusWindow(appId){
    Object.values(openWindows).forEach(w=>w.el.classList.remove('focused'));
    const w = openWindows[appId]; if(!w) return;
    w.el.style.zIndex = ++zCounter;
    w.el.classList.add('focused');
    setFocusedAppLabel(appId);
    setActiveDockIcon(appId);
  }
  function closeWindow(appId){
    const w = openWindows[appId]; if(!w) return;
    sfx('close');
    logLine('orace-wm', `fenêtre fermée : ${APP_NAMES[appId]}`);
    clearTimers(appId);
    w.el.classList.add('closing');
    setTimeout(()=>{ w.el.remove(); }, 150);
    delete openWindows[appId];
    setRunning(appId, false);
    const remaining = Object.keys(openWindows);
    const next = remaining.length ? remaining[remaining.length-1] : null;
    setFocusedAppLabel(next);
    setActiveDockIcon(next);
  }
  function minimizeWindow(appId){
    sfx('minimize');
    const w = openWindows[appId]; w.minimized = true; w.el.classList.add('minimized');
    w.el.classList.remove('focused');
    setFocusedAppLabel(null);
    setActiveDockIcon(null);
  }
  function toggleMaximize(appId){
    const w = openWindows[appId]; const elw = w.el;
    if(!w.maximized){
      const th = topbarH(), dw = dockW();
      w.prevRect = {left:elw.style.left, top:elw.style.top, width:elw.style.width, height:elw.style.height};
      // plein écran = espace libre, à droite du dock et sous la barre (comme Ubuntu)
      elw.style.left=dw+'px'; elw.style.top=th+'px';
      elw.style.width=`calc(100% - ${dw}px)`; elw.style.height=`calc(100% - ${th}px)`;
      elw.classList.add('maximized'); w.maximized = true;
    } else {
      Object.assign(elw.style, w.prevRect);
      elw.classList.remove('maximized'); w.maximized = false;
    }
    focusWindow(appId);
  }

  // Zone d'ancrage visée pendant un glissement : gauche, droite ou haut
  function snapZoneFor(x, y){
    const edge = 24;
    if(y <= topbarH() + edge) return 'top';
    if(x <= dockW() + edge) return 'left';
    if(x >= vw() - edge) return 'right';
    return null;
  }
  function snapRect(zone){
    const t = topbarH(), d = dockW();
    const w = vw() - d, h = vh() - t;
    if(zone === 'top')   return {left:d, top:t, width:w, height:h};
    if(zone === 'left')  return {left:d, top:t, width:w/2, height:h};
    if(zone === 'right') return {left:d + w/2, top:t, width:w/2, height:h};
    return null;
  }
  const snapGhost = document.getElementById('snap-ghost');
  function showGhost(zone){
    const r = snapRect(zone);
    if(!r){ snapGhost.classList.remove('show'); return; }
    Object.assign(snapGhost.style, {left:r.left+'px', top:r.top+'px', width:r.width+'px', height:r.height+'px'});
    snapGhost.classList.add('show');
  }

  function makeDraggable(winEl){
    const bar = winEl.querySelector('.win-titlebar');
    let sx,sy,ox,oy,dragging=false,zone=null;
    bar.addEventListener('mousedown', (e)=>{
      if(e.target.closest('.win-controls') || winEl.classList.contains('maximized')) return;
      dragging = true; sx=cx(e); sy=cy(e);
      const r = rectOf(winEl); ox=r.left; oy=r.top;
    });
    window.addEventListener('mousemove', (e)=>{
      if(!dragging) return;
      const nx = ox + (cx(e) - sx);
      // la fenêtre ne peut pas passer sous la barre supérieure
      const ny = Math.max(topbarH(), oy + (cy(e) - sy));
      winEl.style.left = nx+'px'; winEl.style.top = ny+'px';
      zone = snapZoneFor(cx(e), cy(e));
      showGhost(zone);
    });
    window.addEventListener('mouseup', ()=>{
      if(dragging && zone){
        const r = snapRect(zone);
        Object.assign(winEl.style, {left:r.left+'px', top:r.top+'px', width:r.width+'px', height:r.height+'px'});
        sfx('open');
      }
      if(dragging){ snapGhost.classList.remove('show'); }
      dragging=false; zone=null;
    });
  }
  function makeResizable(winEl){
    ['n','s','e','w','ne','nw','se','sw'].forEach(dir=>{
      const handle = winEl.querySelector('.rz-'+dir);
      let sx,sy,sw,sh,sl,st,resizing=false;
      handle.addEventListener('mousedown', (e)=>{
        e.stopPropagation(); e.preventDefault();
        if(winEl.classList.contains('maximized')) return;
        resizing = true;
        sx=cx(e); sy=cy(e);
        const r = rectOf(winEl);
        sw=r.width; sh=r.height; sl=r.left; st=r.top;
      });
      window.addEventListener('mousemove', (e)=>{
        if(!resizing) return;
        const dx = cx(e) - sx, dy = cy(e) - sy;
        let nl=sl, nt=st, nw=sw, nh=sh;
        if(dir.includes('e')) nw = Math.max(320, sw+dx);
        if(dir.includes('s')) nh = Math.max(220, sh+dy);
        if(dir.includes('w')){ nw = Math.max(320, sw-dx); nl = sl + (sw-nw); }
        if(dir.includes('n')){ nh = Math.max(220, sh-dy); nt = st + (sh-nh); }
        winEl.style.width = nw+'px'; winEl.style.height = nh+'px';
        winEl.style.left = nl+'px'; winEl.style.top = nt+'px';
      });
      window.addEventListener('mouseup', ()=>{ resizing=false; });
    });
  }

  /* ================= APP RENDERERS ================= */
  function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; }

  // Ouvre une réalisation dans le gestionnaire de fichiers depuis n'importe quelle app.
  let pendingFilesPath = null;
  function openProject(slug){
    const existing = openWindows['files'];
    pendingFilesPath = ['home','projects',slug];
    if(existing){
      // la fenêtre est déjà là : on la reconstruit sur le bon chemin
      const body = existing.el.querySelector('.win-body');
      body.innerHTML = '';
      body.appendChild(renderApp('files', existing.el));
      restoreAndFocus('files');
    } else {
      openApp('files');
    }
  }

  function renderApp(appId, elw){
    const body = document.createElement('div'); body.style.height = '100%';
    const statusEl = elw.querySelector('.ws-text');
    if(appId === 'about' || appId === 'meta') body.appendChild(buildAboutApp(appId));
    else if(appId === 'files') body.appendChild(buildFilesApp(statusEl));
    else if(appId === 'skills') body.appendChild(buildSkillsApp());
    else if(appId === 'contact') body.appendChild(buildContactApp());
    else if(appId === 'trash') body.appendChild(buildTrashApp());
    else if(appId === 'terminal') body.appendChild(buildTerminalApp());
    else if(appId === 'aimodels') body.appendChild(buildAiModelsApp(statusEl));
    else if(appId === 'browser') body.appendChild(buildBrowserApp(statusEl));
    else if(appId === 'tradingbot') body.appendChild(buildTradingBotApp(statusEl));
    else if(appId === 'sysmon') body.appendChild(buildSysmonApp(statusEl));
    else if(appId === 'calc') body.appendChild(buildCalcApp(statusEl));
    else if(appId === 'texted') body.appendChild(buildTextEdApp(statusEl));
    else if(appId === 'clocks') body.appendChild(buildClocksApp(statusEl));
    else if(appId === 'software') body.appendChild(buildSoftwareApp(statusEl));
    else if(appId === 'logs') body.appendChild(buildLogsApp(statusEl));
    else if(appId === 'disks') body.appendChild(buildDisksApp(statusEl));
    else if(appId === 'archives') body.appendChild(buildArchivesApp(statusEl));
    else if(appId === 'imgview') body.appendChild(buildImgViewApp(statusEl));
    else if(appId === 'chars') body.appendChild(buildCharsApp(statusEl));
    else if(appId === 'agenda') body.appendChild(buildAgendaApp(statusEl));
    else if(appId === 'maps') body.appendChild(buildMapsApp(statusEl));
    return body;
  }

  function buildAboutApp(appId){
    if(appId === 'meta'){
      const wrap = el('div','app-pad');
      wrap.appendChild(el('div','app-h','Paramètres Système'));
      wrap.appendChild(el('div','app-sub','Orace OS — préférences du bureau'));
      const rows = el('div','set-rows');
      [['Thème sombre', theme === 'dark', 'theme'],['Effets de transparence', true],
       ['Animations réduites', false],['Notifications', true]].forEach(([label,on,kind])=>{
        const r = el('div','qs-row');
        r.innerHTML = `<span class="lbl">${label}</span><span class="qs-toggle${on?' on':''}"${kind==='theme'?' data-theme-toggle':''}></span>`;
        const tg = r.querySelector('.qs-toggle');
        tg.addEventListener('click', function(){
          if(kind === 'theme'){ toggleTheme(); return; }   // applyTheme gère la classe
          this.classList.toggle('on');
        });
        rows.appendChild(r);
      });
      wrap.appendChild(rows);

      // Apparence : choix du fond d'écran
      wrap.appendChild(el('div','app-sub','Apparence — fond d’écran'));
      const wpGrid = el('div','wp-grid');
      WALLPAPERS.forEach(w=>{
        const t = el('button','wp-thumb' + (w.f === currentWallpaper ? ' sel' : ''));
        t.dataset.f = w.f;
        t.title = w.n;
        t.setAttribute('aria-label', 'Fond d’écran ' + w.n);
        t.innerHTML = `<img src="${WP_DIR}${w.f}" alt="" loading="lazy"><span>${w.n}</span>`;
        t.addEventListener('click', ()=>{
          sfx('tick');
          setWallpaper(w.f);
          logLine('gsettings', `fond d’écran : ${w.f}`);
          notify('Fond d’écran modifié', w.n, 'meta');
        });
        wpGrid.appendChild(t);
      });
      wrap.appendChild(wpGrid);

      wrap.appendChild(el('div','app-sub','À propos de cette build'));
      wrap.appendChild(el('p','app-lead','Prototype front-end (HTML/CSS/JS) inspiré de l’esthétique Kali Purple, conçu pour le portfolio d’Orace Honfin. Fenêtres, terminal et bureau sont fonctionnels — aucun framework, juste du JS natif.'));
      return wrap;
    }
    const wrap = el('div','settings-app');
    const sidebar = el('div','settings-sidebar');
    ['À propos','Date & heure','Utilisateurs','Applications par défaut','Confidentialité'].forEach((s,i)=>{
      sidebar.appendChild(el('div','set-item'+(i===0?' active':''), s));
    });
    wrap.appendChild(sidebar);
    const main = el('div','settings-main');
    main.innerHTML = `
      <div class="settings-logo"><span>OH</span></div>
      <h2>Orace Honfin</h2>
      <div class="role">Ingénieur Logiciel Fullstack</div>
      <p class="bio">${BIO}</p>
      <div class="spec-tags">${SPECIALTIES.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
    `;
    const table = el('div','info-table');
    INFO.forEach(([k,v])=>{
      const row = el('div','info-row');
      row.innerHTML = `<span class="k">${k}</span><span class="v">${v}</span>`;
      table.appendChild(row);
    });
    main.appendChild(table);
    const btn = el('a','settings-btn','Voir le profil LinkedIn');
    btn.href = SITE.linkedin; btn.target = '_blank'; btn.rel = 'noopener';
    main.appendChild(btn);
    wrap.appendChild(main);
    return wrap;
  }

  function buildFilesApp(statusEl){
    const wrap = el('div','files-app');
    const sidebar = el('div','files-sidebar');
    sidebar.innerHTML = `
      <div class="fs-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10h14V10"/></svg>Récents</div>
      <div class="fs-item active" data-nav="home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10h14V10"/></svg>Dossier personnel</div>
    `;
    wrap.appendChild(sidebar);

    const main = el('div','files-main');
    const toolbar = el('div','files-toolbar');
    toolbar.innerHTML = `<button class="back-arrow" id="filesBack" aria-label="Retour"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M15 5l-7 7 7 7"/></svg></button><div class="breadcrumb" id="filesCrumb"></div>`;
    main.appendChild(toolbar);
    const grid = el('div','files-grid');
    main.appendChild(grid);
    wrap.appendChild(main);

    let path = pendingFilesPath ? pendingFilesPath.slice() : ['home'];
    pendingFilesPath = null;

    function render(){
      const crumbEl = toolbar.querySelector('.breadcrumb');
      const backBtn = toolbar.querySelector('#filesBack');
      backBtn.disabled = path.length === 1;

      const labels = {home:'Dossier personnel', projects:'Réalisations'};
      let html = '';
      path.forEach((seg, i)=>{
        const isLast = i === path.length-1;
        const label = labels[seg] || (PROJECTS.find(p=>p.slug===seg)||{}).title || seg;
        html += `<span class="crumb ${isLast?'current':''}" data-idx="${i}">${label}</span>`;
        if(!isLast) html += '<span class="crumb-sep">/</span>';
      });
      crumbEl.innerHTML = html;
      crumbEl.querySelectorAll('.crumb:not(.current)').forEach(c=>{
        c.addEventListener('click', ()=>{ path = path.slice(0, parseInt(c.dataset.idx)+1); render(); });
      });
      backBtn.onclick = ()=>{ if(path.length>1){ path.pop(); render(); } };

      const cur = path[path.length-1];

      if(cur === 'home'){
        grid.className = 'files-grid';
        grid.innerHTML = '';
        [['Bureau',null],['Documents',null],['Images',null],['Modèles',null],['Réalisations','projects']].forEach(([name,nav])=>{
          const item = el('div','f-item');
          item.innerHTML = `<div class="f-icon">${ICONS.folder}</div><div class="f-name">${name}</div>`;
          if(nav) item.addEventListener('dblclick', ()=>{ path.push(nav); render(); });
          grid.appendChild(item);
        });
        if(statusEl) statusEl.textContent = '5 éléments';
      } else if(cur === 'projects'){
        grid.className = 'proj-grid';
        grid.innerHTML = '';
        PROJECTS.forEach((p,i)=>{
          const card = el('div','proj-card');
          card.tabIndex = 0; card.setAttribute('role','button'); card.setAttribute('aria-label', p.title);
          card.innerHTML = `
            <div class="proj-preview" style="background:${PREVIEW_GRADIENTS[i%PREVIEW_GRADIENTS.length]}">
              ${ICONS[p.icon]}
              <span class="proj-status">${p.status==='ONLINE'?'Terminé':'En cours'}</span>
            </div>
            <div class="proj-card-body">
              <div class="proj-cat">${p.category}</div>
              <div class="proj-name">${p.title}</div>
              <div class="proj-tags">${p.tags.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
            </div>`;
          const open = ()=>{ path.push(p.slug); render(); };
          card.addEventListener('dblclick', open);
          card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(); } });
          grid.appendChild(card);
        });
        if(statusEl) statusEl.textContent = PROJECTS.length + ' réalisations';
      } else {
        grid.className = 'files-grid';
        grid.style.display = 'block';
        const p = PROJECTS.find(pp=>pp.slug===cur);
        const detail = el('div','project-detail');
        const linksHtml = [];
        if(p.demo) linksHtml.push(`<a href="${p.demo}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 5h5v5M19 5l-9 9M6 5H5a1 1 0 00-1 1v13a1 1 0 001 1h13a1 1 0 001-1v-1"/></svg>Live Demo</a>`);
        if(p.github) linksHtml.push(`<a href="${p.github}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"/></svg>GitHub</a>`);
        detail.innerHTML = `
          <div class="pd-hero" style="background:${PREVIEW_GRADIENTS[PROJECTS.indexOf(p)%PREVIEW_GRADIENTS.length]}">
            ${ICONS[p.icon]}
            <span class="pd-status-pill">${p.status==='ONLINE'?'Terminé':'En cours'}</span>
          </div>
          <div class="pd-body">
            <div class="app-sub" style="margin-bottom:2px;">${p.category}</div>
            <div class="app-h">${p.title}</div>
            <div class="app-sub">${p.role}</div>
            <div class="block"><span class="k">Problème</span><p>${p.problem}</p></div>
            <div class="block"><span class="k">Approche</span><p>${p.approach}</p></div>
            <div class="block"><span class="k">Résultat</span><p>${p.outcome}</p></div>
            <div>${p.tags.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
            ${linksHtml.length ? `<div class="pd-links">${linksHtml.join('')}</div>` : ''}
          </div>
        `;
        grid.innerHTML = '';
        grid.appendChild(detail);
        if(statusEl) statusEl.textContent = p.status==='ONLINE' ? 'Terminé' : 'En cours';
      }
    }
    sidebar.querySelector('[data-nav="home"]').addEventListener('click', ()=>{ path=['home']; render(); });
    render();
    return wrap;
  }

  function buildSkillsApp(){
    const wrap = el('div','skills-grid');
    SKILLS.forEach(s=>{
      const card = el('div','skill-card');
      card.innerHTML = `<div class="top"><div class="glyph">${ICONS[s.icon]}</div><div><h4>${s.name}</h4><div class="skill-level">${s.level}</div></div></div><p class="skill-desc">${s.desc}</p><div class="tags">${s.tags.map(t=>`<span class="chip">${t}</span>`).join('')}</div>`;
      wrap.appendChild(card);
    });
    return wrap;
  }

  function buildContactApp(){
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h','Écrire à Orace'));
    wrap.appendChild(el('div','app-sub','Ouvert — freelance / temps plein / co-fondation'));
    const links = el('div','contact-links');
    links.innerHTML = `
      <a href="mailto:${SITE.email}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>${SITE.email}</a>
      <a href="tel:${SITE.phone.replace(/\s/g,'')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006.4 6.4l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/></svg>${SITE.phone}</a>
      <a href="${SITE.linkedin}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 13v4"/></svg>linkedin.com/in/oracehonfin</a>
    `;
    wrap.appendChild(links);
    const btn = el('a','term-launch','Ouvrir dans le terminal →');
    btn.href = '#';
    btn.addEventListener('click', (e)=>{ e.preventDefault(); openApp('terminal'); setTimeout(()=>runTerminalCommand('contact'), 250); });
    wrap.appendChild(btn);
    return wrap;
  }

  // --- AI Models : les projets IA réels présentés comme des notebooks ---
  function buildAiModelsApp(statusEl){
    const wrap = el('div','app-pad');
    const ia = SKILLS.find(x=>x.name.startsWith('IA')) || {tags:[]};
    const notebooks = [
      {p: PROJECTS.find(x=>x.slug==='trading-bot'), file:'trading-bot-predictor.ipynb', kernel:'Python 3'},
      {p: PROJECTS.find(x=>x.slug==='ia-sport'),    file:'sport-performance.ipynb',     kernel:'Python 3'},
    ].filter(n=>n.p);
    wrap.appendChild(el('div','app-h','AI Models'));
    wrap.appendChild(el('div','app-sub','~/notebooks — machine learning appliqué'));
    const list = el('div','nb-list');
    notebooks.forEach(n=>{
      const row = el('div','nb-row');
      row.innerHTML = `<span class="nb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 12h6M9 16h4"/></svg></span>
        <span class="nb-main"><span class="nb-file">${n.file}</span><span class="nb-desc">${n.p.title}</span></span>
        <span class="nb-kernel">${n.kernel}</span>`;
      row.addEventListener('click', ()=> openProject(n.p.slug));
      list.appendChild(row);
    });
    wrap.appendChild(list);
    wrap.appendChild(el('div','app-sub','Bibliothèques'));
    const tags = el('div','tags');
    tags.innerHTML = ia.tags.map(t=>`<span class="chip">${t}</span>`).join('');
    wrap.appendChild(tags);
    if(statusEl) statusEl.textContent = `${notebooks.length} notebooks · noyau Python 3`;
    return wrap;
  }

  // --- Navigateur : profil public réel + raccourcis vers les projets ---
  function buildBrowserApp(statusEl){
    const wrap = el('div','browser-app');
    const bar = el('div','browser-bar');
    bar.innerHTML = `<span class="bb-nav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg>
      </span>
      <span class="bb-url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>${SITE.linkedin.replace('https://','')}</span>`;
    wrap.appendChild(bar);
    const page = el('div','browser-page');
    const card = el('a','browser-card');
    card.href = SITE.linkedin; card.target = '_blank'; card.rel = 'noopener';
    card.innerHTML = `<span class="bc-title">Profil LinkedIn</span><span class="bc-sub">${SITE.linkedin.replace('https://','')}</span><span class="bc-go">Ouvrir →</span>`;
    page.appendChild(card);
    page.appendChild(el('div','app-sub','Signets — réalisations'));
    const marks = el('div','browser-marks');
    PROJECTS.forEach(pr=>{
      const chip = el('button','chip');
      chip.type = 'button';
      chip.textContent = pr.title;
      chip.addEventListener('click', ()=> openProject(pr.slug));
      marks.appendChild(chip);
    });
    page.appendChild(marks);
    wrap.appendChild(page);
    if(statusEl) statusEl.textContent = `1 onglet · ${PROJECTS.length} signets`;
    return wrap;
  }

  // --- Trading Bot IA : la fiche projet réelle en tableau de bord ---
  function buildTradingBotApp(statusEl){
    const pr = PROJECTS.find(x=>x.slug==='trading-bot');
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h', pr.title));
    wrap.appendChild(el('div','app-sub', pr.role));
    const tiles = el('div','tb-tiles');
    [['Statut', pr.status === 'ONLINE' ? 'En ligne' : 'Bêta'],
     ['Domaine', 'IA · Finance'],
     ['Exécution', 'Temps réel']].forEach(([k,v])=>{
      const t = el('div','tb-tile');
      t.innerHTML = `<span class="tb-k">${k}</span><span class="tb-v">${v}</span>`;
      tiles.appendChild(t);
    });
    wrap.appendChild(tiles);
    [['Problème', pr.problem],['Approche', pr.approach],['Résultat', pr.outcome]].forEach(([k,v])=>{
      const b = el('div','tb-block');
      b.innerHTML = `<span class="tb-label">${k}</span><p>${v}</p>`;
      wrap.appendChild(b);
    });
    const tags = el('div','tags');
    tags.innerHTML = pr.tags.map(t=>`<span class="chip">${t}</span>`).join('');
    wrap.appendChild(tags);
    if(statusEl) statusEl.textContent = `${pr.status === 'ONLINE' ? 'En ligne' : 'Bêta'} · projet solo`;
    return wrap;
  }

  function buildTrashApp(){
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h','Corbeille'));
    wrap.appendChild(el('p','app-lead','Rien à voir ici — je ne supprime jamais mes commits.'));
    return wrap;
  }

  let termState = {};
  function buildTerminalApp(){
    const wrap = el('div','term');
    const out = el('div','term-out');
    const inputRow = el('div','term-input-row');
    inputRow.innerHTML = `<span class="prompt">orace@kali:~$</span>`;
    const input = document.createElement('input'); input.autocomplete='off'; input.spellcheck=false;
    input.autocapitalize='off'; input.setAttribute('autocorrect','off'); input.setAttribute('inputmode','text');
    input.enterKeyHint = 'send';                 // clavier mobile : bouton Envoyer plutot que Entree
    input.setAttribute('aria-label','Commande terminal');
    inputRow.appendChild(input);
    wrap.appendChild(out); wrap.appendChild(inputRow);
    termState = { out, input, mode:'command', data:{} };
    printLine(out, '<span class="dim">Orace OS [Terminal] — tapez "help" pour la liste des commandes.</span>');
    if(!isPhoneMode()) setTimeout(()=>input.focus(), 50);
    input.addEventListener('keydown', (e)=>{
      sfx('key');
      if(e.key !== 'Enter') return;
      const val = input.value;
      printLine(out, `<span class="prompt">orace@kali:~$</span> ${escapeHtml(val)}`);
      input.value = ''; handleTerminalInput(val); out.scrollTop = out.scrollHeight;
    });
    return wrap;
  }
  function printLine(out, html){ const d=document.createElement('div'); d.innerHTML=html; out.appendChild(d); out.scrollTop = out.scrollHeight; }
  function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function runTerminalCommand(cmd){ if(!termState.input) return; printLine(termState.out, `<span class="prompt">orace@kali:~$</span> ${cmd}`); handleTerminalInput(cmd); }

  function handleTerminalInput(raw){
    const { out } = termState;
    const cmd = raw.trim();
    if(termState.mode !== 'command'){ handleContactWizard(cmd); return; }
    const lc = cmd.toLowerCase();
    if(lc === '') return;
    if(lc === 'help') printLine(out, ['help','whoami','about','projects','skills','contact','clear','sudo hire-me'].map(c=>`<span class="accent">${c}</span>`).join('<br>'));
    else if(lc === 'whoami') printLine(out, 'Orace Honfin — Ingénieur Logiciel Fullstack, cofondateur de Webspace.');
    else if(lc === 'about') printLine(out, BIO);
    else if(lc === 'projects' || lc === 'ls') PROJECTS.forEach(p=> printLine(out, `<span class="accent">${p.status==='ONLINE'?'●':'○'}</span> ${p.title} <span class="dim">[${p.tags.join(', ')}]</span>`));
    else if(lc === 'skills') SKILLS.forEach(s=> printLine(out, `<span class="accent">${s.name}</span> — ${s.tags.join(', ')}`));
    else if(lc === 'clear') out.innerHTML = '';
    else if(lc === 'contact') startContactWizard();
    else if(lc === 'sudo hire-me'){ printLine(out, '<span class="dim">[sudo] mot de passe pour orace : ********</span>'); printLine(out, 'Permission accordée. Ouverture du canal de contact…'); startContactWizard(); }
    else if(lc === 'exit'){ printLine(out, '<span class="dim">Fermeture…</span>'); setTimeout(()=>closeWindow('terminal'), 300); }
    else printLine(out, `<span class="dim">commande introuvable : ${escapeHtml(cmd)} — tapez "help".</span>`);
  }
  function startContactWizard(){
    termState.data = {}; termState.mode = 'contact-name';
    printLine(termState.out, '<span class="accent">&gt; ÉTAPE 1/3 : IDENTIFICATION</span><br>&gt; ENTREZ VOTRE NOM :');
  }
  function handleContactWizard(val){
    const { out } = termState;
    if(termState.mode === 'contact-name'){ termState.data.name = val; termState.mode = 'contact-email'; printLine(out, '<span class="accent">&gt; ÉTAPE 2/3 : ROUTE DE RETOUR</span><br>&gt; ENTREZ VOTRE ADRESSE EMAIL :'); }
    else if(termState.mode === 'contact-email'){ termState.data.email = val; termState.mode = 'contact-message'; printLine(out, '<span class="accent">&gt; ÉTAPE 3/3 : PAYLOAD</span><br>&gt; ENTREZ VOTRE MESSAGE :'); }
    else if(termState.mode === 'contact-message'){ termState.data.message = val; termState.mode = 'contact-confirm'; printLine(out, '&gt; ENVOYER LE SIGNAL À ORACE HONFIN ? (O/N)'); }
    else if(termState.mode === 'contact-confirm'){
      if(/^o/i.test(val)){
        const { name, email, message } = termState.data;
        printLine(out, '<span class="accent">&gt; Signal transmis avec succès.</span>');
        notify('Message prêt à partir', `Destinataire : ${SITE.email}`, 'contact');
        const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Contact depuis Orace OS — '+name)}&body=${encodeURIComponent(message+'\n\n'+email)}`;
        printLine(out, `<span class="dim">&gt; ou ouvrez directement votre client mail : <a href="${mailto}" style="color:inherit">cliquez ici</a></span>`);
      } else printLine(out, '<span class="dim">&gt; Transmission annulée.</span>');
      termState.mode = 'command';
    }
  }

  /* ================= DOCK WIRING ================= */
  function activateOnKey(elx, fn){
    elx.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); fn(); } });
  }
  document.querySelectorAll('.dock-icon[data-app]').forEach(icon=>{
    const trigger = ()=>{
      sfx('tick');
      const appId = icon.dataset.app;
      const w = openWindows[appId];
      if(w && w.el.classList.contains('focused') && !w.minimized) minimizeWindow(appId);
      else openApp(appId);
    };
    icon.addEventListener('mousedown', ()=> icon.classList.add('pressed'));
    icon.addEventListener('mouseup', ()=> icon.classList.remove('pressed'));
    icon.addEventListener('mouseleave', ()=> icon.classList.remove('pressed'));
    icon.addEventListener('click', trigger);
    activateOnKey(icon, trigger);
  });

  /* ================= DOCK HOVER PREVIEW ================= */
  document.querySelectorAll('.dock-icon[data-app]').forEach(icon=>{
    let popover = null;
    icon.addEventListener('mouseenter', ()=>{
      const appId = icon.dataset.app;
      const w = openWindows[appId];
      if(!w || w.minimized) return;
      const rect = rectOf(icon);
      popover = document.createElement('div');
      popover.className = 'dock-preview';
      const inner = document.createElement('div');
      inner.className = 'dock-preview-inner';
      const clone = w.el.cloneNode(true);
      inner.appendChild(clone);
      const label = document.createElement('div');
      label.className = 'dock-preview-label';
      label.textContent = APP_NAMES[appId];
      popover.appendChild(inner);
      popover.appendChild(label);
      document.body.appendChild(popover);
      const pw = 220, boxW = 204, boxH = 122;
      icon.classList.add('has-preview');
      if(dockW()){
        // dock vertical : aperçu à droite de l'icône, centré verticalement
        popover.style.left = (rect.right + 12) + 'px';
        popover.style.top = Math.max(topbarH()+8, Math.min(vh() - boxH - 40, rect.top + rect.height/2 - boxH/2)) + 'px';
      } else {
        // dock en barre basse (mobile) : aperçu au-dessus
        popover.style.left = Math.max(4, Math.min(vw()-pw-4, rect.left + rect.width/2 - pw/2)) + 'px';
        popover.style.top = (rect.top - boxH - 40) + 'px';
      }
      const ow = w.el.offsetWidth || parseInt(w.el.style.width), oh = w.el.offsetHeight || parseInt(w.el.style.height);
      const scale = Math.min(boxW/ow, boxH/oh);
      clone.style.width = ow+'px'; clone.style.height = oh+'px';
      clone.style.transform = `scale(${scale})`;
      clone.style.transformOrigin = 'top left';
    });
    icon.addEventListener('mouseleave', ()=>{ icon.classList.remove('has-preview'); if(popover){ popover.remove(); popover=null; } });
  });

  /* ================= FULLSCREEN APP GRID / COMMAND PALETTE ================= */
  const overview = document.getElementById('overview');
  const ovGrid = document.getElementById('ov-grid');
  const ovSearch = document.getElementById('ov-search');
  // le tiroir d'applications est partagé entre le bureau et Orace Phone :
  // on route vers la bonne coque selon le mode actif (isPhoneMode/openPhoneApp
  // sont déclarés plus bas mais sont des « function », donc hissés).
  function openAnyApp(appId){ if(isPhoneMode()) openPhoneApp(appId); else openApp(appId); }
  const OV_APPS = ['terminal','files','aimodels','browser','tradingbot','skills','about','contact','meta','trash',
    'sysmon','calc','texted','clocks','software','logs','disks','archives','imgview','chars','agenda','maps'];
  OV_APPS.forEach(appId=>{
    const item = el('div','ov-item');
    item.dataset.app = appId; item.dataset.name = APP_NAMES[appId].toLowerCase();
    item.tabIndex = 0; item.setAttribute('role','button'); item.setAttribute('aria-label', APP_NAMES[appId]);
    item.innerHTML = `<div class="glyph">${APP_ICONS_FLAT[appId === 'meta' ? 'settings' : appId] || ICONS[appId]}</div><span>${APP_NAMES[appId]}</span>`;
    const open = ()=>{ openAnyApp(appId); closeOverview(); };
    item.addEventListener('click', open);
    activateOnKey(item, open);
    ovGrid.appendChild(item);
  });
  function openOverview(){ overview.classList.add('show'); document.getElementById('launcher-btn').classList.add('open'); ovSearch.value=''; filterOverview(''); ovSearch.focus(); }
  function closeOverview(){ overview.classList.remove('show'); document.getElementById('launcher-btn').classList.remove('open'); }
  function toggleOverview(){ overview.classList.contains('show') ? closeOverview() : openOverview(); }

  /* ================= BARRE DE RECHERCHE (barre supérieure) ================= */
  // Elle sert d'entrée vers la palette existante : ce qu'on tape est transmis
  // au champ de l'aperçu, qui gère déjà le filtrage et les commandes.
  const topSearch = document.getElementById('topbar-search');
  function handoffToOverview(initial){
    openOverview();
    const ov = document.getElementById('ov-search');
    ov.value = initial || '';
    ov.dispatchEvent(new Event('input', {bubbles:true}));
    ov.focus();
    topSearch.value = '';
  }
  topSearch.addEventListener('focus', ()=>{ if(!overview.classList.contains('show')) handoffToOverview(''); });
  topSearch.addEventListener('input', ()=> handoffToOverview(topSearch.value));

  function filterOverview(q){
    document.querySelectorAll('.ov-item').forEach(item=>{
      item.hidden = q && !item.dataset.name.includes(q.toLowerCase());
    });
  }
  document.getElementById('dock-grid-btn').addEventListener('click', toggleOverview);
  document.getElementById('bottomdock-grid').addEventListener('click', toggleOverview);
  activateOnKey(document.getElementById('bottomdock-grid'), toggleOverview);
  activateOnKey(document.getElementById('dock-grid-btn'), toggleOverview);
  ovSearch.addEventListener('input', (e)=>filterOverview(e.target.value));
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeOverview();
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openOverview(); }
  });

  const COMMANDS = {
    'contact':'contact','contact me':'contact','écrire':'contact','écrire à orace':'contact',
    'projects':'files','projets':'files','open projects':'files','réalisations':'files',
    'about':'about','à propos':'about','open about':'about',
    'skills':'skills','compétences':'skills','open skills':'skills',
    'terminal':'terminal','open terminal':'terminal',
    'trash':'trash','corbeille':'trash',
    'ai':'aimodels','ai models':'aimodels','workbench':'aimodels','ai workbench':'aimodels','notebooks':'aimodels','jupyter':'aimodels',
    'browser':'browser','navigateur':'browser','linkedin':'browser',
    'trading':'tradingbot','trading bot':'tradingbot','bot':'tradingbot',
    'settings':'meta','paramètres':'meta','parametres':'meta',
    'code':'files','vscode':'files',
  };
  ovSearch.addEventListener('keydown', (e)=>{
    if(e.key !== 'Enter') return;
    const q = ovSearch.value.trim().toLowerCase();
    if(!q) return;
    if(COMMANDS[q]){ openAnyApp(COMMANDS[q]); closeOverview(); return; }
    if(q.includes('cv') || q.includes('résumé') || q.includes('resume')){
      ovSearch.placeholder = 'CV bientôt disponible…';
      ovSearch.value = '';
      setTimeout(()=>{ ovSearch.placeholder = 'Tapez pour rechercher ou une commande…'; }, 1800);
      return;
    }
    const firstVisible = document.querySelector('.ov-item:not([hidden])');
    if(firstVisible) firstVisible.click();
  });

  /* ================= QUICK SETTINGS ================= */
  const qsBtn = document.getElementById('qs-btn');
  const qsPanel = document.getElementById('quick-settings');
  const powerBtn = document.getElementById('power-btn');
  const powerMenu = document.getElementById('power-menu');
  qsBtn.addEventListener('click', (e)=>{ e.stopPropagation(); qsPanel.hidden = !qsPanel.hidden; powerMenu.hidden = true; });
  document.querySelectorAll('.qs-toggle').forEach(t=> t.addEventListener('click', ()=>{
    if(t.hasAttribute('data-theme-toggle')){ toggleTheme(); return; }  // géré par applyTheme
    t.classList.toggle('on');
    if(t.id !== 'qs-sound') sfx('toggle');
  }));
  // le volet Orace Phone a son propre bouton DND : on le maintient synchronisé avec celui du bureau
  document.getElementById('qs-dnd').addEventListener('click', ()=> setDND(dndOn()));
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('#quick-settings') && !e.target.closest('#qs-btn')) qsPanel.hidden = true;
    if(!e.target.closest('#power-menu') && !e.target.closest('#power-btn')) powerMenu.hidden = true;
  });
  const volSlider = document.getElementById('vol-slider');
  const volLabel = document.getElementById('volLabel');
  // bureau et volet Orace Phone partagent le même volume : un seul point d'entrée pour les deux curseurs
  function setVolume(v){
    audio.volume = +v; audio.sync(); store.set('volume', audio.volume);
    volLabel.textContent = audio.volume + '%';
    document.querySelectorAll('#vol-slider, #ph-vol-slider').forEach(s=>{ if(+s.value !== audio.volume) s.value = audio.volume; });
    logLine('pipewire', `volume réglé à ${audio.volume}%`);
  }
  volSlider.addEventListener('input', ()=> setVolume(volSlider.value));

  /* ================= LAUNCHER BUTTON ================= */
  document.getElementById('launcher-btn').addEventListener('click', toggleOverview);

  /* ================= POWER MENU / LOCK SCREEN ================= */
  const lockscreen = document.getElementById('lockscreen');
  function showLockScreen(){ lockscreen.hidden = false; tickClock(); }
  function unlock(){ lockscreen.hidden = true; }
  document.addEventListener('click', (e)=>{ if(!lockscreen.hidden){ e.stopPropagation(); unlock(); } }, true);
  document.addEventListener('keydown', ()=>{ if(!lockscreen.hidden) unlock(); });
  powerBtn.addEventListener('click', (e)=>{ e.stopPropagation(); powerMenu.hidden = !powerMenu.hidden; qsPanel.hidden = true; });
  powerMenu.querySelectorAll('.qs-row[data-action]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const action = btn.dataset.action;
      powerMenu.hidden = true;
      if(action === 'lock') showLockScreen();
      else location.reload();
    });
  });

  /* ================= MARQUEE SELECTION (desktop) ================= */
  const wallpaperEl = document.getElementById('wallpaper');
  const marquee = document.getElementById('marquee');
  let msx=0, msy=0, marqueeActive=false, marqueeMoved=false;
  wallpaperEl.addEventListener('mousedown', (e)=>{
    marqueeActive = true; marqueeMoved = false;
    msx = cx(e); msy = cy(e);
  });
  window.addEventListener('mousemove', (e)=>{
    if(!marqueeActive) return;
    if(!marqueeMoved){
      if(Math.hypot(cx(e)-msx, cy(e)-msy) < 4) return;
      marqueeMoved = true;
    }
    const x = Math.min(msx, cx(e)), y = Math.min(msy, cy(e));
    const w = Math.abs(cx(e) - msx), h = Math.abs(cy(e) - msy);
    marquee.style.left=x+'px'; marquee.style.top=y+'px'; marquee.style.width=w+'px'; marquee.style.height=h+'px';
    marquee.style.display = 'block';
  });
  window.addEventListener('mouseup', ()=>{
    if(marqueeActive){ marqueeActive=false; marquee.style.display='none'; }
  });



  /* ============================================================
     APPLICATIONS SYSTÈME — fonctionnelles
     ============================================================ */

  // Registre des intervalles par fenêtre, pour tout arrêter à la fermeture
  const appTimers = {};
  function ownTimer(appId, id){ (appTimers[appId] = appTimers[appId] || []).push(id); }
  function clearTimers(appId){ (appTimers[appId]||[]).forEach(clearInterval); appTimers[appId] = []; }

  /* ---- Moniteur système ---- */
  function buildSysmonApp(statusEl){
    const wrap = el('div','sysmon');
    wrap.innerHTML = `
      <div class="sm-gauges">
        <div class="sm-gauge"><div class="sm-label">Processeur</div><canvas class="sm-canvas" data-metric="cpu" width="600" height="90"></canvas><div class="sm-val" data-val="cpu">0%</div></div>
        <div class="sm-gauge"><div class="sm-label">Mémoire</div><canvas class="sm-canvas" data-metric="mem" width="600" height="90"></canvas><div class="sm-val" data-val="mem">0%</div></div>
        <div class="sm-gauge"><div class="sm-label">Réseau</div><canvas class="sm-canvas" data-metric="net" width="600" height="90"></canvas><div class="sm-val" data-val="net">0 ko/s</div></div>
      </div>
      <div class="sm-proc"><div class="sm-proc-head"><span>PID</span><span>Processus</span><span>Proc.</span><span>Mém.</span></div><div class="sm-proc-body"></div></div>`;

    const series = {cpu:[], mem:[], net:[]};
    const colors = {cpu:'#3DDC97', mem:'#B49CFF', net:'#37E6FF'};
    function draw(canvas, key){
      const ctx = canvas.getContext('2d');
      const w = canvas.width, h = canvas.height, data = series[key];
      ctx.clearRect(0,0,w,h);
      if(data.length < 2) return;
      const step = w / 59;
      ctx.beginPath();
      data.forEach((v,i)=>{ const x=i*step, y=h-(v/100)*(h-8)-4; i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
      ctx.strokeStyle = colors[key]; ctx.lineWidth = 2; ctx.stroke();
      ctx.lineTo((data.length-1)*step, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = colors[key] + '22'; ctx.fill();
    }
    function tick(){
      const openCount = Object.keys(openWindows).length;
      const vals = {
        cpu: Math.min(96, 8 + openCount*7 + Math.random()*18),
        mem: Math.min(92, 26 + openCount*5 + Math.random()*8),
        net: Math.random()*70,
      };
      Object.keys(series).forEach(k=>{
        series[k].push(vals[k]); if(series[k].length > 60) series[k].shift();
        const c = wrap.querySelector(`[data-metric="${k}"]`); if(c) draw(c, k);
        const v = wrap.querySelector(`[data-val="${k}"]`);
        if(v) v.textContent = k === 'net' ? Math.round(vals[k]*14) + ' ko/s' : Math.round(vals[k]) + '%';
      });
      // les processus reflètent les fenêtres réellement ouvertes
      const body = wrap.querySelector('.sm-proc-body');
      const rows = [['1','systemd','0.1','2.4'],['412','gnome-shell','3.8','9.1'],['517','orace-wm','1.2','4.0']];
      Object.keys(openWindows).forEach((id,i)=> rows.push([String(1200+i*37), (APP_NAMES[id]||id).toLowerCase().replace(/\s+/g,'-'), (1+Math.random()*6).toFixed(1), (2+Math.random()*9).toFixed(1)]));
      body.innerHTML = rows.map(r=>`<div class="sm-proc-row"><span>${r[0]}</span><span>${escapeHtml(r[1])}</span><span>${r[2]}%</span><span>${r[3]}%</span></div>`).join('');
      if(statusEl) statusEl.textContent = `${rows.length} processus — charge ${Math.round(vals.cpu)}%`;
    }
    tick();
    ownTimer('sysmon', setInterval(tick, 1000));
    return wrap;
  }

  /* ---- Calculatrice (analyseur maison, pas d'eval) ---- */
  function evalExpression(src){
    const tokens = src.match(/\d+\.?\d*|[+\-*/()%]/g);
    if(!tokens) throw new Error('vide');
    let i = 0;
    const peek = ()=> tokens[i];
    function parseExpr(){
      let v = parseTerm();
      while(peek() === '+' || peek() === '-'){ const op = tokens[i++]; const r = parseTerm(); v = op === '+' ? v + r : v - r; }
      return v;
    }
    function parseTerm(){
      let v = parseFactor();
      while(peek() === '*' || peek() === '/' || peek() === '%'){
        const op = tokens[i++]; const r = parseFactor();
        if((op === '/' || op === '%') && r === 0) throw new Error('division par zéro');
        v = op === '*' ? v * r : op === '/' ? v / r : v % r;
      }
      return v;
    }
    function parseFactor(){
      if(peek() === '-'){ i++; return -parseFactor(); }
      if(peek() === '('){ i++; const v = parseExpr(); if(tokens[i] !== ')') throw new Error('parenthèse'); i++; return v; }
      const t = tokens[i++];
      const n = parseFloat(t);
      if(isNaN(n)) throw new Error('jeton ' + t);
      return n;
    }
    const out = parseExpr();
    if(i !== tokens.length) throw new Error('expression invalide');
    return out;
  }

  function buildCalcApp(statusEl){
    const wrap = el('div','calc');
    const keys = ['C','(',')','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','%','='];
    wrap.innerHTML = `<div class="calc-screen"><div class="calc-expr"></div><div class="calc-res">0</div></div>
      <div class="calc-pad">${keys.map(k=>`<button class="calc-key${'=' === k ? ' eq' : ''}${/[+\-*/%()C]/.test(k) && k.length===1 ? ' op' : ''}" data-k="${k}">${k}</button>`).join('')}</div>`;
    const exprEl = wrap.querySelector('.calc-expr'), resEl = wrap.querySelector('.calc-res');
    let expr = '';
    function refresh(){ exprEl.textContent = expr || ' '; }
    function press(k){
      sfx('tick');
      if(k === 'C'){ expr = ''; resEl.textContent = '0'; if(statusEl) statusEl.textContent = 'Prêt'; return refresh(); }
      if(k === '='){
        try{
          const v = evalExpression(expr);
          resEl.textContent = Number.isInteger(v) ? v : parseFloat(v.toFixed(8));
          if(statusEl) statusEl.textContent = 'Calcul effectué';
        }catch(err){
          resEl.textContent = 'Erreur'; sfx('error');
          if(statusEl) statusEl.textContent = 'Erreur : ' + err.message;
        }
        return;
      }
      expr += k; refresh();
    }
    wrap.querySelectorAll('.calc-key').forEach(btn=>{
      btn.addEventListener('click', ()=> press(btn.dataset.k));
    });
    refresh();
    return wrap;
  }

  /* ---- Éditeur de texte ---- */
  const TEXT_FILES = {
    'a-propos.txt': BIO,
    'notes.md': "# Notes\n\n- Orace OS est un prototype front-end sans framework.\n- Chaque application est une simple fonction build*().\n- Le gestionnaire de fenêtres tient en ~150 lignes.",
    'contact.txt': `Email : ${SITE.email}\nTéléphone : ${SITE.phone}\nLinkedIn : ${SITE.linkedin}`,
  };
  function buildTextEdApp(statusEl){
    const wrap = el('div','texted');
    wrap.innerHTML = `<div class="te-side">${Object.keys(TEXT_FILES).map((f,i)=>`<button class="te-file${i?'':' active'}" data-f="${f}">${f}</button>`).join('')}</div>
      <div class="te-main"><textarea class="te-area" spellcheck="false"></textarea></div>`;
    const area = wrap.querySelector('.te-area');
    let current = Object.keys(TEXT_FILES)[0];
    function load(f){
      current = f; area.value = TEXT_FILES[f];
      wrap.querySelectorAll('.te-file').forEach(b=> b.classList.toggle('active', b.dataset.f === f));
      if(statusEl) statusEl.textContent = `${f} — ${TEXT_FILES[f].length} caractères`;
    }
    wrap.querySelectorAll('.te-file').forEach(b=> b.addEventListener('click', ()=>{ sfx('tick'); load(b.dataset.f); }));
    area.addEventListener('input', ()=>{
      TEXT_FILES[current] = area.value;                        // édition en mémoire
      if(statusEl) statusEl.textContent = `${current} — modifié (${area.value.length} caractères)`;
    });
    area.addEventListener('keydown', ()=> sfx('key'));
    load(current);
    return wrap;
  }

  /* ---- Horloges ---- */
  function buildClocksApp(statusEl){
    const wrap = el('div','clocks');
    const zones = [['Cotonou','Africa/Porto-Novo'],['Paris','Europe/Paris'],['New York','America/New_York'],['Tokyo','Asia/Tokyo']];
    wrap.innerHTML = `<div class="cl-zones">${zones.map(z=>`<div class="cl-zone"><div class="cl-city">${z[0]}</div><div class="cl-time" data-tz="${z[1]}">--:--</div></div>`).join('')}</div>
      <div class="cl-tools">
        <div class="cl-tool"><div class="cl-label">Chronomètre</div><div class="cl-chrono">00:00.0</div>
          <div class="cl-btns"><button class="cl-btn" data-a="start">Démarrer</button><button class="cl-btn" data-a="reset">Remettre à zéro</button></div></div>
      </div>`;
    function refreshZones(){
      wrap.querySelectorAll('[data-tz]').forEach(elx=>{
        try{ elx.textContent = new Date().toLocaleTimeString('fr-FR',{timeZone:elx.dataset.tz,hour:'2-digit',minute:'2-digit'}); }
        catch(e){ elx.textContent = '--:--'; }
      });
    }
    refreshZones();
    ownTimer('clocks', setInterval(refreshZones, 10000));

    let chronoMs = 0, chronoOn = false, chronoTimer = null;
    const chronoEl = wrap.querySelector('.cl-chrono');
    function renderChrono(){
      const m = Math.floor(chronoMs/60000), sec = Math.floor(chronoMs%60000/1000), d = Math.floor(chronoMs%1000/100);
      chronoEl.textContent = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${d}`;
    }
    wrap.querySelectorAll('.cl-btn').forEach(btn=> btn.addEventListener('click', ()=>{
      sfx('tick');
      if(btn.dataset.a === 'start'){
        chronoOn = !chronoOn;
        btn.textContent = chronoOn ? 'Pause' : 'Démarrer';
        if(chronoOn){ chronoTimer = setInterval(()=>{ chronoMs += 100; renderChrono(); }, 100); ownTimer('clocks', chronoTimer); }
        else clearInterval(chronoTimer);
        if(statusEl) statusEl.textContent = chronoOn ? 'Chronomètre en cours' : 'Chronomètre en pause';
      } else {
        clearInterval(chronoTimer); chronoOn = false; chronoMs = 0; renderChrono();
        wrap.querySelector('[data-a="start"]').textContent = 'Démarrer';
        if(statusEl) statusEl.textContent = '4 fuseaux';
      }
    }));
    renderChrono();
    return wrap;
  }

  /* ---- Logiciels (installation simulée) ---- */
  const SOFTWARE = [
    {id:'gimp', name:'GIMP', desc:"Retouche d'images", size:'92 Mo'},
    {id:'inkscape', name:'Inkscape', desc:'Dessin vectoriel', size:'78 Mo'},
    {id:'wireshark', name:'Wireshark', desc:'Analyse réseau', size:'54 Mo'},
    {id:'blender', name:'Blender', desc:'Modélisation 3D', size:'310 Mo'},
    {id:'obs', name:'OBS Studio', desc:"Capture et diffusion", size:'120 Mo'},
    {id:'postgres', name:'PostgreSQL', desc:'Base de données', size:'46 Mo'},
  ];
  const installed = {};
  function buildSoftwareApp(statusEl){
    const wrap = el('div','sw-grid');
    SOFTWARE.forEach(a=>{
      const card = el('div','sw-card');
      card.innerHTML = `<div class="sw-top"><div class="sw-name">${a.name}</div><div class="sw-size">${a.size}</div></div>
        <div class="sw-desc">${a.desc}</div>
        <div class="sw-bar"><span></span></div>
        <button class="sw-btn">${installed[a.id] ? 'Installé' : 'Installer'}</button>`;
      const btn = card.querySelector('.sw-btn'), bar = card.querySelector('.sw-bar span');
      if(installed[a.id]){ btn.disabled = true; bar.style.width = '100%'; }
      btn.addEventListener('click', ()=>{
        if(btn.disabled) return;
        sfx('tick'); btn.disabled = true; btn.textContent = 'Installation…';
        let pct = 0;
        const t = setInterval(()=>{
          pct += 4 + Math.random()*9;
          bar.style.width = Math.min(100, pct) + '%';
          if(statusEl) statusEl.textContent = `Installation de ${a.name} — ${Math.min(100,Math.round(pct))}%`;
          if(pct >= 100){
            clearInterval(t); installed[a.id] = true;
            btn.textContent = 'Installé';
            if(statusEl) statusEl.textContent = 'Dépôts à jour';
            notify('Installation terminée', `${a.name} est prêt à être utilisé.`, 'software');
          }
        }, 180);
        ownTimer('software', t);
      });
      wrap.appendChild(card);
    });
    return wrap;
  }

  /* ---- Journaux (alimentés par la session réelle) ---- */
  const sysLog = [];
  function logLine(unit, msg){
    const t = new Date().toLocaleTimeString('fr-FR',{hour12:false});
    sysLog.push({t, unit, msg});
    if(sysLog.length > 300) sysLog.shift();
    document.querySelectorAll('.logs-body').forEach(bodyEl=>{
      const d = el('div','log-row', `<span class="log-t">${t}</span><span class="log-u">${escapeHtml(unit)}</span><span class="log-m">${escapeHtml(msg)}</span>`);
      bodyEl.appendChild(d); bodyEl.scrollTop = bodyEl.scrollHeight;
    });
  }
  function buildLogsApp(statusEl){
    const wrap = el('div','logs');
    wrap.innerHTML = `<div class="logs-head">journalctl -f — orace@kali</div><div class="logs-body"></div>`;
    const body = wrap.querySelector('.logs-body');
    sysLog.forEach(l=> body.appendChild(el('div','log-row', `<span class="log-t">${l.t}</span><span class="log-u">${escapeHtml(l.unit)}</span><span class="log-m">${escapeHtml(l.msg)}</span>`)));
    body.scrollTop = body.scrollHeight;
    if(statusEl) statusEl.textContent = `${sysLog.length} entrées`;
    ownTimer('logs', setInterval(()=>{
      const noise = [['kernel','tâche planifiée exécutée'],['NetworkManager','liaison wlan0 stable'],['systemd','unité orace-session.service active'],['cron','rotation des journaux']];
      const n = noise[Math.floor(Math.random()*noise.length)];
      logLine(n[0], n[1]);
      if(statusEl) statusEl.textContent = `${sysLog.length} entrées`;
    }, 4000));
    return wrap;
  }


  /* ---- Vitrines : présentes pour l'illusion système, sans logique métier ---- */

  function buildDisksApp(statusEl){
    const parts = [
      {n:'/dev/nvme0n1p1', mnt:'/boot/efi', used:12, size:'512 Mo', fs:'vfat'},
      {n:'/dev/nvme0n1p2', mnt:'/', used:64, size:'420 Go', fs:'ext4'},
      {n:'/dev/nvme0n1p3', mnt:'/home', used:38, size:'512 Go', fs:'ext4'},
    ];
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h','Disques'));
    wrap.appendChild(el('div','app-sub','SAMSUNG MZVL21T0 — 1,0 To'));
    parts.forEach(p2=>{
      wrap.appendChild(el('div','disk-row',
        `<div class="disk-top"><span class="disk-name">${p2.n}</span><span class="chip">${p2.fs}</span><span class="disk-mnt">${p2.mnt}</span></div>
         <div class="disk-bar"><span style="width:${p2.used}%"></span></div>
         <div class="disk-meta">${p2.used}% utilisés sur ${p2.size}</div>`));
    });
    if(statusEl) statusEl.textContent = '1 disque, 3 partitions';
    return wrap;
  }

  function buildArchivesApp(statusEl){
    const rows = [
      ['orace-os.html','HTML','12,1 ko'],['orace-os.css','CSS','38,4 ko'],['orace-os.js','JavaScript','72,9 ko'],
      ['kali.jpg','Image JPEG','476 ko'],['README.md','Markdown','0,4 ko'],
    ];
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h','archive.tar.gz'));
    wrap.appendChild(el('div','app-sub','5 éléments — 600 ko compressés'));
    const table = el('div','ar-table',
      '<div class="ar-head"><span>Nom</span><span>Type</span><span>Taille</span></div>' +
      rows.map(r=>`<div class="ar-row"><span>${r[0]}</span><span>${r[1]}</span><span>${r[2]}</span></div>`).join(''));
    wrap.appendChild(table);
    if(statusEl) statusEl.textContent = 'archive.tar.gz';
    return wrap;
  }

  function buildImgViewApp(statusEl){
    const wrap = el('div','imgview');
    wrap.innerHTML = `<div class="iv-stage"><img src="../kali.jpg" alt="Fond d'écran du bureau"></div>
      <div class="iv-bar"><span>kali.jpg</span><span>1920 × 1080</span></div>`;
    if(statusEl) statusEl.textContent = '1 image — kali.jpg';
    return wrap;
  }

  function buildCharsApp(statusEl){
    const sets = ['→','←','↑','↓','⇥','⌘','⌥','⇧','✓','✗','★','☆','●','○','◆','■','λ','π','Σ','∞','≈','≠','≤','≥','µ','Ω','€','£','¥','©','®','™','§','¶','†','‡'];
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h','Table de caractères'));
    wrap.appendChild(el('div','app-sub','Cliquez un caractère pour le copier'));
    const grid = el('div','chars-grid');
    sets.forEach(c=>{
      const b = el('button','char-cell', c);
      b.addEventListener('click', ()=>{
        sfx('tick');
        if(navigator.clipboard) navigator.clipboard.writeText(c).catch(()=>{});
        if(statusEl) statusEl.textContent = `Copié : ${c}  (U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')})`;
      });
      grid.appendChild(b);
    });
    wrap.appendChild(grid);
    if(statusEl) statusEl.textContent = 'Unicode';
    return wrap;
  }

  function buildAgendaApp(statusEl){
    const now = new Date();
    const y = now.getFullYear(), mo = now.getMonth();
    const first = new Date(y, mo, 1);
    const startCol = (first.getDay() + 6) % 7;             // semaine commençant le lundi
    const days = new Date(y, mo+1, 0).getDate();
    const wrap = el('div','app-pad');
    wrap.appendChild(el('div','app-h', MONTHS_FULL[mo] + ' ' + y));
    wrap.appendChild(el('div','app-sub','Aujourd’hui : ' + now.toLocaleDateString('fr-FR',{weekday:'long', day:'numeric', month:'long'})));
    let cells = ['L','M','M','J','V','S','D'].map(d=>`<span class="ag-dow">${d}</span>`).join('');
    for(let i=0;i<startCol;i++) cells += '<span class="ag-cell empty"></span>';
    for(let d=1;d<=days;d++) cells += `<span class="ag-cell${d===now.getDate()?' today':''}">${d}</span>`;
    wrap.appendChild(el('div','ag-grid', cells));
    if(statusEl) statusEl.textContent = 'Mois courant';
    return wrap;
  }

  function buildMapsApp(statusEl){
    const wrap = el('div','maps-app');
    wrap.innerHTML = `
      <svg class="maps-canvas" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="260" fill="#16302a"/>
        <path d="M0 190 Q120 170 210 196 T400 186 L400 260 L0 260Z" fill="#123a5c"/>
        <g stroke="#2c5e4e" stroke-width="2" fill="none">
          <path d="M40 0v260M120 0v260M210 0v260M300 0v260M0 60h400M0 120h400"/>
        </g>
        <g stroke="#d8b25e" stroke-width="3" fill="none"><path d="M0 92h400M210 0v190"/></g>
        <circle cx="210" cy="150" r="9" fill="#E8447F"/><circle cx="210" cy="150" r="18" fill="#E8447F" opacity=".25"/>
      </svg>
      <div class="maps-card"><div class="maps-title">Cotonou, Bénin</div><div class="maps-sub">6°22′ N, 2°26′ E — GMT+1</div></div>`;
    if(statusEl) statusEl.textContent = 'Cotonou, Bénin';
    return wrap;
  }

  /* ============================================================
     SOCLE SYSTÈME — persistance, luminosité, son, notifications
     ============================================================ */


  /* ---------------- Luminosité ---------------- */
  const dimEl = document.getElementById('screen-dim');
  let brightness = store.get('brightness', 100);
  function applyBrightness(v){
    brightness = Math.max(20, Math.min(100, v));
    // 100% => aucun voile ; 20% => voile à 0.6 (jamais totalement noir)
    dimEl.style.opacity = ((100 - brightness) / 100 * 0.75).toFixed(3);
    // bureau et volet Orace Phone partagent le même réglage : on synchronise les deux curseurs
    document.querySelectorAll('#bright-slider, #ph-bright-slider').forEach(s=>{ if(+s.value !== brightness) s.value = brightness; });
    const l = document.getElementById('brightLabel');
    if(l) l.textContent = brightness + '%';
    store.set('brightness', brightness);
  }

  /* ---------------- Son (Web Audio, synthèse) ---------------- */
  // Un AudioContext ne démarre qu'après un geste utilisateur : on le crée
  // paresseusement au premier appel déclenché par une interaction.
  const audio = {
    ctx: null, master: null,
    enabled: store.get('sound', true),
    volume: store.get('volume', 70),
    init(){
      if(this.ctx) return this.ctx;
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      try{
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.gain();
        this.master.connect(this.ctx.destination);
      }catch(e){ this.ctx = null; }
      return this.ctx;
    },
    gain(){ return this.enabled ? (this.volume / 100) * 0.28 : 0; },
    sync(){ if(this.master) this.master.gain.value = this.gain(); },
    // enveloppe courte : attaque immédiate, extinction exponentielle
    blip(freq, dur, type, slideTo, delay){
      if(!this.enabled) return;
      const ctx = this.init(); if(!ctx || ctx.state === 'suspended') { if(ctx) ctx.resume().catch(()=>{}); }
      if(!ctx) return;
      const t0 = ctx.currentTime + (delay || 0);
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, t0);
      if(slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(1, t0 + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g); g.connect(this.master);
      osc.start(t0); osc.stop(t0 + dur + 0.02);
    }
  };

  function sfx(name){
    if(!audio.enabled) return;
    switch(name){
      case 'tick':   audio.blip(1500, 0.035, 'square'); break;
      case 'key':    audio.blip(880 + Math.random()*180, 0.028, 'square'); break;
      case 'open':   audio.blip(420, 0.13, 'sine', 880); break;
      case 'close':  audio.blip(760, 0.12, 'sine', 320); break;
      case 'minimize': audio.blip(620, 0.10, 'sine', 260); break;
      case 'toggle': audio.blip(1150, 0.05, 'triangle'); break;
      case 'error':  audio.blip(220, 0.18, 'sawtooth', 150); break;
      case 'notify': audio.blip(880, 0.09, 'sine'); audio.blip(1320, 0.12, 'sine', null, 0.09); break;
      case 'chime':  [523.25, 659.25, 783.99, 1046.5].forEach((f,i)=> audio.blip(f, 0.32, 'sine', null, i*0.11)); break;
    }
  }

  /* ---------------- Notifications ---------------- */
  const notifStack = document.getElementById('notif-stack');
  const notifList = document.getElementById('notif-list');
  const notifEmpty = document.getElementById('notif-empty');
  const notifHistory = [];

  function dndOn(){
    const row = document.getElementById('qs-dnd');
    return !!(row && row.classList.contains('on'));
  }
  // synchronise le toggle DND du bureau et celui du volet Orace Phone
  function setDND(on){
    document.querySelectorAll('#qs-dnd, #ph-tg-dnd').forEach(t=> t.classList.toggle('on', on));
  }

  function notify(title, body, appId){
    const time = new Date().toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
    notifHistory.unshift({title, body, time, appId});
    renderNotifHistory();
    if(dndOn()) return;                      // consigné mais pas affiché
    sfx('notify');
    const t = el('div','notif');
    t.innerHTML = `<span class="notif-icon">${(appId && APP_ICONS_FLAT[appId]) || ICONS.meta}</span>`
                + `<div class="notif-body"><div class="notif-title">${escapeHtml(title)}</div>`
                + `<div class="notif-text">${escapeHtml(body)}</div></div>`
                + `<span class="notif-time">${time}</span>`;
    notifStack.appendChild(t);
    requestAnimationFrame(()=> t.classList.add('in'));
    const kill = ()=>{ t.classList.remove('in'); setTimeout(()=> t.remove(), 260); };
    t.addEventListener('click', kill);
    setTimeout(kill, 5000);
  }

  function renderNotifHistory(){
    if(!notifList) return;
    notifList.innerHTML = '';
    notifEmpty.hidden = notifHistory.length > 0;
    notifHistory.slice(0, 20).forEach(n=>{
      const r = el('div','notif-hist');
      r.innerHTML = `<span class="notif-icon">${(n.appId && APP_ICONS_FLAT[n.appId]) || ICONS.meta}</span>`
                  + `<div class="notif-body"><div class="notif-title">${escapeHtml(n.title)}</div>`
                  + `<div class="notif-text">${escapeHtml(n.body)}</div></div>`
                  + `<span class="notif-time">${n.time}</span>`;
      notifList.appendChild(r);
    });
  }

  // Centre de notifications : clic sur l'horloge, comme sous GNOME
  const notifCenter = document.getElementById('notif-center');
  const clockBtn = document.getElementById('topbar-clock');
  clockBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    notifCenter.hidden = !notifCenter.hidden;
    if(!notifCenter.hidden){ renderNotifHistory(); sfx('tick'); }
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('#notif-center') && !e.target.closest('#topbar-clock')) notifCenter.hidden = true;
  });
  document.getElementById('notif-clear').addEventListener('click', ()=>{
    notifHistory.length = 0; renderNotifHistory(); sfx('tick');
  });

  /* ---------------- Câblage des réglages ---------------- */
  const brightSlider = document.getElementById('bright-slider');
  brightSlider.addEventListener('input', ()=>{
    applyBrightness(+brightSlider.value);
    logLine('backlight', `luminosité à ${brightness}%`);
  });

  // restaure l'état enregistré du volume dans l'interface (bureau + volet Orace Phone)
  document.querySelectorAll('#vol-slider, #ph-vol-slider').forEach(s=> s.value = audio.volume);
  volLabel.textContent = audio.volume + '%';

  const soundToggle = document.getElementById('qs-sound');
  // synchronise le bureau et le volet Orace Phone (#ph-tg-sound) sur un seul état
  function setSoundEnabled(on){
    audio.enabled = on;
    store.set('sound', on);
    audio.sync();
    document.querySelectorAll('#qs-sound, #ph-tg-sound').forEach(t=> t.classList.toggle('on', on));
    if(on) sfx('toggle');
  }
  if(audio.enabled) soundToggle.classList.add('on');
  soundToggle.addEventListener('click', ()=> setSoundEnabled(!audio.enabled));

  applyBrightness(brightness);

  // Amorce du journal, puis alimentation par les événements réels de la session
  ['Linux orace-kali 6.8.0 x86_64','systemd: démarrage de la session utilisateur',
   'NetworkManager: wlan0 connecté','orace-session: bureau prêt'].forEach((m,i)=>
    sysLog.push({t:new Date(Date.now()-(4-i)*1000).toLocaleTimeString('fr-FR',{hour12:false}), unit:'systemd', msg:m}));

  // Quelques notifications réelles, pour que la brique serve vraiment
  setTimeout(()=> notify('Bienvenue sur Orace OS',
    'Cliquez une icône du dock pour explorer le portfolio.', 'meta'), 1800);


  /* ============================================================
     COMPORTEMENTS DE FENÊTRES — bureaux, Alt+Tab, batterie
     ============================================================ */

  /* ---- Bureaux virtuels ---- */
  function switchWorkspace(n){
    if(n === currentWs) return;
    currentWs = n;
    document.querySelectorAll('#workspaces span').forEach((sp,i)=> sp.classList.toggle('active', i+1 === n));
    // on masque les fenêtres des autres bureaux sans toucher à leur état "réduit"
    Object.values(openWindows).forEach(w=> w.el.classList.toggle('other-ws', w.ws !== n));
    const here = Object.values(openWindows).filter(w=> w.ws === n && !w.minimized);
    setFocusedAppLabel(here.length ? here[here.length-1].appId : null);
    setActiveDockIcon(here.length ? here[here.length-1].appId : null);
    sfx('tick');
    logLine('orace-wm', `bureau ${n} activé`);
  }
  document.querySelectorAll('#workspaces span').forEach((sp,i)=>{
    sp.style.cursor = 'pointer';
    sp.setAttribute('role','button');
    sp.setAttribute('aria-label', `Bureau ${i+1}`);
    sp.addEventListener('click', ()=> switchWorkspace(i+1));
  });

  /* ---- Alt+Tab ---- */
  const switcher = document.getElementById('switcher');
  let switcherIdx = 0, switcherOpen = false;
  function switcherList(){ return Object.values(openWindows).filter(w=> w.ws === currentWs); }
  function renderSwitcher(){
    const list = switcherList();
    switcher.innerHTML = list.map((w,i)=>
      `<div class="sw-item${i===switcherIdx?' sel':''}"><span class="sw-ico">${APP_ICONS_FLAT[w.appId]||ICONS[w.appId]||''}</span><span>${APP_NAMES[w.appId]}</span></div>`
    ).join('');
    switcher.hidden = false; switcherOpen = true;
  }
  function closeSwitcher(commit){
    if(!switcherOpen) return;
    switcher.hidden = true; switcherOpen = false;
    const list = switcherList();
    if(commit && list[switcherIdx]) restoreAndFocus(list[switcherIdx].appId);
  }
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Tab' && e.altKey){
      const list = switcherList();
      if(!list.length) return;
      e.preventDefault();
      switcherIdx = switcherOpen ? (switcherIdx + (e.shiftKey ? -1 : 1) + list.length) % list.length
                                 : (list.length > 1 ? 1 : 0);
      renderSwitcher(); sfx('tick');
    }
    // Super+1..4 : changement de bureau
    if((e.metaKey || e.ctrlKey) && ['1','2','3','4'].includes(e.key)){
      e.preventDefault(); switchWorkspace(+e.key);
    }
  });
  document.addEventListener('keyup', (e)=>{ if(e.key === 'Alt') closeSwitcher(true); });

  /* ---- Batterie ---- */
  let battery = store.get('battery', 87);
  let lowNotified = false;
  function renderBattery(){
    const pct = Math.round(battery) + '%';
    document.querySelectorAll('.battery-pct').forEach(elx=> elx.textContent = pct);
    store.set('battery', battery);
  }
  renderBattery();
  setInterval(()=>{
    battery = Math.max(4, battery - 0.35);
    renderBattery();
    if(battery <= 20 && !lowNotified){
      lowNotified = true;
      notify('Batterie faible', `Il reste ${Math.round(battery)} % — branchez l'alimentation.`, 'meta');
      logLine('upower', `batterie faible : ${Math.round(battery)}%`);
    }
  }, 45000);


  /* ---- Menu contextuel du bureau ---- */
  const ctxMenu = document.getElementById('desktop-ctx');
  function hideCtx(){ ctxMenu.hidden = true; }
  document.getElementById('wallpaper').addEventListener('contextmenu', (e)=>{
    e.preventDefault();
    ctxMenu.style.left = Math.min(cx(e), vw() - 240) + 'px';
    ctxMenu.style.top  = Math.min(cy(e), vh() - 180) + 'px';
    ctxMenu.hidden = false;
    sfx('tick');
  });
  document.addEventListener('click', (e)=>{ if(!e.target.closest('#desktop-ctx')) hideCtx(); });
  ctxMenu.querySelectorAll('[data-ctx]').forEach(item=> item.addEventListener('click', ()=>{
    const a = item.dataset.ctx;
    hideCtx();
    if(a === 'wallpaper') openApp('meta');
    else if(a === 'terminal') openApp('terminal');
    else if(a === 'sysmon') openApp('sysmon');
    else if(a === 'apps') openOverview();
  }));


  /* ============================================================
     ORACE PHONE — interface native mobile (< 768px), habillage Android / One UI
     Reutilise les memes donnees et le meme rendu d'application que le
     bureau (APP_NAMES, APP_ICONS_FLAT, renderApp, overview partagé) ; seule
     la coque change. Quatre icônes génériques (calendrier, horloge, appel,
     messages) sont ajoutées pour donner un aspect « appli système Android »
     aux emplacements qui réutilisent une destination déjà présente ailleurs.
     ============================================================ */
  const PHONE_BREAKPOINT = 768;
  function isPhoneMode(){ return window.innerWidth < PHONE_BREAKPOINT; }

  // deux glyphes distincts pour le dock, qui réutilise des destinations déjà
  // présentes dans la grille (Contact, Fichiers) sous une autre étiquette :
  // sans ça, ces cases afficheraient deux fois la même icône que sur la grille.
  const ANDROID_ICONS = {
    phonecall: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="7" fill="#123D2E"/><path d="M11 8c-2 0-3 1.2-3 3.2 0 7 6.8 13.8 13.8 13.8 2 0 3.2-1 3.2-3v-2.3l-4.6-1.9-1.7 1.7a9.4 9.4 0 0 1-5-5l1.7-1.7L13.6 8Z" fill="#3DDC97"/></svg>`,
    messages: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="7" fill="#0F2A44"/><path d="M7 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-8l-5 4v-4h-2a3 3 0 0 1-3-3Z" fill="#4FC1FF"/></svg>`,
  };

  const phoneShell    = document.getElementById('phone-shell');
  const phoneDock     = document.getElementById('ph-dock');
  const phoneAppview  = document.getElementById('ph-appview');
  const pwIcon        = document.getElementById('pw-icon');
  const pwUpdated     = document.getElementById('pw-updated');
  const pwRefresh     = document.getElementById('pw-refresh');
  const phSearchPill  = document.getElementById('ph-search-pill');
  const phNavRecents  = document.getElementById('ph-nav-recents');
  const phNavHome     = document.getElementById('ph-nav-home');
  const phNavBack     = document.getElementById('ph-nav-back');
  let currentPhoneApp = null;

  /* ---- écran d'accueil paginé : les 22 applications, réparties sur plusieurs
     pages (4 colonnes × 2 rangées, comme un vrai écran Android), balayables
     horizontalement — au lieu d'une poignée d'icônes géantes sur une seule page. */
  const PH_PAGE_SIZE = 8;
  const phPages      = document.getElementById('ph-pages');
  const phPagesTrack = document.getElementById('ph-pages-track');
  const phDots       = document.getElementById('ph-dots');
  let phPageCount = 1, phCurrentPage = 0;

  function buildPhonePages(){
    phPagesTrack.innerHTML = '';
    phDots.innerHTML = '';
    const chunks = [];
    for(let i=0;i<OV_APPS.length;i+=PH_PAGE_SIZE) chunks.push(OV_APPS.slice(i, i+PH_PAGE_SIZE));
    phPageCount = chunks.length;
    chunks.forEach((chunk, pageIdx)=>{
      const page = el('div','ph-page');
      chunk.forEach(appId=>{
        const btn = el('button','ph-app');
        btn.dataset.app = appId;
        btn.type = 'button';
        btn.innerHTML = `<span class="glyph">${APP_ICONS_FLAT[appId === 'meta' ? 'settings' : appId] || ICONS[appId] || ''}</span><span>${APP_NAMES[appId]}</span>`;
        btn.addEventListener('click', ()=> openPhoneApp(appId));
        page.appendChild(btn);
      });
      phPagesTrack.appendChild(page);
      const dot = el('span', pageIdx === 0 ? 'dot on' : 'dot');
      dot.dataset.page = pageIdx;
      phDots.appendChild(dot);
    });
    gotoPhonePage(0);
  }

  function gotoPhonePage(idx){
    phCurrentPage = Math.max(0, Math.min(phPageCount - 1, idx));
    phPagesTrack.style.transform = `translateX(${-phCurrentPage * 100}%)`;
    [...phDots.children].forEach((d,i)=> d.classList.toggle('on', i === phCurrentPage));
  }
  buildPhonePages();

  phDots.addEventListener('click', (e)=>{
    const dot = e.target.closest('.dot');
    if(dot) gotoPhonePage(Number(dot.dataset.page));
  });

  // balayage horizontal (Pointer Events : tactile et souris) pour changer de page
  let phDragX0 = null, phDragDx = 0, phDragging = false;
  phPages.addEventListener('pointerdown', (e)=>{
    phDragX0 = e.clientX; phDragDx = 0; phDragging = true;
    phPagesTrack.classList.add('dragging');
    phPages.setPointerCapture(e.pointerId);
  });
  phPages.addEventListener('pointermove', (e)=>{
    if(!phDragging) return;
    phDragDx = e.clientX - phDragX0;
    const pct = (phDragDx / phPages.clientWidth) * 100;
    phPagesTrack.style.transform = `translateX(${-phCurrentPage * 100 + pct}%)`;
  });
  function phEndDrag(){
    if(!phDragging) return;
    phDragging = false;
    phPagesTrack.classList.remove('dragging');
    const threshold = phPages.clientWidth * 0.18;
    if(phDragDx < -threshold && phCurrentPage < phPageCount - 1) gotoPhonePage(phCurrentPage + 1);
    else if(phDragDx > threshold && phCurrentPage > 0) gotoPhonePage(phCurrentPage - 1);
    else gotoPhonePage(phCurrentPage);
  }
  phPages.addEventListener('pointerup', phEndDrag);
  phPages.addEventListener('pointercancel', phEndDrag);

  // dock : 4 icônes façon Android (Téléphone / Messages / Terminal / Appareil photo)
  const PHONE_DOCK_APPS = [
    ['contact', 'Appel',    ANDROID_ICONS.phonecall],
    ['files',   'Projets',  ANDROID_ICONS.messages],
    ['terminal','Terminal', null],
    ['imgview', 'Photos',   null],
  ];
  PHONE_DOCK_APPS.forEach(([appId,label,icon])=>{
    const btn = el('button','ph-dock-btn');
    btn.dataset.app = appId;
    btn.type = 'button';
    btn.setAttribute('aria-label', label);
    btn.innerHTML = icon || APP_ICONS_FLAT[appId] || ICONS[appId] || '';
    btn.addEventListener('click', ()=> openPhoneApp(appId));
    phoneDock.appendChild(btn);
  });

  function openPhoneApp(appId){
    sfx('tick');
    phoneAppview.querySelector('.ph-appview-icon').innerHTML = APP_ICONS_FLAT[appId] || ICONS[appId] || '';
    phoneAppview.querySelector('.ph-appview-title').textContent = APP_NAMES[appId];
    const statusEl = phoneAppview.querySelector('.ph-appview-status');
    statusEl.textContent = STATUS_DEFAULT[appId] || '';
    const bodyEl = phoneAppview.querySelector('.ph-appview-body');
    bodyEl.innerHTML = '';
    // renderApp() attend un conteneur exposant .ws-text via querySelector : on lui fournit le notre
    const fauxWin = { querySelector: (sel)=> sel === '.ws-text' ? statusEl : null };
    bodyEl.appendChild(renderApp(appId, fauxWin));
    currentPhoneApp = appId;
    phoneAppview.hidden = false;
    requestAnimationFrame(()=> phoneAppview.classList.add('show'));
    sfx('open');
    logLine('orace-phone', `application ouverte : ${APP_NAMES[appId]}`);
  }

  function closePhoneApp(){
    if(!currentPhoneApp) return;
    sfx('close');
    logLine('orace-phone', `application fermee : ${APP_NAMES[currentPhoneApp]}`);
    clearTimers(currentPhoneApp);
    phoneAppview.classList.remove('show');
    currentPhoneApp = null;
    setTimeout(()=>{
      if(currentPhoneApp) return;              // une autre app a ete rouverte entre-temps
      phoneAppview.hidden = true;
      phoneAppview.querySelector('.ph-appview-body').innerHTML = '';
    }, 340);
  }

  // barre de navigation Android : Accueil et Retour ramènent tous deux à
  // l'écran d'accueil (pas de pile de navigation interne aux applications
  // simulées), Récents ouvre le même tiroir que la pilule de recherche.
  phNavHome.addEventListener('click', closePhoneApp);
  phNavBack.addEventListener('click', closePhoneApp);
  phNavRecents.addEventListener('click', openOverview);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && currentPhoneApp) closePhoneApp(); });

  // pilule de recherche : ouvre le tiroir d'applications partagé
  phSearchPill.addEventListener('click', openOverview);

  // widget météo : valeur représentative (pas d'appel API), seul l'horodatage est réel
  function stampWeather(){ pwUpdated.textContent = 'maj ' + new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); }
  pwIcon.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="20" cy="11" r="6" fill="#FFC94D"/><path d="M24 25H10a5.5 5.5 0 0 1-.6-10.97A7 7 0 0 1 22.6 11 6 6 0 0 1 24 25Z" fill="#fff"/></svg>`;
  stampWeather();
  pwRefresh.addEventListener('click', ()=>{
    sfx('tick');
    pwRefresh.classList.remove('spin'); void pwRefresh.offsetWidth; pwRefresh.classList.add('spin');
    stampWeather();
  });

  /* ---- volet de réglages rapides : glisser vers le bas depuis la barre d'état
     (ou taper dessus). Réutilise le même état système que le panneau du bureau
     (luminosité, son, ne pas déranger, thème) via les fonctions partagées
     définies plus haut ; Wi-Fi/Bluetooth restent décoratifs, comme sur le bureau. */
  const phShade      = document.getElementById('ph-shade');
  const phStatusbar  = document.getElementById('ph-statusbar');
  const phBrightSl   = document.getElementById('ph-bright-slider');
  const phVolSl      = document.getElementById('ph-vol-slider');
  const phTgSound    = document.getElementById('ph-tg-sound');
  const phTgDnd      = document.getElementById('ph-tg-dnd');
  const phTgWifi     = document.getElementById('ph-tg-wifi');
  const phTgBt       = document.getElementById('ph-tg-bt');
  const phShadeSettings = document.getElementById('ph-shade-settings');
  let shadeOpen = false;
  function setShadeOpen(v){ shadeOpen = v; phShade.classList.toggle('show', v); }
  function toggleShade(){ setShadeOpen(!shadeOpen); sfx('tick'); }

  phStatusbar.addEventListener('click', toggleShade);
  let shadeDragY0 = null, shadeDragging = false;
  function shadeDragStart(e){ shadeDragY0 = e.clientY; shadeDragging = true; }
  function shadeDragMove(e){
    if(!shadeDragging) return;
    const dy = e.clientY - shadeDragY0;
    if(!shadeOpen && dy > 26){ setShadeOpen(true); shadeDragging = false; }
    else if(shadeOpen && dy < -26){ setShadeOpen(false); shadeDragging = false; }
  }
  function shadeDragEnd(){ shadeDragging = false; }
  phStatusbar.addEventListener('pointerdown', shadeDragStart);
  phShade.addEventListener('pointerdown', shadeDragStart);
  window.addEventListener('pointermove', shadeDragMove);
  window.addEventListener('pointerup', shadeDragEnd);
  document.addEventListener('click', (e)=>{
    if(shadeOpen && !e.target.closest('#ph-shade') && !e.target.closest('#ph-statusbar')) setShadeOpen(false);
  });

  phBrightSl.addEventListener('input', ()=>{ applyBrightness(+phBrightSl.value); logLine('backlight', `luminosité à ${brightness}%`); });
  phVolSl.addEventListener('input', ()=> setVolume(phVolSl.value));
  phTgSound.addEventListener('click', ()=> setSoundEnabled(!audio.enabled));
  phTgDnd.addEventListener('click', ()=>{ setDND(!dndOn()); sfx('toggle'); });
  [phTgWifi, phTgBt].forEach(t=> t.addEventListener('click', ()=>{ t.classList.toggle('on'); sfx('toggle'); }));
  phShadeSettings.addEventListener('click', ()=>{ setShadeOpen(false); openPhoneApp('meta'); });

  // état initial du volet, aligné sur l'état système déjà restauré (localStorage)
  phBrightSl.value = brightness;
  phVolSl.value = audio.volume;
  phTgSound.classList.toggle('on', audio.enabled);
  phTgDnd.classList.toggle('on', dndOn());

  // ---- bascule entre le bureau et Orace Phone ----
  function updateShellMode(){
    const phone = isPhoneMode();
    document.documentElement.dataset.mode = phone ? 'phone' : 'desktop';
    document.getElementById('desktop').hidden = phone;
    phoneShell.hidden = !phone;
    if(!phone){ closePhoneApp(); setShadeOpen(false); }   // en repassant au bureau, on revient a l'accueil
  }
  window.addEventListener('resize', updateShellMode);
  window.addEventListener('orientationchange', ()=> setTimeout(updateShellMode, 120));
  updateShellMode();


})();
