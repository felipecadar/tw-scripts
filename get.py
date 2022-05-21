import urllib, requests
import time, os
import pathlib
import datetime

here = str(pathlib.Path(__file__).parent.absolute())
print("Getting stats")
print(datetime.datetime.now())

def getAll(world:int):
    village_url = f"https://{world}.tribalwars.com.br/map/village.txt"
    village_data = urllib.parse.unquote_plus(requests.get(village_url).text)
    
    player_url = f"https://{world}.tribalwars.com.br/map/player.txt"
    player_data = urllib.parse.unquote_plus(requests.get(player_url).text)

    odd_url = f"https://{world}.tribalwars.com.br/map/kill_def.txt"
    odd_data = urllib.parse.unquote_plus(requests.get(odd_url).text)

    oda_url = f"https://{world}.tribalwars.com.br/map/kill_att.txt"
    oda_data = urllib.parse.unquote_plus(requests.get(oda_url).text)

    t = str(time.time())
    os.makedirs(here + f"/tw/{world}/villages/", exist_ok=True)
    with open(here + f"/tw/{world}/villages/" + t + ".txt", "w") as f:
        f.write(village_data)

    os.makedirs(here + f"/tw/{world}/players/", exist_ok=True)
    with open(here + f"/tw/{world}/players/" + t + ".txt", "w") as f:
        f.write(player_data)

    os.makedirs(here + f"/tw/{world}/odd/", exist_ok=True)
    with open(here + f"/tw/{world}/odd/" + t + ".txt", "w") as f:
        f.write(odd_data)

    os.makedirs(here + f"/tw/{world}/oda/", exist_ok=True)
    with open(here + f"/tw/{world}/oda/" + t + ".txt", "w") as f:
        f.write(oda_data)

if __name__ == "__main__":   
    getAll("br113")