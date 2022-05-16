//load the side panel on window ready
window.addEventListener('DOMContentLoaded', (event) => {
    //retrieve the data from the server ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            var json = JSON.parse(this.responseText);

            //show the inventory
            for(var i = 0; i < json.length; i++){
                document.getElementById('inventoryListing').innerHTML += `<div onclick="viewInventory(this);" class="row inventory p-1">
                                                                            <div class="col-10">
                                                                                <h5 value="`+ json[i][0] +`">`+ json[i][1] +`</h5>
                                                                            </div>
                                                                            <div class="col-2">
                                                                                <img width="10" src="assets/arrow-point-to-right.png">
                                                                            </div>
                                                                        </div>`;
            }
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 4}));
});

//view the inventory
var clickedOn = null;
function viewInventory(e) {
    if(clickedOn != null){
        clickedOn.style.backgroundColor = "";
    }

    //save the clicked on
    clickedOn = e;

    //change to selected
    e.style.backgroundColor = "#42A5F5";

    //hide the the No Inventory Selected & styling
    document.getElementById('no_inventory_msg').style.display = "none";

    //show the inventory information div
    document.getElementById('inventory_information').classList.remove('d-none');

    //inventory id from the side panel
    var inventoryId = e.children[0].children[0].getAttribute('value');

    //retrieve the data from the server ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            var json = JSON.parse(this.responseText);

            //save the info into the viewer
            document.getElementById('inventory_name').innerHTML = json[1];
            document.getElementById('inventory_quantity').innerHTML = json[2];
            document.getElementById('inventory_description').innerHTML = json[3];
            document.getElementById('inventory_location').innerHTML = json[4];

            //get ID from ajax call and set save buttons to their values
            document.getElementById('save_Inventory').value = inventoryId;
            document.getElementById('delete_Inventory').value = inventoryId;
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 3, "inventoryID": inventoryId}));
}

//create inventory
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
            if(this.responseText == 1){
                //refresh page
                window.location.reload();
            }
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 1, "name": name.value, "quantity": quantity.value, "description": description.value, "location": location.value}));
}

//converts the non inputs to inputs
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
    document.getElementById('delete_Inventory').classList.toggle('d-none');
    document.getElementById('save_Inventory').classList.toggle('d-none');
}

//saves the inventory after changes
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
    document.getElementById('delete_Inventory').classList.toggle('d-none');
    document.getElementById('save_Inventory').classList.toggle('d-none');

    //make ajax call
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            if(this.responseText !== 1){
                //display error
                console.log(this.responseText);
            }
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 2, "inventoryID": inventoryId, "quantity": newValueQuantity, "description": newValueDescription, "location": newValueLocation}));
}

//delete inventory
function deleteInventory(inventoryID){
    //delete the inventory from the server
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //response text
            console.log(this.responseText);
            if(this.responseText == 1){
                //refresh page
                window.location.reload();
            }
        }
    };

    //send the request
    xhttp.open("POST", "php/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"type": 5, "inventoryID": inventoryID.value}));
}