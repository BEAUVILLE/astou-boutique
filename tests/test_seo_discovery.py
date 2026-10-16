"""Static SEO regression tests. Run with: python3 -m unittest discover -s tests -v"""
import unittest
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://astou-boutique.digiylyfe.com/"
URLS = [BASE, BASE + "peignoirs-saly.html"]

class AstouSEO(unittest.TestCase):
    def test_canonicals(self):
        for path, url in [("index.html", URLS[0]), ("peignoirs-saly.html", URLS[1])]:
            with self.subTest(path=path):
                html = (ROOT / path).read_text(encoding="utf-8")
                self.assertIn('<link rel="canonical" href="' + url + '">', html)
                self.assertIn('<title>', html)
                self.assertIn('name="description"', html)

    def test_sitemap(self):
        root = ET.parse(ROOT / "sitemap.xml").getroot()
        urls = [e.text for e in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
        self.assertEqual(urls, URLS)

    def test_robots(self):
        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn("User-agent: *", robots)
        self.assertIn("Allow: /", robots)
        self.assertIn("Sitemap: " + BASE + "sitemap.xml", robots)

if __name__ == "__main__":
    unittest.main()
