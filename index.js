/*var name;
   name = window.prompt("enter your names","");
   document.writeln("hello," + name + ", welcome to javascript programming");

let message =  name +""+'Continue to elie portfolio';
console.log('welcome to rukundo elie portfolio');
alert(message);*/
 
 
  
  window.onload = function () {
    let name = localStorage.getItem("viewerName");

    if (!name) {
      name = prompt("Please enter your name:");
      if (name) {
        alert("Dear " + name);
        localStorage.setItem("viewerName", name);
      }
    }

    if (name) {
      document.getElementById("welcomeText").innerText = "Dear "+ name.toUpperCase()+ ", " + "WELCOME TO MY PORTFOLIO";
    }
  };

