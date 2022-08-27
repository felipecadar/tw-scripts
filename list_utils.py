import pdb
import numpy as np
from structures import Vtype
import utils
import cv2

import utils

if __name__ == "__main__":

    world_map = np.ones([1000,1000,3], dtype=np.uint8)
    cont = 45
    Kx,Ky = utils.contLimits(cont)


    files = utils.getLastFiles()
    villages = utils.read_villages(files["villages"])
    players = utils.read_players(files["players"])


    me = utils.getPlayer(players, "subaro98")
    me.getVillages(villages)
    me.getCenter()

    my_allies = [p.pid for p in players if p.ally == me.ally]
    
    print(me)
    # for v in me.villages:
    #     print(v)
        
    main_village = me.villages[0]

    close = utils.filterVillages(villages,  K=main_village.getK(), only_players=[0], distance_to_center=40, center=np.array([500,500]), types=[Vtype.QUARTEL, Vtype.RESCURSOS, Vtype.MADEIRA, Vtype.ARGILA, Vtype.FERRO, Vtype.POPULACAO, Vtype.POPULACAO])
    # close = utils.filterVillages(villages, K=main_village.getK())

    close = utils.sortByDistance(close, main_village.coord)

    for v in close:
        print(v)