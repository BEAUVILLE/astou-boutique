/* ASTOU BOUTIQUE — chargeur public 8 langues + compatibilité visuelle historique.
   Le cœur de traduction est conservé dans astou-i18n-core-8.js. */
(function(){
'use strict';

function installLanguageBarResponsiveFix(){
  if(document.getElementById('astou-lang8-responsive')) return;

  const style=document.createElement('style');
  style.id='astou-lang8-responsive';
  style.textContent=`
.astou-lang8,
.top-actions .lang{
  display:flex!important;
  flex-wrap:nowrap!important;
  align-items:center!important;
  justify-content:flex-start!important;
  gap:4px!important;
  min-width:0!important;
  max-width:100%!important;
  overflow-x:auto!important;
  overflow-y:hidden!important;
  -webkit-overflow-scrolling:touch;
  scrollbar-width:none;
}
.astou-lang8::-webkit-scrollbar,
.top-actions .lang::-webkit-scrollbar{display:none}
.astou-lang8 button,
.top-actions .lang button{
  flex:0 0 auto!important;
  white-space:nowrap!important;
}
.top-actions{min-width:0!important}
@media(min-width:760px) and (max-width:1119px){
  .desktop-nav{display:none!important}
  .top-actions{flex:1 1 auto!important;justify-content:flex-end!important}
  .top-actions .lang{max-width:min(58vw,430px)!important}
}
`;
  document.head.appendChild(style);
}

function restoreSecondaryPageUI(){
  if(!document.querySelector('.topbar')) return;
  if(document.getElementById('astou-ui-compat')) return;

  const style=document.createElement('style');
  style.id='astou-ui-compat';
  style.textContent=`
.logo img{object-position:left center}
.nav a:hover{color:var(--wine)}
.wa-top{white-space:nowrap}
.hero::before{background-image:linear-gradient(90deg,rgba(251,247,242,.98) 0%,rgba(251,247,242,.88) 34%,rgba(251,247,242,.18) 72%),var(--hero)}
.kicker{letter-spacing:.08em;text-transform:uppercase;box-shadow:0 5px 18px rgba(75,6,55,.08)}
.hero p{color:#4b4046}
.btn{border:1px solid transparent}
.trust article{align-items:flex-start;border-right:1px solid var(--line)}
.trust article:last-child{border-right:0}
.trust b{font-size:14px}
.trust span{font-size:25px}
.offer-strip{margin:0 0 26px}
.offer{box-shadow:0 8px 20px rgba(75,6,55,.06)}
.offer strong{font-size:17px}
.card{display:flex;flex-direction:column}
.card figure{overflow:hidden;background:#eee}
.card img{transition:transform .35s ease}
.card:hover img{transform:scale(1.035)}
.badge{text-transform:uppercase;letter-spacing:.04em}
.card-body{display:flex;flex-direction:column;flex:1}
.card h3{line-height:1.12}
.card p{margin:0 0 12px}
.price-row{margin-top:auto}
.old{display:inline-block;font-size:14px}
.wide{grid-column:span 2}
.gallery-copy h2{margin:0 0 10px;line-height:1.08}
.note h2{font:800 27px Georgia,serif}
.links{margin-top:15px}
.links a{font-size:13px}
.footer strong{display:block;font-size:18px;letter-spacing:.08em}
.footer small{color:#efdae7}
@media(max-width:920px){
  .trust article:nth-child(2){border-right:0}
  .trust article:nth-child(-n+2){border-bottom:1px solid var(--line)}
  .gallery-banner img{max-height:330px}
  .wide{grid-column:auto}
}
@media(max-width:620px){
  .hero::before{background-image:linear-gradient(180deg,rgba(251,247,242,.97) 0%,rgba(251,247,242,.86) 52%,rgba(251,247,242,.35) 100%),var(--hero);background-position:center}
  .hero p{font-size:16px}
  .trust article{border-right:0;border-bottom:1px solid var(--line)}
  .trust article:last-child{border-bottom:0}
  .gallery-copy{padding:23px}
  .gallery-copy h2{font-size:29px}
}
`;
  document.head.appendChild(style);

  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    a.setAttribute('rel',Array.from(rel).join(' '));
  });
  document.querySelectorAll('.card img,.gallery-banner img').forEach(img=>{
    if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
  });
  const trust=document.querySelector('.trust');
  if(trust&&!trust.hasAttribute('aria-label')) trust.setAttribute('aria-label','Avantages Astou Boutique');
}

function loadCore(){
  if(document.querySelector('script[data-astou-i18n-core]')) return;
  const s=document.createElement('script');
  s.src='assets/astou/astou-i18n-core-8.js?v=20260811-astou8-core1';
  s.async=false;
  s.dataset.astouI18nCore='1';
  document.head.appendChild(s);
}

installLanguageBarResponsiveFix();
restoreSecondaryPageUI();
loadCore();
})();
