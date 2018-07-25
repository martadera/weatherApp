<?php



  error_reporting(E_ERROR);


  

  $response = file_get_contents($_GET['address']);

  if (!$response) {
    $response->error = 'Wrong City';
    echo json_encode($response); 
  }

  else {
    echo $response;
  }