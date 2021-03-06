<?php
class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('inventory.db');
    }
}

$db = new MyDB();
if (!$db) {
    echo $db->lastErrorMsg();
} else {
    $tableIfNotExists = <<<EOF
        CREATE TABLE IF NOT EXISTS inventory(
            inventoryID VARCHAR(14) PRIMARY KEY,
            inventoryName TEXT,
            inventoryQuantity INT,
            inventoryDescription TEXT,
            inventoryLocation TEXT
        );
    EOF;

    $result = $db->exec($tableIfNotExists);
    if (!$result) {
        echo $db->lastErrorMsg();
        exit;
    }
}

//store origin payload prior to cleansing
$payload_uncleansed = @file_get_contents('php://input');

//check if the post data is present otherwise send to 404 not found
if (!empty($payload_uncleansed)) {
    $json = json_decode($payload_uncleansed, true);

    //switch statement for identifying which type of request is being made
    switch ($json['type']) {
        case 1:
            //create Inventory
            $insert = "INSERT INTO inventory VALUES('" . date('YmdHis') . "', '" . $json['name'] . "', '" . $json['quantity'] . "', '" . $json['description'] . "', '" . $json['location'] . "')";

            $result = $db->exec($insert);
            if (!$result) {
                echo $db->lastErrorMsg();
                exit;
            } else {
                echo 1;
            }
            break;
        case 2:
            //save Inventory
            $update = "UPDATE inventory SET inventoryQuantity = ". $json['quantity'] .", inventoryDescription = '". $json['description'] ."', inventoryLocation = '". $json['location'] ."' WHERE inventoryID = '". $json['inventoryID'] ."'";

            $result = $db->exec($update);
            if (!$result) {
                echo $db->lastErrorMsg();
                exit;
            } else {
                echo 1;
            }
            break;
        case 3:
            //Select specific Inventory
            $select = "SELECT * FROM inventory WHERE inventoryID = '" . $json['inventoryID'] . "'";

            $result = $db->query($select);
            if (!$result) {
                echo $db->lastErrorMsg();
                exit;
            } else {
                $row = $result->fetchArray(SQLITE3_ASSOC);
                echo json_encode(array($row['inventoryID'], $row['inventoryName'], $row['inventoryQuantity'], $row['inventoryDescription'], $row['inventoryLocation']));
            }
            break;
        case 4:
            //Select all Inventory
            $select = "SELECT inventoryID, inventoryName FROM inventory";

            $result = $db->query($select);
            if (!$result) {
                echo $db->lastErrorMsg();
                exit;
            } else {
                $allInventory = array();
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    array_push($allInventory, array($row['inventoryID'], $row['inventoryName']));
                }
                echo json_encode($allInventory);
            }
            break;
        case 5:
            //delete Inventory
            $delete = "DELETE FROM inventory WHERE inventoryID = '". $json['inventoryID'] ."'";

            $result = $db->exec($delete);
            if (!$result) {
                echo $db->lastErrorMsg();
                exit;
            } else {
                echo 1;
            }
            break;
    }
} else {
    //http response 404
    http_response_code(404);
    exit;
}
