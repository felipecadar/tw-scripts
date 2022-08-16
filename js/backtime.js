javascript:
function movingTime(fields){
    return {
        'spear':parseInt(18*fields*60000),
        'sword':parseInt(22*fields*60000),
        'axe':parseInt(18*fields*60000),
        'spy':parseInt(9*fields*60000),
        'light':parseInt(10*fields*60000),
        'heavy':parseInt(11*fields*60000),
        'catapult':parseInt(11*fields*60000),
        'ram':parseInt(30*fields*60000),
        'snob':parseInt(35*fields*60000),
        'knight':parseInt(10*fields*60000),
    }
}

function strToMs(str){
    const htoms = 1000*60*60
    const mtoms = 1000*60
    const stoms = 1000
    var parts = str.split(":")

    const sum = (parseInt(parts[0])*htoms) + (parseInt(parts[1])*mtoms) + (parseInt(parts[2])*stoms)
    if (parts.length == 3){
        return sum
    }else{
        return sum + parseInt(parts[3])
    }
}

function calculateFiels(p1, p2){
    return Math.sqrt( Math.pow((p1[0]-p2[0]), 2) + Math.pow((p1[1]-p2[1]), 2) );
}

function parseCoord(str){
    var parts = str.split("|");
    var coord = [parseInt(parts[0]), parseInt(parts[1])]
    return coord
}

function getDateNow(){
    return new Date(Timing.getCurrentServerTime())
}

function getMsNow(){
    return Timing.getCurrentServerTime()
}


Date.prototype.addTime = function(ms) {
    this.setTime(this.getTime() + ms);
    return this;
}

Date.prototype.subTime = function(ms) {
    this.setTime(this.getTime() - ms);
    return this;
}

Date.prototype.str = function() {
    return `${this.getFullYear()}/${this.getMonth()+1}/${this.getDate()} - ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}:${this.getMilliseconds()}`
}

function strToDate(str){
    const abrev = ["jan.", "fev.", "mar." ,"abr." ,"maio" ,"jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."]

    const parts = str.split(" ")
    const month = abrev.indexOf(parts[0])
    
    const day = parseInt(parts[1])
    const year = parseInt(parts[2])
    const time = parts[4].split(":")
    const h = parseInt(time[0])
    const m = parseInt(time[1])
    const s = parseInt(time[2])
    const ms = parseInt(time[3])

    var date = new Date()

    date.setFullYear(year)
    date.setMonth(month)
    date.setDate(day)
    date.setHours(h)
    date.setMinutes(m)
    date.setSeconds(s)
    date.setMilliseconds(ms)
    return date
}   


const defender_text = document.querySelector("#content_value > table > tbody > tr:nth-child(5) > td:nth-child(2) > span").textContent
const attacker_text = document.querySelector("#content_value > table > tbody > tr:nth-child(3) > td:nth-child(2) > span").textContent
const arrival_text = document.querySelector("#content_value > table > tbody > tr:nth-child(6) > td:nth-child(2)").textContent
const arrival_in_text = document.querySelector("#content_value > table > tbody > tr:nth-child(7) > td:nth-child(2) > span").textContent


const defender = parseCoord(defender_text.substring(defender_text.length-12,defender_text.length-5))
const attacker = parseCoord(attacker_text.substring(attacker_text.length-12,attacker_text.length-5))

const fields = calculateFiels(attacker, defender)
const times = movingTime(fields)

const now = getDateNow()
// const arrival = strToDate(arrival_text)

const tbodyRef = document.querySelector("#content_value > table")
for (key in times){
    var arrival = strToDate(arrival_text)
    arrival.addTime(times[key])

    var row = tbodyRef.insertRow(-1)
    var cell = row.insertCell(-1)

    var text = document.createTextNode(arrival.str());
    var img = UI.Image(`unit/unit_${key}.png`,"")[0]

    cell.setAttribute("colspan", 5)
    cell.appendChild(img)
    cell.appendChild(text)


}

