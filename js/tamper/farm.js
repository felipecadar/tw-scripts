// ==UserScript==
// @name         FARM
// @namespace    https://*tribalwars*/
// @version      2024-05-09
// @description  Farm with model B
// @author       eucadar
// @match        https://br127.tribalwars.com.br/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const isFarmScreen = window.location.search.includes("screen=am_farm");

    function sendAll(templates_idx) {
        const templates = Accountmanager.farm.templates;
        // [t_5221: {…}, t_6451: {…}]
        // get int of names
        const templates_ids = Object.keys(templates)
        .filter((key) => key.includes("t_"))
        .map((key) => parseInt(key.replace("t_", "")));

        // get all ids that start with village_{number} from html
        const villages = Array.from(
            document.querySelectorAll("tr[id^='village_']")
        ).map((village) => parseInt(village.id.replace("village_", "")));

        // send units to all villages. One every 3 seconds
        let i = 0;
        const interval = setInterval(() => {
            if (i < villages.length) {
                Accountmanager.farm.sendUnits(
                    this,
                    villages[i],
                    templates_ids[templates_idx]
                );
                i++;
            } else {
                clearInterval(interval);
            }
        }, 500);
    }

    if (isFarmScreen) {
        // create button
        // <input class="btn" type="submit" value="Salvar">
        const buttonA = document.createElement("input");
        buttonA.className = "btn";
        buttonA.value = "Send A";
        buttonA.onclick = () => sendAll(0);

        const buttonB = document.createElement("input");
        buttonB.className = "btn";
        buttonB.value = "Send B";
        buttonB.onclick = () => sendAll(1);

        const table = document.querySelector("#am_widget_Farm > div");
        // add to the top
        table.prepend(buttonA);
        table.prepend(buttonB);
    }



})();