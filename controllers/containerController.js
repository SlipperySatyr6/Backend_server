//send data to the database to the container table


const container = await Container.create({
   driverId,
   orderId,
   location,
   temperature,
   batteryLevel,
   iceLevel,
});

//sending response using try catch
try {
   if (container) {
       res.status(201).json({});
   }
} catch (error) {
   res.status(400).json({ success: false, error: 'Invalid container data' });
}
res.json({ success: true, container });

