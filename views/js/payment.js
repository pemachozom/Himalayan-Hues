import { showAlert } from "./alert.js"

const productdetails = async (id) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:4000/api/v1/products/${id}`,
      });
       
      payment(res.data.data)
    } catch (err) {
      console.log(err);
    }
};
  

var localdata = localStorage;

var ids = localdata.productid.split(',');
var idss = ids[0];
productdetails(idss);









window.payment = async function (data){
    console.log(data)
    var amount = localdata.totalamountlist.split(',');
    var totalamt =0;
    for(let i=0; i<amount.length; i++){
        totalamt+= parseInt(amount[i]);
    }
    document.getElementById("netamount").textContent = totalamt;


    
    var cookie = document.cookie.split("token=")[1]
    var user = JSON.parse(cookie.split(';')[0]);

 
    document.getElementById("name").value = user.name;
    document.getElementById("phoneNo").value = user.phoneNo;
    document.getElementById('bank').textContent = data.bank;
    document.getElementById("accnumber").textContent = data.account;
    

    username(data.user)

}


const username = async (id) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:4000/api/v1/users/${id}`,
      });
       
      displayuserinfo(res.data.data)
    } catch (err) {
      console.log(err);
    }
};
  

window.displayuserinfo = async function (data){
    document.getElementById("accholder").textContent = data.name;

}


console.log(localdata.prodname)
window.orderitem = async function (){
    var amount = localdata.totalamountlist.split(',');
    var prodname = localdata.prodname.split(",");
    var qty = localdata.qtylist.split(",");

    var buyer = document.getElementById("name").value;
    var journal = document.getElementById("journalNo").value;
    var address = document.getElementById("address").value;
    var phoneNo = document.getElementById("phoneNo").value;

    for(let i = 0; i<amount.length; i++){
 
        addtoOrder(prodname[i], amount[i], qty[i],buyer,journal,phoneNo,address)

    }
    showAlert("success","Product Successfully Orderd!")

}

window.addtoOrder = async function(product_name, total_amount, total_qty, buyer, journal, phoneNo, address) {
    try {
        const res = await axios.post('http://localhost:4000/api/v1/order', {
            product_name,
            total_amount,
            total_qty,
            buyer,
            journal,
            phoneNo,
            address
        });

        if(res.data.status == "success"){
            return true;
        }

     } catch (err) {
        console.error(err.response.data); // Log the detailed error response
        showAlert("error", "Failed to add to order!");
    }
}

