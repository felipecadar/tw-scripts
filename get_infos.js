// ==UserScript==
// @name         New Userscript
// @namespace    https://*tribalwars*/
// @version      2024-06-07
// @description  try to take over the world!
// @author       You
// @match        https://*.tribalwars.com.br/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @grant        none
// @require      https://unpkg.com/papaparse@5.4.1/papaparse.min.js
// ==/UserScript==

function addHeader(parsed, headers){
    let cool_data = []
    for (let data of parsed){
        let cool_obj = {}
        for(let i = 0; i < headers.length; i++){
            cool_obj[headers[i]] = data[i]
        }
        cool_data.push(cool_obj)
    }
    return cool_data
}

async function getData(someURL, header=undefined){
    // header is optional
    let data = await fetch(someURL)
      .then(function(response) {
          return response.text();
      })

    let parsed_data = Papa.parse(data).data;
    if (header)
        parsed_data = addHeader(parsed_data, header)

    return parsed_data
}



function getUnderAttack(){
    let commands = TWMap.commandIcons
    let under_attack = []
    for(var village_id in commands){
        for(var cmd_idx in commands[village_id]){
            let cmd = commands[village_id][cmd_idx]
            if (cmd.img == "attack"){
                under_attack.push(village_id)
                console.log
            }
        }
    }
    return under_attack
}

function getVillageByIds(infos){
    let vbi = {}
    for (let village of infos.villages){
        vbi[village.id] = village
    }
    return vbi
}

async function fetchInfos(select = ['villages', 'players', 'allies']){
    // Options
    // villages, players, allies, conquers, kill_att, kill_def, kill_sup
    // kill_all, kill_att_tribe, kill_def_tribe, kill_all_tribe
    const urls = {
        'villages': {
            url: window.location.origin + '/map/village.txt',
            header: ['id', 'name', 'x', 'y', 'player', 'points', 'rank'],
        },
        'players': {
            url: window.location.origin + '/map/player.txt',
            header: ['id', 'name', 'ally', 'villages', 'points', 'rank'],
        },
        'allies': {
            url: window.location.origin + '/map/ally.txt',
            header: ['id', 'name', 'tag', 'members', 'villages', 'points', 'all_points', 'rank'],
        },
        'conquers': {
            url: window.location.origin + '/map/conquer.txt',
            header: ['village_id', 'unix_timestamp', 'new_owner', 'old_owner'],
        },
        'kill_att': {
            url: window.location.origin + '/map/kill_att.txt',
            header: ['rank', 'id', 'kills'],
        },
        'kill_def': {
            url: window.location.origin + '/map/kill_def.txt',
            header: ['rank', 'id', 'kills'],
        },
        'kill_sup': {
            url: window.location.origin + '/map/kill_sup.txt',
            header: ['rank', 'id', 'kills'],
        },
        'kill_all': {
            url: window.location.origin + '/map/kill_all.txt',
            header: ['rank', 'id', 'kills'],
        },
        'kill_att_tribe': {
            url: window.location.origin + '/map/kill_att_tribe.txt',
            header: ['rank', 'id', 'kills'],
        },
        'kill_def_tribe': {
            url: window.location.origin + '/map/kill_def_tribe.txt',
            header: ['rank', 'id', 'kills'],
        },
        'kill_all_tribe': {
            url: window.location.origin + '/map/kill_all_tribe.txt',
            header: ['rank', 'id', 'kills'],
        }
    };
    const infos = {};
    for (const key of select) {
        console.log(`Getting ${key}`)
        const { url, header } = urls[key];
        infos[key] = await getData(url, header);
    }
    return infos
}


(async function() {
    'use strict';
    const isMapScreen = window.location.search.includes("screen=map");

    const infos = await fetchInfos()
    const villagesById = getVillageByIds(infos)


    if (isMapScreen){
        const underAttack = getUnderAttack()

        console.log(underAttack)
    }


})()
;