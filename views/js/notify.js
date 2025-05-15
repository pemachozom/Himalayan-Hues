import { showAlert } from "./alert.js"


const showOrder = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/v1/order',
      });
       
      console.log(res.data.data)
      displayOrder(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };


showOrder()

window.displayOrder = async function(data){
    var datal = data.length;
    console.log(datal)

    var buyerList = [];
    var display = document.querySelector(".tabledata");

    for(let i = 0; i<datal; i++){
        var el = data[i]
        if (!buyerList.includes(el.buyer)) {
            buyerList.push(el.buyer);
        }
    }
    
    for(let j=0; j<buyerList.length; j++){

        var buyer = buyerList[j];
        for(let k = 0; k<datal; k++){
            var el = data[k]

             if (buyer === el.buyer) {
                display.innerHTML += `
                <tr >

                <td>${el.buyer}</td>
                <td>${el.product_name}</td>
                <td>${el.total_qty}</td>
                <td>${el.address}</td>
                <td>${el.journal}</td>
                <td><button class="approve-btn">Approve</button></td>
                </tr>

                `;
            }
        }
        display.innerHTML += `
        <br><br>
        `;
    }
}
