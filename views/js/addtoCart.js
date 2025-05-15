import { showAlert } from "./alert.js"

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




