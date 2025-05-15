import { showAlert } from "./alert.js"


const showCart = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/v1/cart',
      });
       
      // console.log(res.data.data)
      displayCart(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };


showCart()


const displayCart = (data) => {

  var cookie = document.cookie.split("token=")[1]
  var user = JSON.parse(cookie.split(';')[0]);


  const dataL = data.length
  const mylist = [];
  for(let k = 0 ; k<dataL; k++) {
    // if (!mylist.includes(data[k].user_id)) {
    //   mylist.push(data[k]); // Add the item to the array if it's not already in the array
    // }
    if (user._id == data[k].user) {
      mylist.push(data[k]); // Add the item to the array if it's not already in the array
    }
  };
  // console.log(user._id,data)
  console.log(mylist)

  const diffUploader = [];
  for(let l = 0 ; l<mylist.length; l++) {
    if (!diffUploader.includes(mylist[l].user_id)) {
      // console.log(mylist[l].user_id)
      diffUploader.push(mylist[l].user_id); // Add the item to the array if it's not already in the array
    }
    
  };
 
  var arrL = mylist.length;

  var display1 = document.querySelector('.table');

  for (let i = 0; i <diffUploader.length; i++) {
 
    var storeSellerid;
    var storedbuyerID;
    var storedProductName = [];
    var storedproductid = [];
    // console.log(mylist[i])
    // console.log(data[i].user_id)
    // if(user._id == mylist[i].user){
         display1.innerHTML +=`
          <div class="header">
            <label for="#">Product Name</label>
            <label for="#">Price(Nu)</label>
            <label for="#">Quantity</label>
            <label for="#">Total Price(Nu)</label>
          </div>

          <div class="line"></div>
        `;
      
       for (let j=0; j < arrL; j++){
          const ele = mylist[j]
          // console.log(mylist[i])
          if( diffUploader[i] == ele.user_id  ){
            // console.log(j," inside second if")

            // console.log(ele.user)
          // console.log(user._id)
            display1.innerHTML += `
            <div class="tablebody" data-row="1">
                <span style="display:none;" class="item" id="ref">${ele.user_id}</span>

                <span class="item">${ele.product_name}</span>
                <span class="price">${ele.price}</span>
                <span class="quantity">
                    <a href="#" data-action="decrease" class="quantity-control">-</a>
                    <span class="display-quantity">0</span>
                    <a href="#" data-action="increase" class="quantity-control">+</a>
                </span>
                <span class="total">0</span>
                <a href="#" class="delete-product"><span class="fas fa-trash" onclick="deleteC('${ele._id}')" title="delete product"></span></a>
            </div>
            
            <div class="line"></div>  
            
            `;
            storeSellerid = ele.user_id;
            storedbuyerID=ele.user;
            storedProductName.push(ele.product_name);
            storedproductid.push(ele.product_id);
             
          }
          else{
            continue
          
        }
        
      } 
      display1.innerHTML += `
          <div class="payment">
                   <button type="button" onclick="paymentform('${storeSellerid}','${storedbuyerID}','${storedProductName}','${storedproductid}')">Proceed with Payment</button>
              </div><br><br><br>
          `;
    
    // }else{
    //   continue;
    // }
  }

}

window.paymentform = async function (sellerid,buyerid,storedProductName,productid){

  var qtylist = [];
  var totalamountlist = [];
  var elements = document.querySelectorAll(".tablebody");

  let displayQuantities = document.querySelectorAll(".display-quantity");
  let prices = document.querySelectorAll(".total");

  for (let i = 0; i < elements.length; i++) {
    var gettableid = elements[i].querySelector(".item#ref").innerText;
    if (gettableid == sellerid) {
      let displayQuantityValue = displayQuantities[i].textContent; // Use [i] to get the specific element
      let priceValue = prices[i].textContent; // Use [i] to get the specific element

      qtylist.push(displayQuantityValue);
      totalamountlist.push(priceValue)

      // console.log(`Quantity ${i + 1}:`, displayQuantityValue);
      // console.log(`Price ${i + 1}:`, priceValue);
      // console.log("Ref Id:", i, gettableid);
    }
  }
  // console.log("inside payment form")
  // try {
  //   const res = await axios({
  //     method: 'GET',
  //     url: 'http://localhost:4000/api/v1/cart',
  //   });
  //   console.log(res.data.data)
  //    if (res.data.status="success"){
  //     var data = res.data.data;
  //     for(let i = 0; i<data.length;i++){
  //       console.log(data.user)
  //       if(data[i].user == buyerid && data[i].user_id==sellerid){
  //         console.log("Yeahooooo ypu are the best")
  //       }
  //     }
  //    }
    
  // } catch (err) {
  //   console.log(err);
  // }
  localStorage.setItem('sellerid',sellerid);
  localStorage.setItem('buyerid',buyerid);
  localStorage.setItem('prodname',storedProductName);
  localStorage.setItem('qtylist',qtylist);
  localStorage.setItem('totalamountlist',totalamountlist);
  localStorage.setItem('productid',productid);

  window.location.href = 'payment.html'
  // window.location.href = "payment.html";
// Retrieve the data from local storage
const localStorageData = localStorage;

// Access the 'prodname' property
const prodnameArray = localStorageData.prodname.split(',');

// Access the first element
const firstElement = prodnameArray[0];

// Print the first element
console.log(firstElement);
};

  

window.deleteC = async function(id){
  var con = window.confirm("Do you want to delete this item?")
  if(con){
    deleteCart(id)
  }
}

window.deleteCart = async function (id){
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:4000/api/v1/cart/${id}`,
    });

    console.log(res.data)
    if(res.data.data = "success"){
      showAlert("success","Deleted Successfully!")
      setTimeout(() => {
        window.location.href = "cart.html";
      }, 2000);
    }
     
    } catch (err) {
      showAlert("error","Try again!")
  }
};




document.addEventListener('DOMContentLoaded', function () {

  const tableContainer = document.querySelector('.table');
 
tableContainer.addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('quantity-control')) {
      event.preventDefault();

      const row = target.closest('.tablebody');
      const priceElement = row.querySelector('.price');
      const displayQuantityElement = row.querySelector('.display-quantity');
      const totalElement = row.querySelector('.total');

      const action = target.getAttribute('data-action');
      let quantity = parseInt(displayQuantityElement.textContent);
      const price = parseInt(priceElement.textContent);

      if (action === 'increase') {
          quantity++;
      } else if (action === 'decrease' && quantity > 0) {
          quantity--; // Ensure quantity does not go below 0
      }

      displayQuantityElement.textContent = quantity;
      const total = quantity * price;
      totalElement.textContent = total;

      const totalPrices = document.querySelectorAll('.total');
      let totalPayment = 0;

      totalPrices.forEach(priceElement => {
          totalPayment += parseInt(priceElement.textContent);
      });

   }
})
});