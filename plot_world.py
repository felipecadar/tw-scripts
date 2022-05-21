# village_id, name, x, y, idx, pts, b 

import pdb
import utils
import numpy as np

if __name__ == "__main__":
    
    
    files = utils.getLastFiles()
    villages = utils.read_villages(files["villages"])

    coords = villages['coords']
    pts = villages["points"]
    v_barb = (villages['player'] == 0)
    v_player = (villages['player'] != 0)

    WORLD_POINTS = np.zeros([10,10], dtype=int)
    WORLD_PLAYERS = np.zeros([10,10], dtype=int)
    WORLD_BARB = np.zeros([10,10], dtype=int)
    for k in range(100):
        xlim, ylim = utils.contLimits(k)
        # pdb.set_trace()
        validx = (coords[:,0] >= xlim[0]) & (coords[:,0] < xlim[1])
        validy = (coords[:,1] >= ylim[0]) & (coords[:,1] < ylim[1])
        valid = validx & validy & v_player
        valid_pts = pts[valid.nonzero()[0]]

        if len(valid_pts) > 0:
            m = np.mean(valid_pts)
            x, y = k%10, k//10
            WORLD_POINTS[y, x] = int(m)
            WORLD_PLAYERS[y, x] = int(len(valid_pts))
            

        valid = validx & validy & v_barb
        valid_pts = pts[valid.nonzero()[0]]
        if len(valid_pts) > 0:
            WORLD_BARB[y, x] = int(len(valid_pts))


    utils.plotMat(WORLD_POINTS, "Média de pontos", False)
    utils.plotMat(WORLD_PLAYERS, "Número de Aldeias Ativas", False)
    utils.plotMat(WORLD_BARB, "Número de Bárbaras", False)

