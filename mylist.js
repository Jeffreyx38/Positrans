

function htmlState(json)
{
    var tb = ""
    tb += "<table><tr><th>Date</th><th id=\"blank\">hellloooooo</th><th>Observation</th></tr>"

    for(var i = 0; i < json.length; i++)
    {
        tb += "</td><td align= \"center\" > " + json[i].DATE.split("T", 1) + "</td>"
        tb += "</td><td> "+ json[i].DATE.split(" ", 0) + " </td>"
        tb += "</td><td align= \"left\"> " + json[i].OBSERVATION + " </td></tr>"        
    }

    document.getElementById("text").innerHTML = tb + "</table>"
}


function request(){
    var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //document.getElementById("data").innerHTML = this.responseText;
          console.log(JSON.parse(this.responseText));
          htmlState(JSON.parse(this.responseText));
        }
      };
      xhttp.open("GET", "/getobservation", true);
      xhttp.send();

}

//document.getElementById("text").addEventListener("onload", request);


