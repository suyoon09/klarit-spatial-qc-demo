/**
 * Klari.T Spatial QC Dashboard - App Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Load benchmark results and update stats
    try {
        const response = await fetch('assets/results/benchmark_results.json');
        const data = await response.json();

        // Update hero stats
        const cleanMetrics = data.metrics.clean_identification;
        const artifactMetrics = data.metrics.artifact_detection;

        // Update values if elements exist
        const f1El = document.getElementById('f1-score');
        const precisionEl = document.getElementById('precision');

        if (f1El && cleanMetrics.f1) {
            f1El.textContent = (cleanMetrics.f1 * 100).toFixed(1) + '%';
        }

        if (precisionEl && artifactMetrics.precision) {
            precisionEl.textContent = (artifactMetrics.precision * 100).toFixed(1) + '%';
        }

        console.log('Benchmark data loaded:', data);
    } catch (error) {
        console.log('Using default stats (benchmark data not found)');
    }

    // Add subtle animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    document.querySelectorAll('.tier, .result-card, .platform, .roadmap-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
