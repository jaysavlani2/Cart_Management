//Summary
function summary() {
    var cart = document.getElementById("summary");
    if (cart.style.display == 'block') {
        cart.style.display = 'none';
    }
    else {
        cart.style.display = 'block'
    }
    var address = document.getElementById("address").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var localSto = localStorage.getItem("amount_item");
    localSto = JSON.parse(localSto)
    var para = document.getElementById("summaryText");
    var paragraph = `Your Name: ${name} <br>
                    Your Address: ${address} <br>
                    Your Email: ${email}<br>
                    Total Amount: $${localSto.totalAmount}<br>
                    Total Items: ${localSto.totalItems}
                    `;
    para.innerHTML = paragraph;
}