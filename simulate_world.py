import os, sys
import numpy as np
import pandas as pd
import json
import xml.etree.ElementTree as ET

from copy import copy

from yaml import parse

def dictify(r,root=True):
    if root:
        return {r.tag : dictify(r, False)}
    d=copy(r.attrib)
    if r.text:
        if str.isnumeric(r.text.replace(".", "")):
            d=float(r.text)
    for x in r.findall("./*"):
        if x.tag not in d:
            d[x.tag]=[]
        d[x.tag].append(dictify(x,False))

    for x in r.findall("./*"):
        if isinstance(d[x.tag][0], float):
            d[x.tag] = d[x.tag][0]

    return d

def parseXML(fname):
    tree = ET.parse(fname)
    return dictify(tree.getroot())


# word = 'br114'
# base_url = 'https://br114.tribalwars.com.br/interface.php?func='

config = parseXML('/Users/cadar/Documents/Github/tw-scripts/config/br114/building.xml')['config']
print(json.dumps(config, sort_keys=True, indent=4))

# print(config['wall'])
# print(pd.DataFrame(config).head())
# 