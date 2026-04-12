// Tech Stack Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category expansion functionality
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        // Support both click and touch events for mobile
        const handleInteraction = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.closest('.tech-category.expandable');
            const isExpanded = category.classList.contains('expanded');
            
            // Close all other categories
            document.querySelectorAll('.tech-category.expandable').forEach(cat => {
                if (cat !== category) {
                    cat.classList.remove('expanded');
                }
            });
            
            // Toggle current category
            if (!isExpanded) {
                category.classList.add('expanded');
            } else {
                category.classList.remove('expanded');
            }
        };
        
        header.addEventListener('click', handleInteraction);
        header.addEventListener('touchstart', handleInteraction, {passive: false});
    });
    
    // Add hover effects for secondary tech items
    const secondaryTechItems = document.querySelectorAll('.tech-grid.secondary .tech-item');
    
    secondaryTechItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const techName = this.querySelector('.tech-name').textContent;
            this.setAttribute('title', `${techName} - Click to learn more`);
        });
    });
    
    // Add click analytics for tech items (optional)
    const allTechItems = document.querySelectorAll('.tech-item');
    
    allTechItems.forEach(item => {
        item.addEventListener('click', function() {
            const techName = this.querySelector('.tech-name').textContent;
            const category = this.closest('.tech-category').querySelector('.category-title').textContent;
            
            // You could add analytics tracking here
            console.log(`Tech item clicked: ${techName} in ${category}`);
        });
    });
    
    // Add keyboard navigation
    categoryHeaders.forEach(header => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Update aria-expanded when categories are toggled
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                const header = target.querySelector('.category-header');
                if (header) {
                    const isExpanded = target.classList.contains('expanded');
                    header.setAttribute('aria-expanded', isExpanded);
                }
            }
        });
    });
    
    document.querySelectorAll('.tech-category.expandable').forEach(category => {
        observer.observe(category, { attributes: true });
    });
});
