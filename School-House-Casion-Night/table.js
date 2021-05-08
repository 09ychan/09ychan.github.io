var people = 0;

function CreateRow(){
    people++;
    console.log(people);
    var betting_options = ["Odd","Even","Green", "Red"];
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
    cell1.setAttribute("id", "bettingChoice_" + people);

    let cell2 = row.insertCell(2);
    
    let cell3 = row.insertCell(3);
    cell3.setAttribute("id", "totalBalance_" + people);

    //creates the dropdown
    let select = document.createElement("select");
    for (const choice of betting_options){
        let option = document.createElement("option");
        option.value = choice;
        option.text = choice.charAt(0).toUpperCase() + choice.slice(1);
        select.appendChild(option);
    }


    //create input for amount
    let amount_input = document.createElement("input");
    amount_input.setAttribute("onchange","calculate_remainder("+people+")");
    amount_input.placeholder = "Amount to bet";
    amount_input.setAttribute("id", "amount_" + people);
    amount_input.setAttribute("type","number");


    // Add some text to the new cells:
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
    let colour = document.getElementById("coloursDropdown").value;
    let number = document.getElementById("rouletteNumber").value;

    if (number > 36 || number < 0){
        alert("There are only numbers 0 - 36 on a roulette wheel, silly.");
        return null;
    }
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