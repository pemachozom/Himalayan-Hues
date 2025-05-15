import { showAlert } from "./alert.js"

const allProducts = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/v1/products',
      });
       
      displayProduct(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };
  
  
  
  localStorage.removeItem('userID')
  // console.log("local storage cleared")
  
  
  
  // console.log("Js is connected")
  allProducts();
  
  
  
  
    
   
  const displayProduct = (data) => {
      const dataL = data.length
      // console.log(data)
      var display = document.querySelector('.products');
       for (let i = 0; i < dataL; i++) {
          // console.log(i);  
          var cookie = document.cookie.split("token=")[1]
          var user = JSON.parse(cookie.split(';')[0]);
          // console.log(user._id)
          const element = data[i]
        console.log(element)
          display.innerHTML += `
          <div class="product">
            <div class="proimg">
            <img class="cardphoto" src="./image/product/${element.photo}" alt="Product Photo">

            </div>
            <h3>${element.product_name}</h3>
            <p  >Nu. ${element.price}.00</p>
            <a id="more_info" style="cursor:pointer;"   onclick="moreInfo('${element._id}');">Click here to see more information</a>
            <button class="edit-button" onclick="addCart('${element._id}','${user._id}')">Add to Cart</button>
          <button class="delete-button" onclick="addWishlist('${element._id}','${user._id}')">Add to Wishlist</button>
        </div>
          `
  
           
        }
      
  }

 


  
  