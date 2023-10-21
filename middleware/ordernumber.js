//creates unique order number for each order. It will create a order number by using user id and date.
//the order number will be used to track the order. which is randomly generated.
//the function will be called by orders controller when a new order is created.



const createOrderNumber = (userId) => {
    const orderNumber = `${userId}${Date.now()}`;
    console.log(orderNumber);
    return orderNumber;
}
  

module.exports = createOrderNumber;
