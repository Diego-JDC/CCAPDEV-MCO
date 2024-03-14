
// login/register js stuff
function showPass() {
    var togglePass = document.getElementById("passtoggle");
    var password = document.getElementById("password");
    var cpassword = document.getElementById("conf-password");
    if (togglePass.checked == true) {
        var type = "text";
        password.setAttribute("type", type);
        cpassword.setAttribute("type", type);
    } else {
        var type = "password";
        password.setAttribute("type", type);
        cpassword.setAttribute("type", type);

    }
}

function samePass() { //checks if password and confirm password are the same
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("conf-password").value;
    var nextPage = document.getElementById("register");
    if (password != cpassword) {
        alert("passwords should be the same!");
        nextPage.setAttribute("action", "");
    } else if (!password) {
        alert("Enter a Password!!");
        nextPage.setAttribute("action", "");
    } else {
        nextPage.setAttribute("action", "../html/index.html");
    }
}

function hide() {
    var del = document.getElementById("delete");
    del.style.display = 'inline-block';
    return true;
}

function show() {
    var del = document.getElementById("delete");
    del.style.display = 'none';
    return true;
}



