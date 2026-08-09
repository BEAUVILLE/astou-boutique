(()=>{
'use strict';
const photo='https://digiylyfe.net/wp-content/uploads/2026/05/ChatGPT-Image-26-mai-2026-07_42_39.png';
const item=['Beurre de karité bio maison','Homemade organic shea butter','7 000 FCFA','Disponible','Available',photo,'Bonjour Astou, je souhaite commander le beurre de karité bio maison à 7 000 FCFA.','Commander','Order','Produits naturels','Natural products'];
if(typeof products!=='undefined'&&!products.some(p=>p[0]===item[0]))products.splice(3,0,item);
const style=document.createElement('style');
style.textContent='.product-category{display:inline-block;margin:0 0 6px;padding:4px 8px;border-radius:999px;background:#f7e8f2;color:var(--wine);font-size:11px;font-weight:900;letter-spacing:.02em}';
document.head.appendChild(style);
updateProductToggle=function(){const button=document.getElementById('toggleProducts');if(!button)return;button.setAttribute('aria-expanded',String(productsExpanded));button.textContent=lang==='fr'?(productsExpanded?'Réduire les produits':'Voir les 11 produits'):(productsExpanded?'Show fewer products':'View all 11 products')};
renderProducts=function(){if(!grid)return;grid.innerHTML=products.map((p,n)=>`<article class="product${n>=4?` mobile-extra${productsExpanded?' is-visible':''}`:''}"><img src="${p[5]}" alt="${lang==='fr'?p[0]:p[1]} Astou Boutique" loading="lazy"><div class="product-body">${p[9]?`<span class="product-category">${lang==='fr'?p[9]:p[10]}</span>`:''}<h3>${lang==='fr'?p[0]:p[1]}</h3><span class="price">${p[2]}</span><span class="status">${lang==='fr'?p[3]:p[4]}</span><a class="order" href="https://wa.me/221778765785?text=${encodeURIComponent(p[6])}" target="_blank" rel="noopener">${lang==='fr'?p[7]:p[8]}</a></div></article>`).join('');updateProductToggle()};
renderProducts();
})();
