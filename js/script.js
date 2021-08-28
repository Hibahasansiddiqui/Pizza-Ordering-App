// Business Logic
let totalPriceArray = []; 
function Order (customSize, cheese) {
  this.customSize = customSize;
  this.sauce = 1;
  this.cheese = cheese;
  this.veggie1 = 1;
  this.veggie2 = 1;
  this.meat = 2;
  this.pizzaPrice = 0;
  this.sidePrice = 3;
}
Order.prototype.pizzaCost = function () {
  if (this.customSize === "Small 10 in.") {
    this.pizzaPrice += 6;
  } else if (this.customSize === "Medium 14 in.") {
    this.pizzaPrice += 9;
  } else if (this.customSize === "Large 18 in.") {
    this.pizzaPrice += 12;
  }
  if (this.cheese === "cheese") {
    this.pizzaPrice += 1;
  } else if (this.cheese === "light cheese") {
    this.pizzaPrice += 0.5;
  } else if (this.cheese === "extra cheese") {
    this.pizzaPrice += 1.5;
  }
  this.pizzaPrice += this.sauce;
  this.pizzaPrice += this.veggie1;
  this.pizzaPrice += this.veggie2;
  this.pizzaPrice += this.meat;
  return this.pizzaPrice;
}
Order.prototype.sideCost = function () {
  return this.sidePrice;
}
Order.prototype.finalCost = function () {
  let cartTotalPrice = 0;
  for (let arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement]; // My attempt of using contents of an array together
  }
  return cartTotalPrice;
}

//Used the concept of "This"
function Address (streetAddress, city, province, zipcode) {
  this.streetAddress = streetAddress;
  this.city = city;
  this.province = province;
  this.zipcode = zipcode;
  this.deliveryAddress = (streetAddress + "  " + city + ", " + province + "  " + zipcode);
}

/*Took help of codepen for this part*/
//User Interface Logic
$(document).ready(function(event) {
/////Landing Page Btns
  $("#pickup-btn").click(function() {
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    let streetAddress = $("input#street-add").val();
    let city = $("input#city-add").val();
    let province = $("select#province-select").val();
    let zipcode = $("input#zip-add").val();
    let newAddress = new Address(streetAddress, city, province, zipcode)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO: " + newAddress.deliveryAddress);
  });
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    let customSize = $("select#size").val();
    let sauce = $("select#sauce").val();
    let cheese = $("select#cheese").val();
    let veggie1 = $("select#veggie1").val();
    let veggie2 = $("select#veggie2").val();
    let meat = $("select#meat").val();
    let pizzaDetails = (customSize + " - " + sauce + ", " + cheese + ", " + veggie1 + ", " + veggie2 + ", " + meat);
    let newPizzaOrder = new Order(customSize, cheese);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#size, #sauce, #cheese, #veggie1, #veggie2, #meat").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });

//Side and Drinks Order
  let newSideOrder = new Order();
  $("#breadsticks").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "3 garlic breadsticks" + "</li></ul>");
  });
  $("#brownie").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "1 jumbo, double-chocolate brownie" + "</li></ul>");
  });
  $("#softdrink").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "250ml., coke softdrink" + "</li></ul>");
  });
  $("#sides-dropdown").click(function() {
    $("#sides-details").toggle();
  });

///Checkout Btn
  $("#checkout-btn").click(function() {
    location.reload();
  });
});