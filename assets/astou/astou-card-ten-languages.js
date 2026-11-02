/* ASTOU BOUTIQUE — multilingual public card, direct actions unchanged. */
(function(){
'use strict';
const D={"fr":{"desc":"Saly Centre · draps · parures · serviettes · peignoirs · couettes · accessoires maison.","call":"📞 Appeler","shop":"🛍️ Ouvrir la boutique","contact":"👤 Ajouter aux contacts","share":"📲 Partager cette carte","copy":"📋 Copier le numéro","copied":"✅ Numéro copié","note":"Achat direct · Paiement direct · 0 % commission DIGIYLYFE"},"en":{"desc":"Saly Centre · sheets · bedding sets · towels · bathrobes · duvets · home accessories.","call":"📞 Call","shop":"🛍️ Open the shop","contact":"👤 Add to contacts","share":"📲 Share this card","copy":"📋 Copy number","copied":"✅ Number copied","note":"Direct purchase · Direct payment · 0% DIGIYLYFE commission"},"es":{"desc":"Saly Centro · sábanas · juegos de cama · toallas · albornoces · edredones · accesorios para el hogar.","call":"📞 Llamar","shop":"🛍️ Abrir la tienda","contact":"👤 Añadir a contactos","share":"📲 Compartir esta tarjeta","copy":"📋 Copiar número","copied":"✅ Número copiado","note":"Compra directa · Pago directo · 0 % de comisión DIGIYLYFE"},"pt":{"desc":"Saly Centro · lençóis · conjuntos de cama · toalhas · roupões · edredões · acessórios para casa.","call":"📞 Ligar","shop":"🛍️ Abrir a loja","contact":"👤 Adicionar aos contactos","share":"📲 Partilhar este cartão","copy":"📋 Copiar número","copied":"✅ Número copiado","note":"Compra direta · Pagamento direto · 0% de comissão DIGIYLYFE"},"de":{"desc":"Saly Zentrum · Bettlaken · Bettwäsche · Handtücher · Bademäntel · Bettdecken · Wohnaccessoires.","call":"📞 Anrufen","shop":"🛍️ Shop öffnen","contact":"👤 Zu Kontakten hinzufügen","share":"📲 Karte teilen","copy":"📋 Nummer kopieren","copied":"✅ Nummer kopiert","note":"Direktkauf · Direktzahlung · 0 % DIGIYLYFE-Provision"},"it":{"desc":"Saly Centro · lenzuola · completi letto · asciugamani · accappatoi · piumoni · accessori per la casa.","call":"📞 Chiama","shop":"🛍️ Apri il negozio","contact":"👤 Aggiungi ai contatti","share":"📲 Condividi il biglietto","copy":"📋 Copia numero","copied":"✅ Numero copiato","note":"Acquisto diretto · Pagamento diretto · 0% commissioni DIGIYLYFE"},"nl":{"desc":"Saly Centrum · lakens · beddengoed · handdoeken · badjassen · dekbedden · woonaccessoires.","call":"📞 Bellen","shop":"🛍️ Open de winkel","contact":"👤 Voeg toe aan contacten","share":"📲 Deel deze kaart","copy":"📋 Kopieer nummer","copied":"✅ Nummer gekopieerd","note":"Direct kopen · Direct betalen · 0% DIGIYLYFE-commissie"},"ar":{"desc":"وسط سالي · ملاءات · أطقم مفروشات · مناشف · أردية حمام · ألحفة · مستلزمات منزلية.","call":"📞 اتصال","shop":"🛍️ افتح المتجر","contact":"👤 إضافة إلى جهات الاتصال","share":"📲 مشاركة البطاقة","copy":"📋 نسخ الرقم","copied":"✅ تم نسخ الرقم","note":"شراء مباشر · دفع مباشر · 0٪ عمولة DIGIYLYFE"},"wo":{"desc":"Saly Centre · drap yi · parure yi · serviette yi · peignoir yi · couette yi · jumtukaayi kër.","call":"📞 Woo","shop":"🛍️ Ubbil butik bi","contact":"👤 Yokk ci contacts","share":"📲 Séddoo carte bii","copy":"📋 Kopiye nimero bi","copied":"✅ Nimero bi kopiye na","note":"Jënd ci sa bopp · Fay ci sa bopp · 0 % commission DIGIYLYFE"},"zh":{"desc":"萨利中心 · 床单 · 床品套装 · 毛巾 · 浴袍 · 羽绒被 · 家居用品。","call":"📞 致电","shop":"🛍️ 打开店铺","contact":"👤 添加到通讯录","share":"📲 分享此名片","copy":"📋 复制号码","copied":"✅ 号码已复制","note":"直接购买 · 直接付款 · DIGIYLYFE 佣金 0%"}};
const flags={fr:'🇫🇷 FR',en:'🇬🇧 EN',es:'🇪🇸 ES',pt:'🇵🇹 PT',de:'🇩🇪 DE',it:'🇮🇹 IT',nl:'🇳🇱 NL',ar:'🌙 AR',wo:'🇸🇳 WO',zh:'🇨🇳 中文'};
const selected=(new URLSearchParams(location.search).get('lang')||'').toLowerCase().slice(0,2);
let lang=D[selected]?selected:'fr';
if(!D[selected]){try{const stored=localStorage.getItem('astou-lang');if(D[stored])lang=stored;}catch(e){}}
const bar=document.getElementById('astouCardLangs');
if(!bar)return;
const descriptions=document.getElementById('astouCardDesc');
const note=document.getElementById('astouCardNote');
const copy=document.getElementById('copyPhone');
function update(){
 const t=D[lang];
 document.documentElement.lang=lang==='zh'?'zh-CN':lang;
 document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 if(descriptions)descriptions.textContent=t.desc;
 if(note)note.textContent=t.note;
 document.querySelectorAll('[data-astou-i18n]').forEach(el=>{const v=t[el.dataset.astouI18n];if(v)el.textContent=v;});
 const store=document.querySelector('.action[href="https://astou-boutique.digiylyfe.com/"]');
 if(store)store.href='https://astou-boutique.digiylyfe.com/?lang='+lang;
 const poster=document.querySelector('.visual[href="https://astou-boutique.digiylyfe.com/"]');
 if(poster)poster.href='https://astou-boutique.digiylyfe.com/?lang='+lang;
 bar.innerHTML='';
 Object.keys(D).forEach(code=>{
  const a=document.createElement('a');
  a.href='?lang='+code;a.textContent=flags[code];a.lang=code==='zh'?'zh-CN':code;
  if(code===lang)a.setAttribute('aria-current','page');
  bar.appendChild(a);
 });
 try{localStorage.setItem('astou-lang',lang)}catch(e){}
}
update();
if(copy){
 copy.addEventListener('click',()=>{setTimeout(()=>{if(copy.textContent.includes('✅'))copy.textContent=D[lang].copied;},250)});
}
})();
