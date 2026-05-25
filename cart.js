let quantities = [2,1,1];
let prices = [500,1200,150];
let discount = 0;

/* UPDATE CART */
function updateCart(){

    let subtotal = 0;

    for(let i=0; i<quantities.length; i++){

        let sub = quantities[i] * prices[i];

        document.getElementById("sub"+i).innerText = sub;

        subtotal += sub;
    }

    let total = subtotal - discount;

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("discount").innerText = discount;
    document.getElementById("total").innerText = total;
}

/* SHOW DIALOG */
function showDialog(message){

    document.getElementById("dialogMessage").innerText = message;
    document.getElementById("dialogBox").style.display = "flex";
}

/* CLOSE DIALOG */
function closeDialog(){
    document.getElementById("dialogBox").style.display = "none";
}

/* PROMO CODE FIXED */
function applyPromo(){

    let promoInput = document.getElementById("promoCode");

    let promo = promoInput.value.trim();

    if(promo === "3B50"){

        discount = 200;

        updateCart();

        showDialog("PROMO CODE APPLIED SUCCESSFULLY 🎉");

        promoInput.value = ""; // clear input
    }
    else{

        showDialog("INVALID OR EXPIRED PROMO CODE ❌");
    }
}

/* ENTER KEY SUPPORT */
document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("promoCode").addEventListener("keydown", function(event){

        if(event.key === "Enter"){
            event.preventDefault();
            applyPromo();
        }

    });

});

updateCart();