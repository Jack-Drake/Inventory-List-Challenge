<?php
class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('test.db');
    }
}

//store origin payload prior to cleansing
$payload_uncleansed = @file_get_contents('php://input');

//check if the post data is present otherwise send to 404 not found
if (!empty($payload_uncleansed)) {
    var_dump($payload_uncleansed);

    //switch statement for identifying which type of request is being made

} else {
    //http response 404
    http_response_code(404);
    exit;
}
