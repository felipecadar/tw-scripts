import numpy as np
from typing import Any, List, Iterable
ndarray = np.ndarray
from enum import Enum

import matplotlib.pyplot as plt

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

class Village:
    def __init__(self, vid:int, coord:ndarray, points:float, vtype:int, player:int, name:str) -> None:
        self.vid = vid
        self.coord = coord
        self.points = points
        self.vtype = Vtype(vtype)
        self.pid = player
        self.name = name
        self.ally = -1
        self.is_bonus = False
        if self.vtype != Vtype.COMUM:
            self.is_bonus = True

    def distance(self, target):
        if isinstance(target, ndarray):
            return np.linalg.norm(self.coord - target)
        elif isinstance(target, Village):
            return np.linalg.norm(self.coord - target.coord)
        else:
            raise f"Expected {ndarray} or {Village}. Got {type(target)}"

    def getK(self) -> int:

        x = self.coord[0]
        y = self.coord[1]

        Kx = x//100
        Ky = y//100

        return (Ky*10) + Kx

    def __str__(self):
        if self.pid >0:
            return f"V[{self.vid:>6d}] {self.points:>5d} pts - ({self.coord[0]}|{self.coord[1]}) - {self.name:<40} : {self.pid}"
        else:
            return f"V[{self.vid:>6d}] {self.points:>5d} pts - ({self.coord[0]}|{self.coord[1]}) - {self.vtype:<40} : {self.pid}"

class Player:
    def __init__(self, pid, name, ally, points, rank) -> None:
        self.pid:int = pid
        self.name:str = name
        self.ally:int = ally
        self.points:int = points
        self.rank:int = rank
        self.villages:List[Village] = []
        self.center:ndarray = np.array([0,0])

    def getVillages(self, villages) -> List[Village]:
        if len(self.villages) > 0:
            return self.villages
        
        self.villages = list(filter(lambda v: self.pid == v.pid, villages))
        self.villages = sorted(self.villages, key=lambda x: x.name)
        return self.villages

    def getCenter(self) -> ndarray:
        all_coords = np.array([v.coord for v in self.villages])
        if all_coords.shape[0] > 0:
            self.center = all_coords.mean(0)

        return self.center

    def __str__(self) -> str:
        return f"P[{self.pid:>9d}] {self.points:>7d} pts - {self.name}"

class Map:
    def __init__(self, villages, players, allies) -> None:
        self.villages = villages
        self.players = players
        self.allies = allies

    def plotK(self, K):
        pass

    def plotMap(self):
        pass