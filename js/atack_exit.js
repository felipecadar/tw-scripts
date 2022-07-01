javascript: "use strict";

$(document).ready(function () {

    function atack(){
        troop_confirm_submit.click()
    }

    const now = (new Date)
    const default_time = `${now.getFullYear()},${now.getMonth()+1},${now.getDay()},${now.getHours()},${now.getMinutes()},${now.getSeconds()},000`
    const target_time_string = prompt("Tempo de saída: \"ano,mes,dia,hora,minuto,segundo,milisegundo\" ", default_time)
    const s = target_time_string.split(",")

    const ano = parseInt(s[0])
    const mes = parseInt(s[1]) - 1
    const dia = parseInt(s[2])
    const hora = parseInt(s[3])
    const minuto = parseInt(s[4])
    const segundo = parseInt(s[5])
    const milisegundo = parseInt(s[6]) 

    const tgt_date = new Date(ano, mes, dia, hora, minuto, segundo, milisegundo)

    while(true){
        if(tgt_date <= (new Date())){
            atack()
            break;
        }
    }

})