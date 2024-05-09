function sendAll(templates_idx){
    const templates = Accountmanager.farm.templates
    // [t_5221: {…}, t_6451: {…}]
    // get int of names
    const templates_ids = Object.keys(templates).filter((key) => key.includes("t_")).map((key) => parseInt(key.replace("t_", "")))

    // get all ids that start with village_{number} from html
    const villages = Array.from(document.querySelectorAll("tr[id^='village_']")).map((village) => parseInt(village.id.replace("village_", "")))

    // send units to all villages. One every 3 seconds
    let i = 0
    const interval = setInterval(() => {
        if (i < villages.length) {
            Accountmanager.farm.sendUnits(this, villages[i], templates_ids[templates_idx])
            i++
        } else {
            clearInterval(interval)
        }
    }, 500)
}

// create button
// <input class="btn" type="submit" value="Salvar">
const button = document.createElement("input")
button.className = "btn"
