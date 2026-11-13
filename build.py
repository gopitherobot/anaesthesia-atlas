#!/usr/bin/env python3
"""Build the standalone (public) site into ./docs for GitHub Pages.
index.html is authored for claude.ai artifacts (no <html>/<head> wrapper); this adds the
document skeleton and copies the content scripts. Run:  python3 build.py"""
import os, shutil
ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "docs")
DIRS = ["stages", "formulary", "equipment", "techniques", "hubs", "map", "cases", "trainer"]
shutil.rmtree(OUT, ignore_errors=True); os.makedirs(OUT)
src = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
src = src.replace('<meta charset="utf-8">', "", 1)
head = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="description" content="Anaesthesia Atlas: EDAIC Part II preparation with a one-on-one tutor, timed mock SOEs and a pass tracker.">\n'
        '<style>body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n')
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(head + src + "\n</body>\n</html>\n")
for d in DIRS: shutil.copytree(os.path.join(ROOT, d), os.path.join(OUT, d))
shutil.copy(os.path.join(ROOT, "config.js"), OUT)
open(os.path.join(OUT, ".nojekyll"), "w").close()
print("Built", OUT)
