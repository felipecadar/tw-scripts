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


function parseCoord(str){
    var parts = str.split("|");
    var coord = [parseInt(parts[0]), parseInt(parts[1])]
    return coord
}

function calculateFiels(p1, p2){
    return Math.sqrt( Math.pow((p1[0]-p2[0]), 2) + Math.pow((p1[1]-p2[1]), 2) );
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

function getDateNow(){
    return new Date(Timing.getCurrentServerTime())
}

function getMsNow(){
    return Timing.getCurrentServerTime()
}

// function timetoms()

function atack(){
    troop_confirm_submit.click()
    console.log("Attacking at", new Date())
}

function clearAll(){
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
}

function getTroops(){
    return Place.confirmScreen.getSendUnits()
}

var tbodyRef = document.getElementById("command-data-form").getElementsByClassName("vis")[0].getElementsByTagName('tbody')[0]   

var exitTimeRow = tbodyRef.insertRow(-1);
var exitTimeCell1 = exitTimeRow.insertCell(-1);
var exitTimeCell2 = exitTimeRow.insertCell(-1);

const command_type = Place.confirmScreen.data.type

exitTimeCell1.appendChild(document.createTextNode(`${command_type} at: `));
exitTimeCell2.appendChild(document.createTextNode(''));

var arriveTimeRow = tbodyRef.insertRow(-1);
var arriveTimeCell1 = arriveTimeRow.insertCell(-1);
var arriveTimeCell2 = arriveTimeRow.insertCell(-1);

arriveTimeCell1.appendChild(document.createTextNode('Arrive at:'));
arriveTimeCell2.appendChild(document.createTextNode(''));

var inputRow = tbodyRef.insertRow(-1)


const now = new Date()
var input_names = ["ano","mes","dia","hora","minuto","segundo","milisegundo", "bandeira"]
var input_names_abr = {"ano":"Data","mes":"/","dia":"/","hora":"Hora","minuto":":","segundo":":","milisegundo":":", "bandeira": " Flag%:"}
var input_names_def = {"ano":`${now.getFullYear()}`,"mes":`${now.getMonth()+1}`,"dia":`${now.getDate()}`,"hora":`${now.getHours()}`,"minuto":`${now.getMinutes()}`,"segundo":`${now.getSeconds()}`,"milisegundo":"000", "bandeira":"0"}

var input_fields = {}
var cell = inputRow.insertCell(-1)
cell.setAttribute("colspan", 3)

for (let index = 0; index < input_names.length; index++) {
    const element = input_names[index];

    var label = document.createElement("label")
    label.innerText = input_names_abr[element]

    cell.appendChild(label)
    cell.appendChild(document.createElement("input"))

    const len = cell.childNodes.length

    cell.childNodes[len-1].setAttribute("type", "text");
    cell.childNodes[len-1].setAttribute('size', '3');
    cell.childNodes[len-1].setAttribute('value', input_names_def[element]);

    input_fields[element] = cell.childNodes[len-1]
}

var btn_row = tbodyRef.insertRow(-1)
var btn_cell = btn_row.insertCell(-1)
var cal_btn = document.createElement("button");

cal_btn.innerHTML = "Calcular";
cal_btn.setAttribute('class', 'btn');
cal_btn.setAttribute('type', 'button');
cal_btn.onclick = calculate

btn_cell.appendChild(cal_btn)

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

function strToMs(str){
    const htoms = 1000*60*60
    const mtoms = 1000*60
    const stoms = 1000
    var parts = str.split(":")
    return (parseInt(parts[0])*htoms) + (parseInt(parts[1])*mtoms) + (parseInt(parts[2])*stoms)
}

function calculate(){
    clearAll()

    const send_troops = getTroops()
    const attacker = parseCoord(game_data.village.coord)
    var target_text = ''
    var total_time_text = ''
    var arrival_element = null
    if(command_type == 'support'){
        target_text = document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span").textContent
        total_time_text = document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(4) > td:nth-child(2)").textContent
        arrival_element = document.querySelector("#date_arrival > span")
    }else{
        target_text = document.querySelector("#command-data-form > div:nth-child(9) > table > tbody > tr:nth-child(2) > td:nth-child(2) > span").textContent
    }

    const target = parseCoord(target_text.substring(target_text.length-12,target_text.length-5))
    const fields = calculateFiels(attacker, target)
    const times = movingTime(fields)


    const ano = parseInt(input_fields['ano'].value)
    const mes = parseInt(input_fields['mes'].value)-1
    const dia = parseInt(input_fields['dia'].value)
    const hora = parseInt(input_fields['hora'].value)
    const minuto = parseInt(input_fields['minuto'].value)
    const segundo = parseInt(input_fields['segundo'].value)
    const milisegundo = parseInt(input_fields['milisegundo'].value)
    const flag = parseFloat(input_fields['bandeira'].value) / 100

    const arrival_time = new Date(ano, mes, dia, hora, minuto, segundo, milisegundo)

    var max_time = 0
    for (key in send_troops){
        if (send_troops[key] > 0){
            if(max_time < times[key]){
                max_time = times[key]
            }
        }
    }


    max_time = strToMs(total_time_text)

    console.log(getTimeString(max_time))


    const exit_time = arrival_time.subTime(max_time)

    function updateTable(){
        var test_now = getDateNow()
        var ms = exit_time.getTime() - test_now.getTime()
        if (ms > 100){
             exitTimeCell2.textContent = getTimeString(ms)
        }
        else{
            exitTimeCell2.textContent = "Attacking..."
        }


        var arrival_time_now = test_now.addTime(max_time)
        var estimates_arrival = new Date(exit_time.getTime() + max_time)
        arriveTimeCell2.textContent = estimates_arrival.str()
        arrival_element.textContent = arrival_time_now.str()

    }

    function tryAttack(){
        if(exit_time.getTime() - getMsNow() <= 0){
            atack()
            clearAll()
        }
    }

    console.log("arrival_time", arrival_time)
    console.log("exit_time", exit_time)
    console.log("now_time", getDateNow())

    var t=setInterval(updateTable,200);
    var t=setInterval(tryAttack,50);
}
