let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let create = document.getElementById("create");

let mood = "create";
let fake;
// calculate total--------------------------------------

function calcTotal (){

  if (price.value != ""){

    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor="green";
  }
  else{
     total.innerHTML=" ";

  }
}


// create product ---------------------------------------

let arrProduct;
if (localStorage.product != null){
 arrProduct = JSON.parse(localStorage.product) ;
}
else {
  arrProduct=[];
}


create.onclick = function (){
  let newProduct = {
  title: title.value,
  price:price.value,
  taxes: taxes.value,
  ads: ads.value,
  discount: discount.value,
  total: total.innerHTML,
  count:count.value,
  category:category.value
  }

  // count ---------------------------------------

  if (price.value != "" && title.value !="" && category.value!= "" && count.value < 100){

    if (mood === "create"){
      if(newProduct.count > 1){
      for (let i=0; i< newProduct.count; i++){
        arrProduct.push(newProduct);
      }
    }
  else{
    arrProduct.push(newProduct);
  }
}
  else {
    arrProduct[fake]= newProduct;
    mood = "create";
    create.innerHTML="create"
  }
  clearData();
}
  

  // save products in local storage-------------------------

 localStorage.setItem("product", JSON.stringify(arrProduct) );
 dataShow();
}


// clear ----------------------------------------------

function clearData (){
 title.value=" ";
 price.value=" ";
 taxes.value=" ";
 ads.value=" ";
 discount.value=" ";
 total.innerHTML=" ";
 category.value=" ";
 count.value=" ";

}

// show products ----------------------------------------
function dataShow(){

calcTotal();
 let table = '';
for (let i = 0; i< arrProduct.length; i++){
  table += 
  `<tr> 
  <td>${i+1}</td> 
  <td>${arrProduct[i].title}</td>
  <td>${arrProduct[i].price}</td> 
  <td>${arrProduct[i].taxes}</td>
  <td>${arrProduct[i].ads}</td>
   <td>${arrProduct[i].discount}</td> 
   <td>${arrProduct[i].total}</td>
   <td>${arrProduct[i].count}</td>
   <td>${arrProduct[i].category}</td>
    <td><button onclick = "updateProduct(${i})" id="update">UPDATE</button></td>
    <td><button onclick = "deleteProduct(${i})" id="delete">DELETE</button></td>
    </tr>`; 
}
document.getElementById("tbody").innerHTML= table;
let del = document.getElementById("deleteALL");
if (arrProduct.length >0) {
  del.innerHTML= `
  <button onclick= "deleteALL()" > Delete ALL (${arrProduct.length}) </button>`
}
 else{
  del.innerHTML="";
 }
}

dataShow();


// delete product -----------------------------

function deleteProduct(i) {
arrProduct.splice(i,1);
localStorage.product= JSON.stringify(arrProduct);
dataShow();

}

// delete all products -------------------------

function deleteALL (){
localStorage.clear();
arrProduct.splice(0); 
dataShow();

}


// update product ------------------------------

function updateProduct (i){
title.value = arrProduct[i].title;
price.value = arrProduct[i].price;
taxes.value = arrProduct[i].taxes;
ads.value = arrProduct[i].ads;
calcTotal();
count.value = arrProduct[i].count;
category.value=arrProduct[i].category;

create.innerHTML="Update";
mood = "update";
fake = i;
scroll({
  top:0 
})
}

//Search -----------------------------------------

let moodSearch = "title";


function getSearch (id){
  let inputSearch = document.getElementById("search");

  console.log(inputSearch)

  if(id == "searchTitle"){
    moodSearch= "title";
 inputSearch.placeholder = "Search By Title";

  }
  else {
    moodSearch = "category";
    inputSearch.placeholder = "Search By category";

  }
  search.focus();
}


function SearchProduct(value){

  let table="";
if (moodSearch== "title") {

for (let i=0; i<arrProduct.length; i++){
  if (arrProduct[i].title.includes(value.toLowerCase())){

    table += 
    `<tr> 
    <td>${i}</td> 
    <td>${arrProduct[i].title}</td>
    <td>${arrProduct[i].price}</td> 
    <td>${arrProduct[i].taxes}</td>
    <td>${arrProduct[i].ads}</td>
     <td>${arrProduct[i].discount}</td> 
     <td>${arrProduct[i].total}</td>
     <td>${arrProduct[i].count}</td>
     <td>${arrProduct[i].category}</td>
      <td><button onclick = "updateProduct(${i})" id="update">UPDATE</button></td>
      <td><button onclick = "deleteProduct(${i})" id="delete">DELETE</button></td>
      </tr>`;
  } 
}
}

  else {
    for (let i=0;i<arrProduct.length;i++){
      if (arrProduct[i].category.includes(value.toLowerCase())){
    
        table += 
        `<tr> 
        <td>${i}</td> 
        <td>${arrProduct[i].title}</td>
        <td>${arrProduct[i].price}</td> 
        <td>${arrProduct[i].taxes}</td>
        <td>${arrProduct[i].ads}</td>
         <td>${arrProduct[i].discount}</td> 
         <td>${arrProduct[i].total}</td>
         <td>${arrProduct[i].count}</td>
         <td>${arrProduct[i].category}</td>
          <td><button onclick = "updateProduct(${i})" id="update">UPDATE</button></td>
          <td><button onclick = "deleteProduct(${i})" id="delete">DELETE</button></td>
          </tr>`;
      }
  }
}

      document.getElementById("tbody").innerHTML= table;
 
  }




