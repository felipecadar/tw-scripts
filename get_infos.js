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




(async function() {
    'use strict';

    const infos = {};
    for (const key in urls) {
        const { url, header } = urls[key];
        infos[key] = await getData(url, header);
    }
    console.log(infos)


})()
;