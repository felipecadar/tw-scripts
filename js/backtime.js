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

function getTimeString(ms){
    const htoms = 1000*60*60
    const mtoms = 1000*60
    const stoms = 1000

    const h = parseInt(ms/htoms)
    const mi = parseInt((ms - (h*htoms))/ mtoms)
    const s = parseInt((ms - (mi*mtoms) - (h*htoms))/ stoms)
    const m = parseInt(ms - (mi*mtoms) - (h*htoms) - (s*stoms))

    return `${h}h ${mi}m ${s}s, ${m}ms`
}

const defender_text = document.querySelector("#content_value > table > tbody > tr:nth-child(5) > td:nth-child(2) > span")
const attacker_text = document.querySelector("#content_value > table > tbody > tr:nth-child(3) > td:nth-child(2) > span")

const defender = parseCoord(defender_text.substring(defender_text.length-12,defender_text.length-5))
const attacker = parseCoord(attacker_text.substring(attacker_text.length-12,attacker_text.length-5))

const fields = calculateFiels(attacker, defender)
const times = movingTime(fields)

const now = getDateNow()