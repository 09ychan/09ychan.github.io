var people = 0;

function CreateRow(){
    people++;
    console.log(people);
<<<<<<< HEAD
=======
    var betting_options = ["Number", "Even", "Odd", "Green", "Red", "Black"];
>>>>>>> aeef703f4432a819dd9c0d97358e37943f4869bf
    // Find a <table> element with id="myTable":
    let betting_options = ["Odd","Even","Green", "Red"];
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
    select.setAttribute("onchange", "numField("+people+")")

    for (const choice of betting_options){
        let option = document.createElement("option");
        option.value = choice;
        option.text = choice.charAt(0).toUpperCase() + choice.slice(1);
        select.appendChild(option);
    }

    // Create number input field:
    let numInput = document.createElement("input");
    numInput.setAttribute("class", "numBetInput");
    numInput.setAttribute("id", "numTextField_" + people);
    numInput.setAttribute("type", "number");

    //create input for amount
    let amount_input = document.createElement("input");
    amount_input.setAttribute("onchange","calculate_remainder("+people+")");
    amount_input.placeholder = "Amount to bet";
    amount_input.setAttribute("id", "amount_" + people);
    amount_input.setAttribute("type","number");
    amount_input.setAttribute("class","amount_input");


    // Fill out the new cells with created elements:
    cell0.innerHTML = new_name;
    cell1.appendChild(select);
    cell1.appendChild(numInput)
    cell2.appendChild(amount_input);
    cell3.innerHTML = 1000;
    cell3.title = cell3.innerHTML;

}

function calculate_remainder(id){
    let amount = "amount_" + id;
    let bettingAmount = document.getElementById(amount).value;
    let totalAmount = document.getElementById("totalBalance_" + id).title;
    bettingAmount = Number(bettingAmount);
    totalAmount = Number(totalAmount);

    if (bettingAmount > totalAmount){
        alert("You cannot bet this much. It is more than you have.");
    }else{
        totalAmount = totalAmount - bettingAmount;

        document.getElementById("totalBalance_" + id).innerHTML = totalAmount;
    }

}

window.onload = function(){
    let betting_options = ["Odd","Even","Green", "Red"];
    create_dropdown_result(betting_options);
    let nameInput = document.getElementById("new_name_input");
    let rouletteSubmitButton = document.getElementById("submitRouletteResult");

    nameInput.addEventListener("change",CreateRow);
    rouletteSubmitButton.addEventListener("click", Roulette);
};

function Roulette(){
    let colour = document.getElementById("coloursDropdown").value;
    let number = document.getElementById("rouletteNumber").value;
    let odd = new Boolean(false);

    if (number > 36 || number < 0){
        alert("There are only numbers 0 - 36 on a roulette wheel, silly.");
        //return null;
    }
<<<<<<< HEAD
};
=======

    if (number % 2 != 0){
        odd = true;
    }

    for (var i = 1; i <= people; i++){
        let totalBalance = document.getElementById("totalBalance_" + i);
        let playerBettingAmount = document.getElementById("amount_" + i);
        let tRow = document.getElementById("bettingChoice_" + i);
        let playerChoice = tRow.value;

        if (playerChoice == "Number"){
            let numberInput = document.getElementById("numTextField_" + i).value;
            if (number == numberInput){
                //Add money
            }
        }

        else if (playerChoice == "Odd" && odd == true){
            console.log("Odd");
        }

        else if (playerChoice == "Even" && odd == false){
            console.log("Even");
        }

        else if (playerChoice == "Red" && colour == "Red"){
            console.log("Someone got Red!");
        }

        else if (playerChoice == "Black" && colour == "Black"){
            console.log("Someone got Black!");
        }

        else if (playerChoice == "Green" && colour == "Green"){
            console.log("Someone got Money!");
        }
    }
}
>>>>>>> aeef703f4432a819dd9c0d97358e37943f4869bf

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

<<<<<<< HEAD
};

function create_dropdown_result(betting_options){
    let select = document.getElementById("result_dropdown");
    for (const choice of betting_options){
        let option = document.createElement("option");
        option.value = choice;
        option.text = choice.charAt(0).toUpperCase() + choice.slice(1);
        select.appendChild(option);
    }
};
=======
}

function numField(num){
    let dropdown = document.getElementById("bettingChoice_" + num).value;
    let num_Field = document.getElementById("numTextField_" + num);

    if (dropdown == "Number"){
        num_Field.style.display = "initial";
    }

    else{
        num_Field.style.display = "none";
    }
}
>>>>>>> aeef703f4432a819dd9c0d97358e37943f4869bf
