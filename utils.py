import glob
import os
import numpy as np
import matplotlib.pyplot as plt
from enum import Enum

class Vtype(Enum):
    COMUM = 0
    MADEIRA = 1
    ARGILA = 2
    FERRO = 3
    POPULACAO = 4
    QUARTEL = 5
    ESTABULO = 6
    OFICINA = 7
    RESCURSOS = 8
    ARMAZEM_MERCADO = 9

def sortVillages(villages, center=[590, 504]):
    center = np.array(center)
    dists = np.linalg.norm(villages['coords'] - center, axis=1)
    sorted_idxs = dists.argsort()
    return {
        "coords": villages['coords'][sorted_idxs],
        "points": villages['points'][sorted_idxs],
        "vtype": villages['vtype'][sorted_idxs],
        "player": villages['player'][sorted_idxs],
        "names": villages['names'][sorted_idxs],
    }

def getLastFiles(root:str="./tw", world:str="br113"):
    root = os.path.join(os.path.abspath(root), world)  
    if not os.path.isdir(root):
        print(f"Cant find world {world} at path {root}")

    villages_path = sorted(glob.glob(os.path.join(root, "villages", "*.txt")))[-1]
    odd_path = sorted(glob.glob(os.path.join(root, "odd", "*.txt")))[-1]
    oda_path = sorted(glob.glob(os.path.join(root, "oda", "*.txt")))[-1]
    players_path = sorted(glob.glob(os.path.join(root, "players", "*.txt")))[-1]
    
    return {
        "villages": villages_path,
        "odd": odd_path,
        "oda": oda_path,
        "players": players_path,
    }

def read_villages(fpath):
    coords = []
    points = []
    vtype = []
    player = []
    names = []
    with open(fpath, 'r') as f:
        for line in f:
            idx_name, x, y, pid, score, typ = line.replace("\n","").rsplit(",", 5)
            idx, name = idx_name.split(",", 1)

            coords.append([int(x), int(y)])
            points.append(int(score))
            vtype.append(int(typ))
            player.append(pid)
            names.append(name)

    return {
        "coords": np.array(coords, dtype=int),
        "points": np.array(points, dtype=int),
        "vtype": np.array(vtype, dtype=int),
        "player": np.array(player, dtype=int),
        "names": np.array(names),
    }

def contLimits(K):
    x = (K%10) * 100, ((K%10)+1) * 100
    y = (K//10) * 100, ((K//10)+1) * 100
    return x, y

def plotMat(H, title, save=True):
    fig, ax = plt.subplots(figsize=(10,10))
    ax.set_title(title)
    ax.imshow(H)
    xe = np.arange(H.shape[1]+1)
    ye = np.arange(H.shape[0]+1)
    for i in range(len(xe)-1):
        for j in range(len(ye)-1):
            ax.text(xe[i],ye[j], H[j,i], color="black", ha="center", va="center", fontweight="bold")
            ax.text(xe[i]-0.3,ye[j]-0.3, f"K{(j*10+i)}", color="black", ha="center", va="center")
    if save:
        plt.savefig("_".join(title.split(" "))+".png")
    else:
        plt.show()
if __name__ == "__main__":
    # files = getLastFiles()
    # villages = read_villages(files["villages"])
    contLimits(2)
