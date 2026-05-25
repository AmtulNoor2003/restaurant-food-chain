document.getElementById("checkoutForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let name =
    document.getElementById("name").value;

    let phone =
    document.getElementById("phone").value;

    let address =
    document.getElementById("address").value;

    let payment =
    document.querySelector(
    'input[name="payment"]:checked');

    /* VALIDATION */

    if(name === "" ||
       phone === "" ||
       address === ""){

        showDialog(
        "Missing Fields",
        "Please fill all the fields properly.");

        return;
    }

    if(!payment){

        showDialog(
        "Payment Required",
        "Please select a payment method.");

        return;
    }

    /* SUCCESS */

    showDialog(
    "🎉 Order Placed Successfully",
    "Thank you " + name +
    "!\n\nYour delicious order is being prepared 🍔");

});

/* DIALOG FUNCTION */

function showDialog(title, message){

    document.getElementById("dialogTitle")
    .innerText = title;

    document.getElementById("dialogMessage")
    .innerText = message;

    document.getElementById("dialogBox")
    .style.display = "flex";
}

/* CLOSE */

function closeDialog(){

    document.getElementById("dialogBox")
    .style.display = "none";
}
/* DYNAMIC PAYMENT FIELDS */

function showPaymentFields(type){

    let container =
    document.getElementById("dynamicFields");

    /* CASH */

    if(type === "cash"){

        container.innerHTML = `
        
        <div class="payment-fields">

            <h4>
                Pay Cash At Delivery
            </h4>

            <input type="text"
            placeholder="Optional Delivery Notes">

        </div>
        `;
    }

    /* CARD */

    else if(type === "card"){

        container.innerHTML = `
        
        <div class="payment-fields">

            <h4>
                Card Details
            </h4>

            <input type="text"
            placeholder="Card Holder Name">

            <input type="text"
            placeholder="Card Number">

            <input type="text"
            placeholder="Expiry Date">

            <input type="password"
            placeholder="CVV">

        </div>
        `;
    }

    /* JAZZCASH */

    else if(type === "jazzcash"){

        container.innerHTML = `
        
        <div class="payment-fields">

            <h4>
                JazzCash Details
            </h4>

            <input type="text"
            placeholder="JazzCash Mobile Number">

            <input type="password"
            placeholder="MPIN">

        </div>
        `;
    }

    /* EASYPAISA */

    else if(type === "easypaisa"){

        container.innerHTML = `
        
        <div class="payment-fields">

            <h4>
                EasyPaisa Details
            </h4>

            <input type="text"
            placeholder="EasyPaisa Number">

            <input type="password"
            placeholder="PIN">

        </div>
        `;
    }

    /* BANK */

    else if(type === "bank"){

        container.innerHTML = `
        
        <div class="payment-fields">

            <h4>
                Bank Transfer
            </h4>

            <input type="text"
            placeholder="Bank Name">

            <input type="text"
            placeholder="IBAN / Account Number">

            <input type="text"
            placeholder="Account Holder Name">

        </div>
        `;
    }
}