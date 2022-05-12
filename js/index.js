function viewInventory(e){
    //change to selected
    e.style.backgroundColor = "#42A5F5";

    //hide the the No Inventory Selected & styling
    document.getElementById('no_inventory_msg').style.display = "none";
    //document.getElementById('no_inventory_msg').parentElement.classList.toggle('no_inventory_msg_styling');

    //show the inventory information div
    document.getElementById('inventory_information').classList.toggle('d-none');

    //retrieve the data from the server ajax call


    //get ID from ajax call and set edit and save buttons to their values
    document.getElementById('edit_Inventory').value = "111";
    document.getElementById('save_Inventory').value = "111";
}

function editInventory(){
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

function saveInventory(){
    //get the values from the inputs and undo edit inventory back to actual text
    

    //make ajax call
}