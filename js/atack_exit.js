javascript: "use strict";

$(document).ready(function () {

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

    const now = (new Date)
    const default_time = `${now.getFullYear()},${now.getMonth()+1},${now.getDate()},${now.getHours()},${now.getMinutes()+1},${now.getSeconds()},000`
    const target_time_string = prompt("Hora de saída: \"ano,mes,dia,hora,minuto,segundo,milisegundo\" ", default_time)
    const s = target_time_string.split(",")

    const ano = parseInt(s[0])
    const mes = parseInt(s[1]) - 1
    const dia = parseInt(s[2])
    const hora = parseInt(s[3])
    const minuto = parseInt(s[4])
    const segundo = parseInt(s[5])
    const milisegundo = parseInt(s[6]) 

    const base_data = new Date(0, 0, 1, 0, 0, 0, 0)
    const tgt_date = new Date(ano, mes, dia, hora, minuto, segundo, milisegundo)

    var tbodyRef = document.getElementById("command-data-form").getElementsByClassName("vis")[0].getElementsByTagName('tbody')[0]   

    var newRow = tbodyRef.insertRow(-1);
    var newCell1 = newRow.insertCell(-1);
    var newCell2 = newRow.insertCell(-1);
    var newText1 = document.createTextNode('Attack in:');
    var newText2 = document.createTextNode('TIMETIMETIME');
    newCell1.appendChild(newText1);
    newCell2.appendChild(newText2);

    var offset = new Date()
    function updateTable(){
        var test_now = new Date()
        var ms = tgt_date.valueOf() - test_now.valueOf() + 10800000 //+ base_data.getMilliseconds()
        if (ms > 10800000){
            offset.setTime(ms)
            newCell2.textContent = `${offset.getHours()}h ${offset.getMinutes()}m ${offset.getSeconds()}s, ${offset.getMilliseconds()}ms`
        }
        else{
            newCell2.textContent = "Attacking..."
        }

    }

    function tryAttack(){
        var test_now = new Date()
        if(tgt_date <= (test_now)){
            atack()
            clearAll()
        }
    }

    var t=setInterval(updateTable,100);
    var t=setInterval(tryAttack,100);

})