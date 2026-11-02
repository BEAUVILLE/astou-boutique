"""Astou: homepage, six category pages, ten languages, contact/purchase safety."""
import json,re,shutil,subprocess,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
HOME=(ROOT/"index.html").read_text(encoding="utf-8")
CORE=(ROOT/"assets/astou/astou-i18n-core-8.js").read_text(encoding="utf-8")
LOADER=(ROOT/"assets/astou/astou-i18n-8.js").read_text(encoding="utf-8")
CATEGORIES=["draps-saly.html","serviettes-saly.html","peignoirs-saly.html","linge-maison-saly.html","linge-maison-petite-cote.html","linge-maison-villas-residences-saly.html"]
class TestAstouTenLanguages(unittest.TestCase):
 def test_home_loads_language_engine(self):
  self.assertIn('astou-i18n-8.js?v=20261102-astou10-static-v2',HOME)
  self.assertIn('astou-i18n-core-8.js?v=20261102-astou10-core1',LOADER)
  self.assertIn("const SUP=['fr','en','es','pt','de','it','nl','ar','wo','zh']",CORE)
  self.assertIn("document.documentElement.lang=lang==='zh'?'zh-CN':lang",CORE)
  self.assertIn("code==='zh'?'中文':code.toUpperCase()",CORE)
 def test_category_pages_also_load_new_engine(self):
  for name in CATEGORIES:
   page=(ROOT/name).read_text(encoding="utf-8")
   self.assertIn('astou-i18n-8.js?v=20261102-astou10-v1',page,name)
 def test_every_original_phrase_has_new_translations(self):
  keys=[m.group(1).replace("\\'","'") for m in re.finditer(r"(?:^|\n)add\('((?:\\.|[^'])*)'",CORE)]
  self.assertEqual(len(keys),228)
  extra={}
  prefix="Object.assign(EXTRA_WO_ZH,"
  position=0
  while True:
   start=CORE.find(prefix,position)
   if start<0:break
   record,length=json.JSONDecoder().raw_decode(CORE[start+len(prefix):])
   extra.update(record)
   position=start+len(prefix)+length
  self.assertEqual(set(keys),set(extra))
  for source,(wo,zh) in extra.items():
   self.assertTrue(wo.strip(),source)
   self.assertTrue(zh.strip(),source)
   self.assertNotEqual(source,zh,source)
  self.assertIn("D[fr]={fr,en,es,pt,de,it,nl,ar,wo:fr,zh:fr}",CORE)
 def test_no_hidden_mobile_languages(self):
  self.assertIn("flex-wrap:wrap!important",LOADER)
  self.assertIn("overflow-x:visible!important",LOADER)
  self.assertIn("Astou Boutique",HOME)
 def test_contact_prices_and_private_orders_unchanged(self):
  self.assertIn("https://wa.me/221778765785",HOME)
  self.assertIn("franceOrderForm",HOME)
  self.assertIn("window.DIGIY_MEMBER_PWA",HOME)
  self.assertIn("https://cdn.jsdelivr.net/npm/@supabase/supabase-js",HOME)
  self.assertIn("wa.me/221778765785?text=",CORE)
  self.assertIn("if(lang==='wo'||lang==='zh'){b.disabled=true",CORE)
  self.assertIn("window.open('https://wa.me/221778765785",CORE)
 @unittest.skipUnless(shutil.which("node"),"Node.js unavailable")
 def test_javascript_syntax(self):
  for name in ("astou-i18n-8.js","astou-i18n-core-8.js","mobile/mobile.js"):
   path=ROOT/"assets/astou"/name
   result=subprocess.run(["node","--check",str(path)],capture_output=True,text=True)
   self.assertEqual(result.returncode,0,name+"\n"+result.stderr)
if __name__=="__main__":unittest.main()
