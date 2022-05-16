# Inventory List Challenge
 Shopify Inventory Example to create, manage and remove Inventory Present in Locations
 
## Project Notice
The project requires a working web server, whether it be local or hosted does not matter with a connection to a local mysql server. The project uses HTML, CSS, JS, and  PHP. Modifications to the source files do not ensure that the project will remain working as is. A full break down of the files presented and their use cases are described below. For further information please create an issue in the issues tab.

## Environment Setup
First, please ensure that you have the inventory.db in the php folder. For personal and local we recommend using XAMPP which can be downloaded from this here
```
https://www.apachefriends.org/index.html
```
Please make sure that the server has a PHP version of 7.4

## Project Setup
After the Web Server is setup and running (Note: It is not necessary to launch the mysql server as the database is stored locally in a file), proceed to clone this project and upload the files to the webserver

## index.html
The index page is dynamically constructed from the contents of the inventory stored on the database and is used to delete, create and update the inventory contents. Contents on the page were built using bootstrap framework for html, css, and js front-end

## index.css
Any additional styling was added to this page to ensure that colors and other styling requirements were set for optimal results and viewing. To modify colors, and other attributes this page is your source.

## index.js
This page defines the events that occur during the the editing procees, saving process, and everything in between. 

To modify what occurs when inventory is created modify the function
```
createInventory();
```

To modify what happens when the inventory is deleted modify the function
```
deleteInventory();
```

To change what happens during Editing process modify the function
```
editInventory();
```

To modify what happens when the user Saves modify the function
```
saveInventory();
```

To modify what happens when the user retrieves information for a particular inventory modify the function
```
viewInventory();
```


