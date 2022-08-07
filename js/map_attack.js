javascript:"use strict";

$(document).ready(function () {

    const tempo_campo = {
        "spear": 9,
        "sword": 12,
        "axe": 9,
        "spy": 5,
        "light": 5,
        "heavy": 6,
        "ram": 16,
        "catapult": 16,
        "knight": 5,
        "snob": 30,
    }

    const attack_config = {
        "spear": 0,
        "sword": 0,
        "axe": 0,
        "spy": 10,
        "light": 0,
        "heavy": 0,
        "ram": 0,
        "catapult": 0,
        "knight": 0,
        "snob": 0,
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function sendFarmA(villageA) {
        var coordAtual = TWMap.CoordByXY(villageA);
        TWMap.mapHandler.onClick(coordAtual[0], coordAtual[1], new Event('click'));
        var url = TWMap.urls.ctx["mp_farm_a"].replace(/__village__/, villageA.id).replace(/__source__/, game_data.village.id);
        TribalWars.get(url, null, function (a) { TWMap.context.ajaxDone(null, url); }, undefined, undefined);
    }

    const attack = async (tgt_village) => {
        var tgt_coord = TWMap.CoordByXY(tgt_village.xy);
        TWMap.mapHandler.onClick(tgt_coord[0], tgt_coord[1], new Event('Click'));
        await delay(400);
        mp_att.click()
        await delay(600);

        if(attack_config.spear > 0){
            unit_input_spear.value = attack_config.spear
        }
        if(attack_config.sword > 0){
            unit_input_sword.value = attack_config.sword
        }
        if(attack_config.axe > 0){
            unit_input_axe.value = attack_config.axe
        }
        if(attack_config.spy > 0){
            unit_input_spy.value = attack_config.spy
        }
        if(attack_config.light > 0){
            unit_input_light.value = attack_config.light
        }
        if(attack_config.heavy > 0){
            unit_input_heavy.value = attack_config.heavy
        }
        if(attack_config.ram > 0){
            unit_input_ram.value = attack_config.ram
        }
        if(attack_config.catapult > 0){
            unit_input_catapult.value = attack_config.catapult
        }
        if(attack_config.knight > 0){
            unit_input_knight.value = attack_config.knight
        }
        if(attack_config.snob > 0){
            unit_input_snob.value = attack_config.snob
        }

        target_attack.click()
        await delay(400);
        if (typeof troop_confirm_submit  !== 'undefined'){
            troop_confirm_submit.click()
        }else{
            popup_box_popup_command.children[0].click()
        }
    }


    var villages = TWMap.villages;
    var vk = TWMap.villageKey;
    var key = {};
    var keySorted = {};
    var contador = 0;
    var tempo = 1400;
    var x = 0;
    var altAldTempo = aleatorio(180000, 300000);
    //var altAldTempo = aleatorio(30000,60000);

    function aleatorio(superior, inferior) {
        var numPosibilidades = superior - inferior;
        var aleat = Math.random() * numPosibilidades;
        return Math.round(parseInt(inferior) + aleat);
    }

    for (var j in vk) {
        key[contador] = vk[j];
        contador++;
    }

    var indice = 0;
    for (var s = 0; s <= contador; s++) {
        var coordsA = TWMap.CoordByXY(key[s]);
        var villageA = TWMap.context.FATooltip.distance(game_data.village.x, game_data.village.y, coordsA[0], coordsA[1]);

        indice = 0;

        for (var sb = 0; sb < contador; sb++) {

            var coordsB = TWMap.CoordByXY(key[sb]);
            var villageB = TWMap.context.FATooltip.distance(game_data.village.x, game_data.village.y, coordsB[0], coordsB[1]);

            if (villageA > villageB) {
                indice++;
            }
        }
        keySorted[indice] = key[s];
    }

    key = keySorted;


    let units_keys = game_data.units
    let units = TWMap.current_units
    for(var k in units_keys){
        units[k] = parseInt(units[k])
    }


    let friends = TWMap.friends
    let non_atackable = TWMap.non_attackable_players
    let players = TWMap.players
    let my_tribe = game_data.player.ally
    let tribes = TWMap.allies
    let commands = TWMap.commandIcons
    let skip_tribe = []
    let reservations = TWMap.reservations

    var target_list = []
    var tgt_tribes = []
    var tgt_tribes_str = []
    var under_attack = [11585]
    
    for(var idx in TWMap.allyRelations){
        let data = TWMap.allyRelations[idx]
        if (data == "partner"){
            // console.log(`Skipping ${idx}`)
            skip_tribe.push(idx)
        }
    }

    for(var village_id in commands){
        for(var cmd_idx in commands[village_id]){
            let cmd = commands[village_id][cmd_idx]
            if (cmd.img == "attack"){
                under_attack.push(TWMap.villageKey[village_id])
            }
        }
    }
    
    const maxPts = parseInt(prompt("Pontuação Máxima (apenas números)", "200"))
    const maxDist = parseInt(prompt("Distancia Máxima (-1 = sem limite)", "-1"))

    for (var k in key) {
        if (key[k]) {

            var tgt_village = villages[key[k]];
            var coords = TWMap.CoordByXY(tgt_village.xy)

            //Filter Barb
            if (tgt_village.owner == "0") {
                // target_list.push(tgt_village)
            
                // if(target_list.length >= 3){
                //     break
                // }

                continue
            }

            //Filter Player Points
            if (parseInt(players[tgt_village.owner].points.split('.').join("")) > maxPts) {
                continue
            }

            //Filter Distance
            if (maxDist > 0 && TWMap.context.FATooltip.distance(game_data.village.x, game_data.village.y, coords[0], coords[1]) > maxDist) {
                continue
            }

            // Skip non atackable
            if (non_atackable.includes(tgt_village.owner)) {
                continue
            }

            // Skip under my atack
            if (under_attack.includes(tgt_village.xy)) {
                continue
            }

            // Skip same tribe
            if (tgt_village.ally_id == my_tribe || skip_tribe.includes(tgt_village.ally_id)) {
                continue
            }

            if(tribes[tgt_village.ally_id] && parseInt(tribes[tgt_village.ally_id].points.split('.').join("")) >= 4*maxPts){
                continue
            }

            // Slip Friends
            if (friends[tgt_village.owner]) {
                continue
            }

            target_list.push(tgt_village)

            if (tribes[tgt_village.ally_id] != null){
                if (!tgt_tribes.includes(tgt_village.ally_id)){
                    tgt_tribes.push(tgt_village.ally_id)
                    tgt_tribes_str.push(tribes[tgt_village.ally_id].name + "tribe pts: " + tribes[tgt_village.ally_id].points + " id: " + tgt_village.ally_id)
                }
            }
            
            console.log(tgt_village)
            // if(target_list.length >= 3){
            //     break
            // }
        }

    }

    let REALLY = confirm(`Achei ${target_list.length} alvos. Inclui as tribos: \n -${tgt_tribes_str.join("\n - ")}\n. Deseja atacar?`)

    if (REALLY){

        for (const tgt_village of target_list) {
            var tempoAgora = (tempo * ++x) - aleatorio(150, 300);
            setTimeout(function () {
                attack(tgt_village)
            }, tempoAgora);
        }
    }
        
    function altAldeia() {
        location.reload();
    }

    setInterval(altAldeia, altAldTempo);
});