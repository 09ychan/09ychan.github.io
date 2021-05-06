var people = 0;

function CreateRow(){
    console.log(people);
    var betting_options = ["Odd","Even","Green", "Red"];
    // Find a <table> element with id="myTable":
    var table = document.getElementById("main_table");
    let new_name = document.getElementById("new_name_input").value;

    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = table.insertRow();

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);

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
    amount_input.placeholder = "Amount to bet";


    // Add some text to the new cells:
    cell0.innerHTML = new_name;
    cell1.appendChild(select);
    cell2.appendChild(amount_input);
    cell3.innerHTML = 1000;


}

window.onload = function(){
    var button = document.getElementById("123");
    button.addEventListener("click",CreateRow);
}