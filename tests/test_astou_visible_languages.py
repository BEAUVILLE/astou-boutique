"""Astou Boutique: verify a visible language selector even before JavaScript loads."""
import re, json, shutil, subprocess, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
HOME=(ROOT/"index.html").read_text(encoding="utf-8")
CARD=(ROOT/"carte/index.html").read_text(encoding="utf-8")
CARDJS=(ROOT/"assets/astou/astou-card-ten-languages.js").read_text(encoding="utf-8")
LANGS=("fr","en","es","pt","de","it","nl","ar","wo","zh")

class AstouVisibility(unittest.TestCase):
 def test_home_static_language_choices_without_js(self):
  nav=HOME.split('class="lang astou-lang10-static"',1)[1].split("</nav>",1)[0]
  available=re.findall(r'data-astou-lang="([^"]+)"',nav)
  self.assertEqual(tuple(available),LANGS)
  self.assertEqual(len(re.findall(r'href="\?lang=',nav)),10)
  self.assertIn('>🇸🇳 WO</a>',nav)
  self.assertIn('>🇨🇳 中文</a>',nav)
  self.assertIn("flex-wrap:wrap",HOME)
  self.assertIn("astou10-static-v2",HOME)

 def test_card_has_ten_locales_and_direct_actions(self):
  self.assertIn('id="astouCardLangs"',CARD)
  self.assertIn("astou-card-ten-languages.js",CARD)
  self.assertIn("document.documentElement.lang=lang==='zh'?'zh-CN':lang",CARDJS)
  self.assertIn("Object.keys(D).forEach",CARDJS)
  data=json.loads(CARDJS.split("const D=",1)[1].split(";\nconst flags=",1)[0])
  self.assertEqual(set(data),set(LANGS))
  self.assertEqual(set(data["fr"]),set(data["wo"]))
  self.assertEqual(set(data["fr"]),set(data["zh"]))
  self.assertTrue(all(v for item in data.values() for v in item.values()))
  self.assertIn("https://wa.me/221778765785?text=Bonjour%20Astou%20Boutique",CARD)
  self.assertIn('tel:+221778765785',CARD)
  self.assertIn("Astou-Boutique.vcf",CARD)
  self.assertIn("Astou Boutique",CARD)
  self.assertIn("0 % commission DIGIYLYFE",CARD)
  self.assertNotIn("supabase",CARDJS.lower())
  self.assertNotIn("fetch(",CARDJS)
  self.assertNotIn("eval(",CARDJS)

 @unittest.skipUnless(shutil.which("node"),"Node.js missing")
 def test_javascript_syntax(self):
  for file in ("assets/astou/astou-card-ten-languages.js",
               "assets/astou/astou-i18n-8.js",
               "assets/astou/astou-i18n-core-8.js"):
   proc=subprocess.run(["node","--check",str(ROOT/file)],capture_output=True,text=True)
   self.assertEqual(proc.returncode,0,file+" "+proc.stderr)

if __name__=="__main__":
 unittest.main()
