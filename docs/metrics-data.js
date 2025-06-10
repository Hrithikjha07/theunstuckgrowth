// Metrics data for the Impact section
window.metricsData = {
    metrics: {
        minutes: 5000,
        bookings: 200,
        countries: 15
    },
    lastUpdated: "May 2025"
};

// Story metrics data
window.storyMetrics = {
    'xyz-tech': {
        userGrowth: '300%',
        fundingSecured: '$1.2M'
    },
    'greentech': {
        costReduction: '40%',
        newMarkets: '3'
    },
    'fintech-pivot': {
        digitalAdoption: '85%',
        costSavings: '$3.5M'
    },
    'ai-platform': {
        activeUsers: '10K+',
        seriesA: '$5M'
    },
    'career-transition': {
        salaryIncrease: '45%',
        transitionMonths: '3'
    },
    'saas-growth': {
        arrGrowth: '2x',
        churnReduction: '35%'
    }
};

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