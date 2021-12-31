//Intial Show Cart
function updateCart(flag) {
    if (flag == 1) {
        var cartItem = document.getElementsByClassName("Cart-Items")
        for (let i = cartItem.length - 1; i >= 0; i--) {
            cartItem[i].remove();
        }
    }
    var localSto = localStorage.getItem("myCart");
    var totalItems = document.getElementsByClassName('items')[0];
    var totalAmount = document.getElementsByClassName('total-amount')[0];
    var ti = 0, ta = 0;
    if (localSto == null) {
        totalAmount.innerText = "$0.00";
        totalItems.innerText = "0 items";
        var amount_item = { totalAmount: 0, totalItems: 0 }
        window.localStorage.setItem("amount_item", JSON.stringify(amount_item));
    }
    else {
        localSto = JSON.parse(localSto)
        for (let i = 0; i < localSto.length; i++) {
            var cartItem = document.createElement('div');
            cartItem.classList.add('Cart-Items');
            var cartContainer = document.getElementsByClassName("Cart-Body");
            var cartRowContents = `
                <div class="image-box">
                    <img src="images/${localSto[i].img}" />
                </div>
                <div class="about">
                    <h1 class="title">${localSto[i].fruit}</h1>
                </div>
                <div class="counter">
                <button class="btn" onclick="addToCart(this)">+</button>
                <div class="count">${localSto[i].count}</div>
                    <button class="btn" onclick="deleteFromCart(this)">-</button>
                </div>
                <div class="prices">
                    <div class="amount">$${localSto[i].price}</div>
                    <button class="remove" onclick="deleteProduct(this)"><u>Remove</u></button>
                </div>
                    `
            cartItem.innerHTML = cartRowContents;
            //console.log(cartItem)
            cartContainer[0].append(cartItem);
            ti += localSto[i].count
            ta += localSto[i].count * localSto[i].price
        }

        totalAmount.innerText = "$ " + ta.toPrecision(5);

        totalItems.innerText = ti + " items";
        var amount_item = { totalAmount: ta.toPrecision(5), totalItems: ti }
        window.localStorage.setItem("amount_item", JSON.stringify(amount_item));
    }

}

//Add To Cart
function addToCart(row) {
    var d = row.parentNode.parentNode;
    var fruit = d.children[1]
    var fruitValue = fruit.innerText
    let arr = []
    let flag = 0
    var localSto = localStorage.getItem("myCart");
    localSto = JSON.parse(localSto)
    for (let i = 0; i < localSto.length; i++) {
        //console.log(localSto[i].fruit)
        arr.push(localSto[i])
        if (localSto[i].fruit == fruitValue) {
            localSto[i].count += 1
        }
        window.localStorage.setItem("myCart", JSON.stringify(arr));
    }
    updateCart(1);
}

//Delete Product From Cart
function deleteFromCart(row) {
    var d = row.parentNode.parentNode;
    var fruit = d.children[1]
    var fruitValue = fruit.innerText
    let arr = []
    var localSto = localStorage.getItem("myCart");
    if (localSto == null) {
        return;
    }
    else {
        localSto = JSON.parse(localSto)
        for (let i = 0; i < localSto.length; i++) {
            arr.push(localSto[i])
            if (localSto[i].fruit == fruitValue && localSto[i].count > 0) {
                localSto[i].count -= 1
                if (localSto[i].count == 0) {
                    arr.pop(localSto[i])
                }
            }
        }
        window.localStorage.setItem("myCart", JSON.stringify(arr));
    }
    updateCart(1);
}

//Delete Product from Cart
function deleteProduct(row) {
    var d = row.parentNode.parentNode;
    var fruit = d.children[1]
    var fruitValue = fruit.innerText
    let arr = []
    var localSto = localStorage.getItem("myCart");
    if (localSto == null) {
        return;
    }
    else {
        localSto = JSON.parse(localSto)
        for (let i = 0; i < localSto.length; i++) {
            arr.push(localSto[i])
            if (localSto[i].fruit == fruitValue && localSto[i].count > 0) {
                arr.pop(localSto[i])
            }
        }
        window.localStorage.setItem("myCart", JSON.stringify(arr));
    }
    updateCart(1);
}

//Clear Cart
function clearCart() {
    localStorage.removeItem("myCart");
    var totalAmount = document.getElementsByClassName('total-amount')[0];
    totalAmount.innerText = "$0.00";
    var totalItems = document.getElementsByClassName('items')[0];
    totalItems.innerText = "0 items";
    updateCart(1);
}