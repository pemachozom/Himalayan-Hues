import { showAlert } from "./alert.js"

async function moreInfo(id) {
    try { 
      // console.log("inside try")
      const res = await axios({
        method: 'GET',
        url: `http://localhost:4000/api/v1/products/${id}`,
      })
   
    // console.log(res.data.data)
    //   getUserInfo(res.data.data)
    editProd(res.data.data)
      
  
    } catch (err) {
      console.log(err)
    }
  }

var myElement = document.querySelector(".addform .id#myElement");
// console.log(myElement.textContent)
moreInfo(myElement.textContent)


function editProd(data){
    // console.log(data)
    var c1 = document.getElementById('imageDisplay');
    var c2 = document.getElementById('product_name');
    var c3 = document.getElementById('product_description');
    var c4 = document.getElementById('quantity');
    var c5 = document.getElementById('price');
    var c6 = document.getElementById('bank');
    var c7 = document.getElementById('account_number');
    // var c8 = document.getElementById('photoname');

    // imageURL = data.photo;
    // console.log(data.photo);
    // document.getElementById('productImage').value = data.photo;
    // console.log(document.getElementById('productImage').value)

    // var selectedFileName = document.getElementById('productImage');
    // selectedFileName.textContent = data.photo;
    // console.log( document.getElementById('productImage').textContent)

    c1.src = `./image/product/${data.photo}`;
    c2.value = data.product_name;
    c3.value = data.description;
    c4.value = data.price;
    c5.value = data.quantity;
    c6.value = data.bank;
    c7.value = data.account;
    // c8.textContent = data.photo;
    


}


    
const updateProduct = async (product_name,description,price,quantity,bank,account,id) => {
    try {
        // console.log(data)
        const res = await axios({
            method: 'PUT',
            url: `http://localhost:4000/api/v1/products/${id}`,
            data:{
                product_name,
                description,
                price,
                quantity,
                bank,
                account
            }
        });
        // console.log("datass",data)
        console.log(res.data.data)
        if (res.data.status === 'success') {
            showAlert("success","Product updated Successfully")
            // window.alert('Product Edited and Saved successfully');
            // window.location.href = "editproduct.html"
            // window.setTimeout(() => {
            //     location.assign('/sellerhome');
            // }, 1500);
        }
    } catch (err) {
        showAlert("error","Product updated failed")
         
    }
};

document.getElementById('saveChange').addEventListener('click', async (e) => {
    e.preventDefault();

  

    const product_name = document.getElementById('product_name').value;
    const description = document.getElementById('product_description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const bank = document.getElementById('bank').value;
    const account = document.getElementById('account_number').value;
  
  
    updateProduct(product_name,description,price,quantity,bank,account,myElement.textContent);
});



