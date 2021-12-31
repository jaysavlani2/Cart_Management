var xmlhttp = new XMLHttpRequest();
var url = "file.json";
//Read JSON File
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        print_JSON_Data(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


//Print JSON File On Table
function print_JSON_Data(data) {
    for (let i = 0; i < data.length; i++) {
        var cardItem = document.createElement('div');
        cardItem.classList.add('card-items');
        var cardContainer = document.getElementsByClassName("cards")[0];
        var cardRowContents = `
            <img src="images/${data[i].img}">
            <h1>${data[i].Name}</h1>
            <p class="price">$${data[i].Price}</p>
            <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
            <p><button onclick="addToCart(this)">Add to Cart</button></p>
            `
        cardItem.innerHTML = cardRowContents;
        cardContainer.append(cardItem);
    }
}

//Add Product to Cart
function addToCart(row) {
    var d = row.parentNode.parentNode;
    var img = d.children[0]
    var fruit = d.children[1]
    var price = d.children[2]
    var imgValue = img.src
    imgValue = imgValue.replace("http://127.0.0.1:5500/images/", "");
    var fruitValue = fruit.innerText
    var priceValue = price.innerText
    priceValue = priceValue.replace("$", "");
    cart = {
        fruit: fruitValue,
        price: priceValue,
        img: imgValue,
        count: 1
    }
    let arr = []
    let flag = 0
    var localSto = localStorage.getItem("myCart");
    if (localSto == null) {
        arr[0] = cart
        window.localStorage.setItem("myCart", JSON.stringify(arr));
    }
    else {
        localSto = JSON.parse(localSto)
        for (let i = 0; i < localSto.length; i++) {
            arr.push(localSto[i])
            if (localSto[i].fruit == fruitValue) {
                alert("Item is already in Cart")
                flag = 1
            }
        }
        if (flag != 1) {
            arr.push(cart)
        }

        //console.log(arr)
        window.localStorage.setItem("myCart", JSON.stringify(arr));
    }
}