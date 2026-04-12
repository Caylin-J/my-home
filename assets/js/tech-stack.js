// Tech Stack Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category expansion functionality
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        let touchStartY = 0;
        let touchEndY = 0;
        
        // Track touch start for swipe detection
        header.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, {passive: true});
        
        // Track touch move
        header.addEventListener('touchmove', function(e) {
            touchEndY = e.touches[0].clientY;
        }, {passive: true});
        
        // Handle click (desktop)
        header.addEventListener('click', function(e) {
            handleToggle(this);
        });
        
        // Handle touch end (mobile) - only toggle if not scrolling
        header.addEventListener('touchend', function(e) {
            const swipeThreshold = 10; // pixels
            const swipeDistance = Math.abs(touchEndY - touchStartY);
            
            // Only toggle if user didn't scroll significantly
            if (swipeDistance < swipeThreshold) {
                e.preventDefault();
                handleToggle(this);
            }
        });
        
        function handleToggle(headerEl) {
            const category = headerEl.closest('.tech-category.expandable');
            const isExpanded = category.classList.contains('expanded');
            
            // Close all other categories
            document.querySelectorAll('.tech-category.expandable').forEach(cat => {
                if (cat !== category) {
                    cat.classList.remove('expanded');
                }
            });
            
            // Toggle current category
            category.classList.toggle('expanded', !isExpanded);
        }
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
