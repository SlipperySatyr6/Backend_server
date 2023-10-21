

// Assign orders to drivers based on driver availability
for (const order of orders) {
    // Find the first available driver who can deliver the order
    const driver = drivers.find(driver => driver.available && driver.canDeliver(order));

    if (driver) {
        // Assign the order to the driver
        driver.assignOrder(order);
    } else {
        // If no driver is available, mark the order as unassigned
        order.status = 'unassigned';
    }
}
