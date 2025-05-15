import { showAlert } from "./alert.js"


const showWishlist = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/v1/wishlist',
      });
       
      // console.log(res.data.data)
      displayCart(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };


showWishlist()


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
  console.log(diffUploader)

  var arrL = mylist.length;

  var display1 = document.querySelector('.table');

  display1.innerHTML +=`
          <div class="header">
            <label for="#">Product Name</label>
            <label for="#">Price(Nu)</label>
            <label for="#">Stock Status</label>
            <label for="#">Delete</label>
          </div>

          <div class="line"></div>
        `;

  for (let i = 0; i <diffUploader.length; i++) {
    console.log("i=",i)

    var storeSellerid;
    var storedbuyerID
    
        
      
          const ele = mylist[i]
          // console.log(mylist[i])
           
            // console.log(j," inside second if")

            // console.log(ele.user)
          // console.log(user._id)
            display1.innerHTML += `
            <div class="tablebody" data-row="1">
 
                <span class="item">${ele.product_name}</span>
                <span class="price">${ele.price}</span>
                <span class="quantity">
                     ${ele.stock}
                </span>
                <a href="#" class="delete-product"><span class="fas fa-trash" onclick="deleteC('${ele._id}')" title="delete product"></span></a>

                <button style="position:relative; 
                bottom:3px; height:0.8cm; width:10%" class="total" type="button" onclick="addCart('${ele.product_id}','${ele.user}')">Add to Cart</button><br><br>



                
            <div class="line"></div>
            
            `;
            storeSellerid = ele.user_id;
            storedbuyerID=ele.user;
             
          
        
          
      
    
     
  }

}

window.paymentform = async function (sellerid,buyerid){

  var element = document.getElementsByClassName("tablebody");

  for(let i=0;i<element.length; i++){
    var gettableid = element[i].querySelector(".item#ref").innerText;
    if(gettableid == sellerid) {

      // Log or use the value as needed
      console.log("Ref Id:",i, gettableid);    
    }
  }
  
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



 
window.addtoCart = async function(product_name,price,product_id,user_id,user){
    try{
        console.log(product_name,price,product_id,user_id)
        const res = await axios({
            method: 'POST',
            url : `http://localhost:4000/api/v1/cart`,
            data: {
                product_name,
                price,
                product_id,
                user_id,
                user,
            }
        })
        // console.log(res.data.status)
        if (res.data.status === 'success'){
            showAlert('success','Product Added to Cart!')
        }
    }
    catch(err){
        showAlert("error","Failed to add to cart!")
    }
}


window.check = async function(data,user){
    try{
        console.log("inside check function")
         const res = await axios({
            method: 'GET',
            url : `http://localhost:4000/api/v1/cart`,
            
        })
        console.log(res.data)

        if (res.data.status === 'success'){
            var cart = res.data.data;
            var cartL = cart.length;
            // console.log(cartL)

            // var cookie = document.cookie.split("token=")[1]
            // var user = JSON.parse(cookie.split(';')[0]);
            console.log(user)
            var names = [];

            for(let i = 0; i<cartL; i++){
                console.log(cart[i].user_id)
                if(user == cart[i].user){
                    if (!names.includes(cart[i].product_name)) {
                        names.push(cart[i].product_name); // Add the item to the array if it's not already in the array
                    }
                }
            }
            console.log(data.product_name)
            console.log(names)
            if(names.includes(data.product_name)){
                showAlert("error","Product already exists!")
            }else{
                addtoCart(data.product_name,
                       data.price,
                        data._id,
                        data.user,user)
            }
        }

        
    }
    catch(err){
         
        showAlert("error","Failed to add to cart!")
    }

}




