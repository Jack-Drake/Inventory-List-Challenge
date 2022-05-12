function viewInventory(e){
    //change to selected
    e.style.backgroundColor = "#42A5F5";

    //hide the the No Inventory Selected & styling
    document.getElementById('no_inventory_msg').style.display = "none";
    //document.getElementById('no_inventory_msg').parentElement.classList.toggle('no_inventory_msg_styling');

    //show the inventory information div
    document.getElementById('inventory_information').classList.toggle('d-none');

    //retrieve the data from the server ajax call

}