var names = ["Apple", "Banana", "Grapes", "Lemon", "Pineapple"];
var prices = ["$1.99","$0.99","$2.99","$5.69","$49.99"];
var images= ["images/apple.png","images/banana.png","images/grape.png","images/lemon.png","images/pineapple.png"];

function createElements() {
    var i;
    for(i = 0; i < 5; i++){
        var div = document.createElement('div');
        
        var img = document.createElement('img');
        img.src = images[i];
        div.appendChild(img);

        var header = document.createElement("H2");
        var value = document.createTextNode(names[i]);
        header.appendChild(value);
        div.appendChild(header);

        var header = document.createElement("H3");
        var value = document.createTextNode(prices[i]);
        header.appendChild(value);
        div.appendChild(header);

        var butt = document.createElement('button');
        butt.innerHTML = 'ADD TO CART';
        butt.onclick = function(){
            var imgsrc = this.parentElement.children[0].getAttribute("src");
            var name = this.parentElement.children[1].textContent;
            var price = this.parentElement.children[2].textContent;

            var newObject = {'source':imgsrc, 'itemName':name, 'itemPrice':price};
            localStorage.setItem(name, JSON.stringify(newObject));
            
            setCount();
            notification();
        };
        butt.className = 'button1';
        div.appendChild(butt);

        div.className = "box";
        document.getElementById('page-wrap').appendChild(div);
    }
}

function cartItems(){
    if(localStorage.length > 0){
        for (i = 0; i < localStorage.length; i++){

            var key = localStorage.key(i);
            var item = JSON.parse( localStorage.getItem(key));

            var div = document.createElement('div');
            
            var img = document.createElement('img');
            img.src = item.source;
            div.appendChild(img);

            var name = document.createElement("H2");
            var value = document.createTextNode(item.itemName);
            name.appendChild(value);
            div.appendChild(name);

            var price = document.createElement("H2");
            var priceValue = document.createTextNode(item.itemPrice);
            price.appendChild(priceValue);
            div.appendChild(price);

            var butt = document.createElement('button');
            butt.onclick= function(){
                var name = this.parentElement.children[1].textContent;
                localStorage.removeItem(name);
                location.reload(); 
            };
            butt.className = 'button2';
            div.appendChild(butt);

            div.className = "cart-item";
            document.getElementById('page-wrap').appendChild(div);
        }
    }
    else{
        var empty = document.createElement('h3');
        empty.innerHTML = "No items in cart";
        empty.className = "empty-message";
        document.getElementById('page-wrap').appendChild(empty);
    }
    
}

function emptyCart(){
    window.localStorage.clear();
    location.reload(); 
}

function notification(){
    document.getElementById("notification").style.top = "0px";
    var delay = 2000;
    setTimeout(function(){document.getElementById("notification").style.top = "-100px";},delay);
}

function setCount(){
    var count = document.getElementById("count");
    if(localStorage.length > 0){
        count.innerHTML = localStorage.length;
    }
}

function grow(){
    document.getElementById('checkout-area').style.height = '500px';
}