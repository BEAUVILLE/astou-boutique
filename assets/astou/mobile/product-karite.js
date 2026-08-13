(()=>{
'use strict';
const photo='https://digiylyfe.net/wp-content/uploads/2026/05/ChatGPT-Image-26-mai-2026-07_42_39.png';
const item=['Beurre de karité bio maison','Homemade organic shea butter','7 000 FCFA','Disponible','Available',photo,'Bonjour Astou, je souhaite commander le beurre de karité bio maison à 7 000 FCFA.','Commander','Order','Produits naturels','Natural products'];
if(typeof products!=='undefined'&&!products.some(p=>p[0]===item[0]))products.splice(3,0,item);
const style=document.createElement('style');
style.textContent='.product-category{display:inline-block;margin:0 0 6px;padding:4px 8px;border-radius:999px;background:#f7e8f2;color:var(--wine);font-size:11px;font-weight:900;letter-spacing:.02em}.hero-actions button{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:13px;padding:11px 15px;font:inherit;font-weight:900;cursor:pointer}.hero-actions .voice-action{border:1px solid var(--wine);color:var(--wine);background:#fff}.hero-actions .visio-action{border:0;background:var(--wine-dark);color:#fff}';
document.head.appendChild(style);
updateProductToggle=function(){const button=document.getElementById('toggleProducts');if(!button)return;button.setAttribute('aria-expanded',String(productsExpanded));button.textContent=lang==='fr'?(productsExpanded?'Réduire les produits':'Voir les 11 produits'):(productsExpanded?'Show fewer products':'View all 11 products')};
renderProducts=function(){if(!grid)return;grid.innerHTML=products.map((p,n)=>`<article class="product${n>=4?` mobile-extra${productsExpanded?' is-visible':''}`:''}"><img src="${p[5]}" alt="${lang==='fr'?p[0]:p[1]} Astou Boutique" loading="lazy"><div class="product-body">${p[9]?`<span class="product-category">${lang==='fr'?p[9]:p[10]}</span>`:''}<h3>${lang==='fr'?p[0]:p[1]}</h3><span class="price">${p[2]}</span><span class="status">${lang==='fr'?p[3]:p[4]}</span><a class="order" href="https://wa.me/221778765785?text=${encodeURIComponent(p[6])}" target="_blank" rel="noopener">${lang==='fr'?p[7]:p[8]}</a></div></article>`).join('');updateProductToggle()};
renderProducts();

const heroActions=document.querySelector('.hero-actions');
const visioText='Bonjour Astou, je souhaite voir les produits disponibles en visio WhatsApp.';
const voiceCopy={
  fr:'Bienvenue chez Astou Boutique à Saly. Découvrez notre sélection de linge de maison et nos produits naturels. Le beurre de karité bio maison est disponible à 7 000 francs CFA. Vous ne pouvez pas vous déplacer ? Astou peut vous présenter les produits directement en visio WhatsApp. Choisissez vos articles, posez vos questions et confirmez votre commande à distance.',
  en:'Welcome to Astou Boutique in Saly. Discover our home linen selection and natural products. Our homemade organic shea butter is available for 7,000 CFA francs. If you cannot come to the shop, Astou can show you the available products directly by WhatsApp video call. Choose your items, ask your questions and confirm your order remotely.'
};
let listenButton=null;
function currentLang(){return document.documentElement.lang==='en'?'en':'fr'}
function resetListenLabel(){if(!listenButton)return;listenButton.textContent=currentLang()==='en'?'🔊 Listen to the boutique':'🔊 Écouter la boutique';listenButton.setAttribute('aria-label',listenButton.textContent)}
function addExperienceButtons(){
  if(!heroActions)return;
  if(!document.getElementById('astouListen')){
    listenButton=document.createElement('button');
    listenButton.id='astouListen';listenButton.type='button';listenButton.className='voice-action';
    resetListenLabel();
    listenButton.addEventListener('click',()=>{
      if(!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return;
      if(speechSynthesis.speaking){speechSynthesis.cancel();resetListenLabel();return;}
      const lang=currentLang();
      const utterance=new SpeechSynthesisUtterance(voiceCopy[lang]);
      utterance.lang=lang==='en'?'en-US':'fr-FR';utterance.rate=.95;utterance.pitch=1;
      const voices=speechSynthesis.getVoices();
      const voice=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(lang));
      if(voice)utterance.voice=voice;
      listenButton.textContent=lang==='en'?'■ Stop':'■ Arrêter';
      utterance.onend=resetListenLabel;utterance.onerror=resetListenLabel;
      speechSynthesis.speak(utterance);
    });
    heroActions.appendChild(listenButton);
  }
  if(!document.getElementById('astouVisio')){
    const visio=document.createElement('a');
    visio.id='astouVisio';visio.className='visio-action';visio.target='_blank';visio.rel='noopener';
    visio.href=`https://wa.me/221778765785?text=${encodeURIComponent(visioText)}`;
    visio.dataset.fr='📹 Vente en visio WhatsApp';visio.dataset.en='📹 WhatsApp video shopping';
    visio.textContent=currentLang()==='en'?visio.dataset.en:visio.dataset.fr;
    heroActions.appendChild(visio);
  }
}
addExperienceButtons();
const langObserver=new MutationObserver(()=>{
  resetListenLabel();
  const visio=document.getElementById('astouVisio');
  if(visio)visio.textContent=currentLang()==='en'?visio.dataset.en:visio.dataset.fr;
});
langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
window.addEventListener('beforeunload',()=>{if('speechSynthesis' in window)speechSynthesis.cancel()},{once:true});

// Carte vivante Astou : le PNG reste le visuel, le lien devient interactif.
const astouLivingCardUrl='https://astou-boutique.digiylyfe.com/carte/';
function installAstouLivingCard(){
  const section=document.getElementById('carte');
  if(!section)return;
  const heading=section.querySelector('h2');
  if(heading){heading.dataset.fr='Carte de visite interactive';heading.dataset.en='Interactive business card';heading.textContent=currentLang()==='en'?heading.dataset.en:heading.dataset.fr;}
  const intro=section.querySelector('.section-head p');
  if(intro){intro.dataset.fr='Une carte vivante : cliquez, contactez et partagez directement.';intro.dataset.en='A living card: tap, contact and share directly.';intro.textContent=currentLang()==='en'?intro.dataset.en:intro.dataset.fr;}
  const card=section.querySelector('.media-card');
  const img=card&&card.querySelector('img');
  if(img&&img.parentElement.tagName!=='A'){
    const link=document.createElement('a');link.href=astouLivingCardUrl;link.setAttribute('aria-label','Ouvrir la carte interactive Astou Boutique');img.parentNode.insertBefore(link,img);link.appendChild(img);
  }
  const text=card&&card.querySelector('div>p');
  if(text){text.dataset.fr='Le visuel reste la carte officielle. Le clic ouvre la carte vivante avec WhatsApp, appel, contact, boutique et partage direct.';text.dataset.en='The visual remains the official card. Tapping it opens the living card with WhatsApp, call, contact, shop and direct sharing.';text.textContent=currentLang()==='en'?text.dataset.en:text.dataset.fr;}
  const actions=section.querySelector('.media-actions');
  if(actions){
    const share=actions.querySelector('#shareAstouCard');
    if(share){share.dataset.fr='📲 Partager la carte vivante';share.dataset.en='📲 Share living card';share.textContent=currentLang()==='en'?share.dataset.en:share.dataset.fr;share.addEventListener('click',shareLivingCard,{capture:true});}
    const links=actions.querySelectorAll('a');
    if(links[1]){links[1].href=astouLivingCardUrl;links[1].removeAttribute('download');links[1].removeAttribute('target');links[1].dataset.fr='📲 Ouvrir la carte interactive';links[1].dataset.en='📲 Open interactive card';links[1].textContent=currentLang()==='en'?links[1].dataset.en:links[1].dataset.fr;}
  }
  const dock=document.getElementById('shareAstouDock');
  if(dock)dock.addEventListener('click',shareLivingCard,{capture:true});
}
async function shareLivingCard(event){
  event.preventDefault();event.stopImmediatePropagation();
  try{
    if(navigator.share){await navigator.share({title:'Astou Boutique · Saly',text:currentLang()==='en'?'Astou Boutique · Direct contact':'Astou Boutique · Contact direct',url:astouLivingCardUrl});return;}
    if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(astouLivingCardUrl);return;}
    location.href=astouLivingCardUrl;
  }catch(error){if(error&&error.name==='AbortError')return;}
}
installAstouLivingCard();
langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

// Moteur local 8 langues Astou — chargé après produits, packs, karité et boutons d'expérience.
if(!document.querySelector('script[data-astou-i18n8]')){
  const s=document.createElement('script');
  s.src='assets/astou/astou-i18n-8.js?v=20260811-astou8-v1';
  s.defer=true;s.dataset.astouI18n8='1';document.head.appendChild(s);
}
})();
