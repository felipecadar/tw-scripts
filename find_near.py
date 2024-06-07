from pydoc import visiblename
from shutil import ExecError
from turtle import distance
from typing import Any, List, Iterable
from enum import Enum

import glob
import os
import numpy as np
import matplotlib.pyplot as plt

from structures import Village, Player, Map, Vtype


def select(idx:List[int], l:List[Any]):
    selection = []
    for i in idx:
        selection.append(l[i])
    return selection

def sortVillages(villages, center=[590, 504]):

    center = np.array(center)
    dists = np.array([v.coord for v in villages])
    dists = np.linalg.norm(villages['coords'] - center, axis=1)
    sorted_idxs = dists.argsort()
    
    return select(sorted_idxs, villages)

def getLastFiles(root:str="./tw", world:str="br127"):
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

def read_od(fpath):
    players = []
    od = []
    a = np.loadtxt()    

def read_villages(fpath) -> List[Village]:
    villages = []
    with open(fpath, 'r') as f:
        for line in f:
            idx_name, x, y, pid, score, typ = line.replace("\n","").rsplit(",", 5)
            idx, name = idx_name.split(",", 1)

            villages.append(Village(int(idx), np.array([int(x), int(y)]), int(score), int(typ), int(pid), name))

    return villages

def read_players(fpath) -> List[Player]:
    players = []

    with open(fpath, 'r') as f:
        for line in f:
            idx_name, ally, viilage, points, rank = line.replace("\n","").rsplit(",", 4)
            idx, name = idx_name.split(",", 1)

            players.append(Player(int(idx), name, int(ally), int(points), int(rank)))

    return players

def getPlayer(players:List[Player], name:str) -> Player:
    for p in players:
        if p.name == name:
            return p
    
    return None


def contLimits(K):
    x = (K%10) * 100, ((K%10)+1) * 100
    y = (K//10) * 100, ((K//10)+1) * 100
    return x, y

def normCoords(coord, Kx, Ky):
    coord[...,0] = coord[...,0] - Kx[0]
    coord[...,1] = coord[...,1] - Ky[1]
    return coord

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

def filterVillages(villages:List[Village], K:int = -1, min_points:int=-1, max_points:int=-1, remove_players:List[int]=[], only_players:List[int]=[], types:List[Vtype] = [], distance_to_center:int = -1, center:np.ndarray = np.array([]), has_owner:bool=True) -> List[Village]:
    if has_owner:
        villages = list(filter(lambda v: v.pid > 0, villages))
    else:
        villages = list(filter(lambda v: v.pid == 0, villages))

    if K >= 0:
        villages = list(filter(lambda v: v.getK() == K, villages))

    if min_points >= 0:
        villages = list(filter(lambda v: v.points > min_points, villages))

    if max_points >= 0:
        villages = list(filter(lambda v: v.points < max_points, villages))

    if len(remove_players) > 0:
        villages = list(filter(lambda v: not(v.pid in remove_players), villages))

    if len(only_players) > 0:
        villages = list(filter(lambda v: v.pid in only_players, villages))

    if len(types) > 0:
        villages = list(filter(lambda v: v.vtype in types, villages))

    if distance_to_center > 0:
        if len(center) > 0:
            villages = list(filter(lambda v: v.distance(center) < distance_to_center, villages))
        else:
            raise Exception(f"To use 'distance_to_center' please inform 'certer'")

    return villages

def sortByDistance(villages:List[Village], center:np.ndarray):
    return sorted(villages, key= lambda x: x.distance(center))

if __name__ == "__main__":
    files = getLastFiles()
    villages = read_villages(files["villages"])
    players = read_players(files["players"])


    me = getPlayer(players, "CadsCZ")
    me.getVillages(villages)
    me.getCenter()
    
    print(me)
    for v in me.villages:
        near = filterVillages(
            villages=villages,
            center=v.coord,
            distance_to_center=20,
            has_owner=False,
        )
        print(v)
        for n in near:
            print(n)

    # for p in players:
    #     p.getVillages(villages)
    #     p.getCenter()
    #     # print(p)


    # print(villages)
    # print(contLimits(46))
