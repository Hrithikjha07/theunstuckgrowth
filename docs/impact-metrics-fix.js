// Script to update impact metrics to show "+" after the numbers
document.addEventListener('DOMContentLoaded', function() {
    // Override the animateValue function to add "+" at the end
    window.animateValue = function(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure the final value shows the "+" sign
                element.textContent = end + "+";
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Also directly update the elements in case the animation doesn't run
    setTimeout(function() {
        const impactValues = document.querySelectorAll('.impact-value');
        impactValues.forEach(value => {
            const targetValue = parseInt(value.getAttribute('data-value'));
            if (!value.textContent.includes('+')) {
                value.textContent = targetValue + "+";
            }
        });
    }, 3000); // Wait for 3 seconds to ensure animation has a chance to run
    
    console.log('Impact metrics animation updated to show "+" after numbers');
}); 