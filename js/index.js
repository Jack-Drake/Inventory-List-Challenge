//load the side panel on window ready
window.addEventListener('DOMContentLoaded', (event) => {
    //retrieve the data from the server ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            console.log(this.responseText);
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 4}));
});

function viewInventory(e) {
    //change to selected
    e.style.backgroundColor = "#42A5F5";

    //hide the the No Inventory Selected & styling
    document.getElementById('no_inventory_msg').style.display = "none";
    //document.getElementById('no_inventory_msg').parentElement.classList.toggle('no_inventory_msg_styling');

    //show the inventory information div
    document.getElementById('inventory_information').classList.remove('d-none');

    //inventory id from the side panel
    var inventoryId = 111;

    //retrieve the data from the server ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            console.log(this.responseText);
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 3, "inventoryId": inventoryId}));

    //get ID from ajax call and set save buttons to their values
    document.getElementById('save_Inventory').value = inventoryId;
}

function createInventory(){
    //shows modal and collect the information that was written
    var name = document.getElementById('create_inventory_name').children[0];
    var quantity = document.getElementById('create_inventory_quantity').children[0];
    var description = document.getElementById('create_inventory_description').children[0];
    var location = document.getElementById('create_inventory_location').children[0];

    //check that the fields are all filled
    if(name.value == "" || quantity.value == "" || description.value == "" || location.value == ""){
        return;
    }

    //make ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            console.log(this.responseText);
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 1, "name": name.value, "quantity": quantity.value, "description": description.value, "location": location.value}));
}

function editInventory() {
    //save their current values under the innerhtml
    var curValueQuantity = document.getElementById('inventory_quantity').innerHTML;
    var curValueDescription = document.getElementById('inventory_description').innerHTML;
    var curValueLocation = document.getElementById('inventory_location').innerHTML;

    //change to inputs
    document.getElementById('inventory_quantity').innerHTML = "<input class='form-control' value='" + curValueQuantity + "'>";
    document.getElementById('inventory_description').innerHTML = "<textarea class='form-control'>" + curValueDescription + "</textarea>";
    document.getElementById('inventory_location').innerHTML = "<input class='form-control' value='" + curValueLocation + "'>";

    //hide edit button and show save button
    document.getElementById('edit_Inventory').classList.toggle('d-none');
    document.getElementById('save_Inventory').classList.toggle('d-none');
}

function saveInventory() {
    //save inventory id
    var inventoryId = document.getElementById('save_Inventory').value;

    //get the values from the inputs and undo edit inventory back to actual text
    var newValueQuantity = document.getElementById('inventory_quantity').children[0].value;
    var newValueDescription = document.getElementById('inventory_description').children[0].value;
    var newValueLocation = document.getElementById('inventory_location').children[0].value;

    //console.log(newValueQuantity);
    //change the inputs back to their original form
    document.getElementById('inventory_quantity').innerHTML = newValueQuantity;
    document.getElementById('inventory_description').innerHTML = newValueDescription;
    document.getElementById('inventory_location').innerHTML = newValueLocation;

    //hide save button and edit button
    document.getElementById('edit_Inventory').classList.toggle('d-none');
    document.getElementById('save_Inventory').classList.toggle('d-none');

    //make ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            console.log(this.responseText);
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 2, "inventoryId": inventoryId, "quantity": newValueQuantity, "description": newValueDescription, "location": newValueLocation}));
}