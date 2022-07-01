# Scripts 

```
javascript:$.getScript('https://raw.githubusercontent.com/felipecadar/tw-scripts/main/map_attack.js');void(0);
```

```
/map/village.txt
/map/village.txt.gz
(Data: id, name, x, y, player, points, rank)

/map/player.txt
/map/player.txt.gz
(Data: id, name, ally, villages, points, rank)

/map/ally.txt
/map/ally.txt.gz
(Data: id, name, tag, members, villages, points, all_points, rank)

/map/conquer.txt
/map/conquer.txt.gz
(Data: village_id, unix_timestamp, new_owner, old_owner)

/map/kill_att.txt
/map/kill_def.txt
/map/kill_sup.txt
/map/kill_all.txt
(Data: rank, id, kills)

/map/kill_att_tribe.txt
/map/kill_def_tribe.txt
/map/kill_all_tribe.txt
(Data: rank, id, kills)

/interface.php?func=get_conquer&since=unix_timestamp
(Data: village_id, unix_timestamp, new_owner, old_owner)
(NOTE: unix_timestamp value can be no more than 24 hours ago)

/interface.php?func=get_config

/interface.php?func=get_unit_info

/interface.php?func=get_building_info
```