const categoryImages={
draps:"assets/astou/premium/cat-draps.webp",
serviettes:"assets/astou/premium/cat-serviettes.webp",
peignoirs:"assets/astou/premium/cat-peignoirs.webp",
linge:"assets/astou/premium/cat-linge.webp",
petite:"assets/astou/premium/cat-petite-cote.webp",
villas:"assets/astou/premium/cat-villas.webp"
};
const products=[
["Drap 2 places","Double-bed sheet","12 000 FCFA","Disponible","Available",categoryImages.draps,"Bonjour Astou, je souhaite commander un drap 2 places à 12 000 FCFA.","Commander","Order"],
["Drap 1 place","Single-bed sheet","7 500 FCFA","Disponible","Available",categoryImages.draps,"Bonjour Astou, je souhaite commander un drap 1 place à 7 500 FCFA.","Commander","Order"],
["Parure complète","Complete bedding set","25 000 FCFA","Stock limité","Limited stock",categoryImages.draps,"Bonjour Astou, je souhaite voir les parures complètes à 25 000 FCFA.","Voir les modèles","View styles"],
["Taie d’oreiller","Pillowcase","2 500 FCFA","Disponible","Available",categoryImages.draps,"Bonjour Astou, je souhaite commander une taie d’oreiller à 2 500 FCFA.","Commander","Order"],
["Serviette de bain","Bath towel","8 500 FCFA","Disponible","Available",categoryImages.serviettes,"Bonjour Astou, je souhaite commander une serviette de bain à 8 500 FCFA.","Commander","Order"],
["Peignoir","Bathrobe","15 000 FCFA","Stock limité","Limited stock",categoryImages.peignoirs,"Bonjour Astou, je souhaite voir les peignoirs à 15 000 FCFA.","Voir les modèles","View styles"],
["Couette","Duvet","30 000 FCFA","Stock limité","Limited stock",categoryImages.linge,"Bonjour Astou, je souhaite voir les couettes à 30 000 FCFA.","Voir les modèles","View styles"],
["Oreiller","Pillow","8 000 FCFA","Disponible","Available",categoryImages.linge,"Bonjour Astou, je souhaite commander un oreiller à 8 000 FCFA.","Commander","Order"],
["Nappe de table","Tablecloth","7 000 FCFA","Disponible","Available",categoryImages.petite,"Bonjour Astou, je souhaite voir les nappes à 7 000 FCFA.","Voir les modèles","View styles"],
["Torchon","Kitchen towel","1 000 FCFA","Disponible","Available",categoryImages.villas,"Bonjour Astou, je souhaite commander des torchons à 1 000 FCFA.","Commander","Order"]
];
let lang="fr";
const grid=document.getElementById("productGrid"),frBtn=document.getElementById("frBtn"),enBtn=document.getElementById("enBtn");
function renderProducts(){grid.innerHTML=products.map(p=>`<article class="product"><img src="${p[5]}" alt="${lang==="fr"?p[0]:p[1]} Astou Boutique" loading="lazy"><div class="product-body"><h3>${lang==="fr"?p[0]:p[1]}</h3><span class="price">${p[2]}</span><span class="status">${lang==="fr"?p[3]:p[4]}</span><a class="order" href="https://wa.me/221778765785?text=${encodeURIComponent(p[6])}" target="_blank" rel="noopener">${lang==="fr"?p[7]:p[8]}</a></div></article>`).join("")}
function setLang(next){lang=next;document.documentElement.lang=lang;document.querySelectorAll("[data-fr]").forEach(el=>{const v=el.dataset[lang];if(v)el.textContent=v});frBtn.classList.toggle("active",lang==="fr");enBtn.classList.toggle("active",lang==="en");renderProducts()}
frBtn.addEventListener("click",()=>setLang("fr"));enBtn.addEventListener("click",()=>setLang("en"));renderProducts();