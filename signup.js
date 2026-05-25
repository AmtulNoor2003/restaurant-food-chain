// SIGNUP FORM

const signupForm = document.querySelector("form");

/* GET INPUTS */

const inputs = document.querySelectorAll(".input-box input");

/* FORM SUBMIT */

signupForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const fullName = inputs[0].value;

    const email = inputs[1].value;

    const phone = inputs[2].value;

    const password = inputs[3].value;

    const confirmPassword = inputs[4].value;

    /* EMPTY CHECK */

    if(
        fullName === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ){

        alert("Please fill all fields!");

        return;
    }

    /* PASSWORD MATCH CHECK */

    if(password !== confirmPassword){

        alert("Passwords do not match!");

        return;
    }

    /* PHONE NUMBER LENGTH */

    if(phone.length < 11){

        alert("Enter valid phone number!");

        return;
    }

    alert("Account Created Successfully 🎉");

    signupForm.reset();

});