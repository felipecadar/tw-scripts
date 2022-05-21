import pdb
import numpy as np
import utils

files = utils.getLastFiles()
villages = utils.read_villages(files["villages"])
villages = utils.sortVillages(villages, center=[590, 504])

selection = [utils.Vtype.MADEIRA, utils.Vtype.ARGILA, utils.Vtype.FERRO, utils.Vtype.RESCURSOS]
vilage_filter = np.zeros_like(villages["vtype"])
for s in selection:
    vilage_filter += (villages["vtype"] == s.value)
vilage_filter = vilage_filter.nonzero()[0]

K = 50
vilage_filter = vilage_filter[:K]

for idx in vilage_filter:
    x, y = villages['coords'][idx]
    print(f'{x}|{y}')

# coords = villages['coords']
# pts = villages["points"]
# vtype = villages["vtype"]
# names = villages["names"]
# players = villages["player"]
