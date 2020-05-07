var errorMessages;
var fullName;
var password;
var pass;

function checkForm() {
    errorMessages = document.getElementById("formErrors").getElementsByTagName("ul")[0];
    errorMessages.innerHTML = "";
    
    var valid = true;
    valid = checkFullName();
    valid = checkEmail();
    valid = checkPassword();

    if (valid === false) {
        document.getElementById("formErrors").style.display = "block";
    }
    else {
        console.log("asasdasd");
        document.getElementById("formErrors").style.display = "none";
        pass = valid;
    }

}

function appendErrorMessage(msg) {
    var message = document.createElement("li");
    message.className = "errorMessage";
    message.innerText = msg;
    errorMessages.appendChild(message);
}

function checkFullName() {
    fullName = document.getElementById("fullName").value;
    if (fullName.length === 0) {
        appendErrorMessage("Missing full name.");
        document.getElementById("fullName").className = "errorInput";
        return false;
    }

    document.getElementById("fullName").className = "";
    return true;
}


function checkEmail() {
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    var email = document.getElementById("email").value;
    if (!pattern.test(email)) {
        appendErrorMessage("Invalid or missing email address.");
        document.getElementById("email").className = "errorInput";
        return false;
    }

    document.getElementById("email").className = "";
    return true;
}


function checkPassword() {
    var passInput = document.getElementById("password");
    var passConfirmInput = document.getElementById("passwordConfirm");
    password = passInput.value;
    var confirmPassword = passConfirmInput.value;

    var valid = true;
    if (password.length < 10 || password.length > 20) {
        valid = false;
        appendErrorMessage("Password must be between 10 and 20 characters.");
    }

    var pattern = /[a-z]/;
    if (!pattern.test(password)) {
        valid = false;
        appendErrorMessage("Password must contain at least one lowercase character.");
    }

    pattern = /[A-Z]/;
    if (!pattern.test(password)) {
        valid = false;
        appendErrorMessage("Password must contain at least one uppercase character.");
    }

    pattern = /[0-9]/;
    if (!pattern.test(password)) {
        valid = false;
        appendErrorMessage("Password must contain at least one digit.");
    }

    if (password !== confirmPassword) {
        valid = false;
        passConfirmInput.className = "errorInput";
        appendErrorMessage("Password and confirmation password don't match.");    
    }
    else {
        passConfirmInput.className = "";
    }

    if (!valid) {
        passInput.className = "errorInput";
    }
    else {
        passInput.className = "";
    }

    return valid;
}

function request(){
    var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("data").innerHTML = this.responseText;
        //   console.log(JSON.parse(this.responseText));
        //   htmlState(JSON.parse(this.responseText));
        }
      };
      xhttp.open("POST", "/register", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("username=" + fullName + "&password=" + password);

}



document.getElementById("submitt").addEventListener("click", function (event) {
    checkForm();
    if(pass){
        request();
    }
    



    // Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});


// document.getElementById("weather").addEventListener("onload", function () {
//     document.getElementById("formErrors").style.display = "block";
// });

