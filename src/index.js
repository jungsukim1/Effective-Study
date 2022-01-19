import React, { Compnent } from 'react';
// var myName = window.prompt("Do you want to play the game?");

// console.log(myName);

document.getElementById("myButton").onclick = function(){

    var myName = document.getElementById("myText").value;

    console.log("hello",myName);

}

