// Metrics data that can be easily updated
const metricsData = {
    updated_at: new Date().toISOString(),
    metrics: {
        minutes: 2905,
        bookings: 148,
        countries: 12
    }
};

// Function to update metrics
function updateMetrics(newData) {
    Object.assign(metricsData.metrics, newData);
    metricsData.updated_at = new Date().toISOString();
    return metricsData;
}

// Export the data and update function
window.metricsData = metricsData;
window.updateMetrics = updateMetrics; 