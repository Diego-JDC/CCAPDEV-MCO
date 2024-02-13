
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