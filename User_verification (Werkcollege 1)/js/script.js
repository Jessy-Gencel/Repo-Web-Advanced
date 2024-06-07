form = document.getElementById( 'form' );
submit = document.getElementById( "submit" ) ;
feedback = document.getElementById("feedback")
usernamebox = document.getElementById("username")
passwordbox = document.getElementById("password")
password_controlbox = document.getElementById("password_control")
emailbox = document.getElementById("email")
agebox = document.getElementById("age")
errormessage = ""

form.addEventListener('submit', function (event) {
    event.preventDefault()
    }
)
submit.addEventListener("click", function(){
    inputCheck(usernamebox.value, passwordbox.value, password_controlbox.value, agebox.value , emailbox.value)
    }
)
usernamebox.addEventListener("blur", function(){
    let name = document.getElementById("username").value;
    validateUsername(name)
})
passwordbox.addEventListener("blur",function(){
    let password = document.getElementById("password").value;
    validatePassword(password)}
    ) 
password_controlbox.addEventListener("blur", function(){
    let password = document.getElementById("password").value;
    let password_control = document.getElementById("password_control").value;
    validatePasswordControl(password,password_control)
})
emailbox.addEventListener("blur",function(){
    let email = document.getElementById("email").value;
    validateEmail(email)
})
agebox.addEventListener("blur",function(){
    let age = document.getElementById("age").value;
    validateAge(age)
})

function inputCheck(name, password, password_control, age , email) {
    validateUsername(name);
    validatePassword(password);
    validatePasswordControl(password, password_control);
    validateEmail(email);
    validateAge(age);
    validateTerms();
}

function validateUsername(name) {
    if (name.length < 3 || name === "") {
        errormessage = "Username must be at least 3 characters long.";
        unsuccessful_submit(errormessage,document.getElementById("username"));
    } else {
        correctField(document.getElementById("username"));
    }
}

function validatePassword(password) {
    if (password.length < 6 || password === "") {
        errormessage = "Password must be at least 6 characters long.";
        unsuccessful_submit(errormessage, document.getElementById("password"));
    } else {
        correctField(document.getElementById("password"));
    }
}

function validatePasswordControl(password, password_control) {
    if (password != password_control || password_control == "") {
        errormessage = "Password and password control must be the same.";
        unsuccessful_submit(errormessage, document.getElementById("password_control"));
    } else {
        correctField(document.getElementById("password_control"));
    }
}

function validateEmail(email) {
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        errormessage = "You must enter a valid email address.";
        unsuccessful_submit(errormessage, document.getElementById("email"));
    } else {
        correctField(document.getElementById("email"));
    }
}

function validateAge(age) {
    currentdate = new Date()
    birthdate = new Date(age)
    ageMiliseconds = currentdate - birthdate
    agedate = new Date (ageMiliseconds); 
    yearsOld = Math.abs(agedate.getUTCFullYear() - 1970);
    if (yearsOld < 18 ||  age == "") { 
        errormessage = "Age must be a number greater than or equal to 18.";
        unsuccessful_submit(errormessage, document.getElementById("age"));
    } else {
        correctField(document.getElementById("age"));
    }
}

function validateTerms() {
    if (!document.getElementById("terms").checked) {
        errormessage = "You must agree with our terms of service.";
        unsuccessful_submit(errormessage, document.getElementById("terms"));
    }
}
function successful_submit(){
    feedback.innerHTML="<p class='success'>Your message has been sent! Thank you for your interest.</p>"
}
function unsuccessful_submit(errormessage,field){
    feedback.innerHTML= errormessage
    field.className = "wrong"
}
function correctField(field) {
    field.className = ""
    feedback.innerHTML=""
}
submit.addEventListener("click", function(){
    if (feedback.innerHTML == ""){
        successful_submit()
    }
})
