//creates unique order number for each order. It will create a order number by using user id and date.
//the order number will be used to track the order. which is randomly generated.
//the function will be called by orders controller when a new order is created.


const createOrderNumber = async (req, res) => {
    const { userId } = req.body;
    const orderNumber = userId + Date.now();
    console.log(orderNumber);
    res.json({ success: true, orderNumber });
}

module.exports = createOrderNumber;
