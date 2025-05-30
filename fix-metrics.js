// Fix for metrics display - Ensures all metrics have proper values
document.addEventListener('DOMContentLoaded', function() {
    // Function to fix all metrics
    function fixMetrics() {
        console.log('Checking and fixing metrics display...');
        
        // Fix story metrics
        const storyCards = document.querySelectorAll('.story-card');
        storyCards.forEach(function(card) {
            const storyId = card.dataset.storyId;
            if (storyId && window.storyMetrics && window.storyMetrics[storyId]) {
                const metrics = card.querySelectorAll('.metric-value');
                const storyData = window.storyMetrics[storyId];
                
                metrics.forEach(function(metric, index) {
            const nextElement = metric.nextElementSibling;
            const metricType = nextElement ? nextElement.textContent.trim() : '';
            
                    // Match metric type to story data
                    let value = null;
                    if (metricType.includes('Growth') || metricType.includes('User')) {
                        value = storyData.userGrowth;
                    } else if (metricType.includes('Funding')) {
                        value = storyData.fundingSecured;
                    } else if (metricType.includes('Cost') && metricType.includes('Reduction')) {
                        value = storyData.costReduction;
                    } else if (metricType.includes('Markets')) {
                        value = storyData.newMarkets;
                    } else if (metricType.includes('Digital')) {
                        value = storyData.digitalAdoption;
                    } else if (metricType.includes('Cost') && metricType.includes('Savings')) {
                        value = storyData.costSavings;
                    } else if (metricType.includes('Users')) {
                        value = storyData.activeUsers;
                    } else if (metricType.includes('Series')) {
                        value = storyData.seriesA;
                    } else if (metricType.includes('Salary')) {
                        value = storyData.salaryIncrease;
                    } else if (metricType.includes('Months')) {
                        value = storyData.transitionMonths;
                    } else if (metricType.includes('ARR')) {
                        value = storyData.arrGrowth;
                    } else if (metricType.includes('Churn')) {
                        value = storyData.churnReduction;
                    }
                    
                    if (value) {
                        metric.textContent = value;
                    }
                });
            }
        });
        
        console.log('Metrics check and fix completed.');
    }
    
    // Run metrics fix
    fixMetrics();
    
    // Run metrics fix again after a short delay to ensure all content is loaded
    setTimeout(fixMetrics, 1000);
});

// Fix for Impact Metrics Animation
document.addEventListener('DOMContentLoaded', function() {
    // Get metrics data from metrics-data.js if available
    const metricsData = window.metricsData || {
        metrics: {
            minutes: 5000,
            bookings: 200,
            countries: 15
        },
        lastUpdated: "May 2025"
    };
    
    // Function to animate counting up
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Get all metric elements
    const metricElements = document.querySelectorAll('.impact-value');
    
    // Function to animate metrics when they come into view
    function checkAndAnimateMetrics() {
        metricElements.forEach((metric, index) => {
            if (isInViewport(metric) && !metric.dataset.animated) {
                metric.dataset.animated = "true";
                
                // Determine which metric to animate
                let targetValue = 0;
                if (metric.dataset.value) {
                    // Use the data-value attribute if available
                    targetValue = parseInt(metric.dataset.value);
                } else if (index === 0) {
                    targetValue = metricsData.metrics.minutes;
                } else if (index === 1) {
                    targetValue = metricsData.metrics.bookings;
                } else if (index === 2) {
                    targetValue = metricsData.metrics.countries;
                }
                
                // Animate the metric
                animateValue(metric, 0, targetValue, 2000);
            }
        });
    }
    
    // Check on scroll and on load
    window.addEventListener('scroll', checkAndAnimateMetrics);
    checkAndAnimateMetrics(); // Check on initial load
    
    // Update the "last updated" text if elements exist
    const lastUpdatedElements = document.querySelectorAll('.metrics-last-updated');
    if (lastUpdatedElements.length > 0) {
        lastUpdatedElements.forEach(element => {
            element.textContent = metricsData.lastUpdated;
        });
    }
}); 