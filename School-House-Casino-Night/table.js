var people = 0;

function CreateRow(){
    people++;
    var betting_options = ["Even", "Odd", "High", "Low", "1st Dozen", "2nd Dozen", "3rd Dozen"];
    // Find a <table> element with id="myTable":
    var table = document.getElementById("body_of_table");
    let new_name = document.getElementById("new_name_input").value;
    document.getElementById("new_name_input").value = "";

    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = table.insertRow();

    // Insert new cells (<td> elements) at the 1st, 2nd, 3rd and 4th position of the "new" <tr> element with ids:
    let cell0 = row.insertCell(0);
    cell0.setAttribute("id", "name_" + people);
    cell0.setAttribute("scope","row");
    cell0.setAttribute("ondblclick", "change_name("+people+")");

    let cell1 = row.insertCell(1);

    let cell2 = row.insertCell(2);
    
    let cell3 = row.insertCell(3);
    cell3.setAttribute("id", "totalBalance_" + people);

    //creates the dropdown
    let select = document.createElement("select");
    select.setAttribute("id", "bettingChoice_" + people);

    for (const choice of betting_options){
        let option = document.createElement("option");
        option.value = choice;
        option.text = choice.charAt(0).toUpperCase() + choice.slice(1);
        select.appendChild(option);
    }

    for (var i = 0; i <= 36; i++){
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }

    //create input for amount
    let amount_input = document.createElement("input");
    amount_input.setAttribute("onchange","calculate_remainder("+people+")");
    amount_input.placeholder = "Amount to bet";
    amount_input.setAttribute("id", "amount_" + people);
    amount_input.setAttribute("type","number");


    // Fill out the new cells with created elements:
    cell0.innerHTML = new_name;
    cell1.appendChild(select);
    cell2.appendChild(amount_input);
    cell3.innerHTML = 1000;
    cell3.title = cell3.innerHTML;

}

function calculate_remainder(id){
    let amount = "amount_" + id;
    let bettingAmount = document.getElementById(amount).value;
    let totalAmount = document.getElementById("totalBalance_" + id).title;

    if (bettingAmount > Number(totalAmount)){
        alert("You can't bet more than you have.");
        return null;
    }

    if (bettingAmount < 0){
        alert ("You can't bet negative numbers.");
        return null;
    }

    totalAmount = totalAmount - bettingAmount;

    document.getElementById("totalBalance_" + id).innerHTML = totalAmount;

}

window.onload = function(){
    var nameInput = document.getElementById("new_name_input");
    var rouletteSubmitButton = document.getElementById("submitRouletteResult");

    nameInput.addEventListener("change",CreateRow);
    rouletteSubmitButton.addEventListener("click", Roulette);
}

function Roulette(){
    let number = document.getElementById("rouletteNumber");
    let odd = new Boolean(false);
    let winners = new Array();
    let amounts = new Array();

    if (number.value == ""){
        return null;
    }

    if (number.value > 36 || number.value < 0){
        alert("There are only numbers 0 - 36 on a roulette wheel, silly.");
        return null;
    }

    if (number.value % 2 != 0){
        odd = true;
    }

    for (var i = 1; i <= people; i++){
        let totalBalance = document.getElementById("totalBalance_" + i);
        let playerBettingAmount = document.getElementById("amount_" + i);
        let playerChoice = document.getElementById("bettingChoice_" + i).value;
        let currentTotal = totalBalance.innerHTML;
        let multiplier = 0;

        if (playerBettingAmount.value == ""){
            continue;
        }

        if (playerChoice == "Odd" && odd == true){
            multiplier = 2;
        }

        else if (playerChoice == "Even" && odd == false){
            multiplier = 2;
        }

        else if (playerChoice == "High" && number.value >= 19){
            multiplier = 2;
        }

        else if (playerChoice == "Low" && number.value <= 18){
            multiplier = 2;
        }

        else if (playerChoice == "1st Dozen" && number.value > 0 && number.value <= 12){
            multiplier = 3;
        }

        else if (playerChoice == "2nd Dozen" && number.value >= 13 && number.value <= 24){
            multiplier = 3;
        }

        else if (playerChoice == "3rd Dozen" && number.value >= 25 && number.value <= 36){
            multiplier = 3;
        }

        else{
            if (playerChoice == number.value){
                multiplier = 36;
            }
        }

        if (multiplier != 0){
            winners.push(document.getElementById("name_" + i).innerHTML);
            amounts.push(playerBettingAmount.value * multiplier);
        }

        currentTotal = Number(currentTotal) + (playerBettingAmount.value * multiplier);
        totalBalance.title = currentTotal;

        totalBalance.innerHTML = currentTotal;

        playerBettingAmount.value = "";
    }

    number.value = "";

    open_modal(winners, amounts);
}

function change_name(id){
    let original_name = document.getElementById("name_"+id).innerText;
    let output = document.getElementById("name_"+id);
    let input_for_name = document.createElement("input");
    input_for_name.setAttribute('id',"input_for_name");
    input_for_name.value = original_name;
    output.innerText = "";
    output.appendChild(input_for_name);
    output.addEventListener("change",function(){
        let new_name = input_for_name.value;
        if (new_name == ""){
            document.getElementById("body_of_table").deleteRow();
        }
        output.innerText = new_name;
        output.setAttribute("ondblclick", "change_name("+id+")");
    })

}

function open_modal(winners, amounts){
    document.getElementById("winner_div").style.display = "block";
    let section = document.getElementById("modal-people");

    for (var i = 0; i < winners.length; i++){
        let text = document.createElement("P");
        text.innerText = "- " + winners[i] + " won " + amounts[i];

        section.appendChild(text);
    }
}

function close_modal(){
    let section = document.getElementById("modal-people");
    section.textContent = "";

    document.getElementById("winner_div").style.display = "none";
}