document.addEventListener('DOMContentLoaded', () => {
    // Shared Theme Colors
    const colors = {
        primary: '#111827',
        secondary: '#d4af37', // Gold
        accent: '#f3c623',
        success: '#057a55', // Emerald
        danger: '#e02424', // Red
        info: '#1c64f2', // Blue
        textMuted: '#6b7280', // Dark gray for text
        gridLine: '#e5e7eb' // Light gray for grids
    };

    // Shared Chart.js Options for uniform styling
    Chart.defaults.color = colors.textMuted;
    Chart.defaults.font.family = "'Inter', sans-serif";
    
    const commonBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false }
            },
            y: {
                grid: { color: colors.gridLine, drawBorder: false },
                beginAtZero: true
            }
        }
    };

    const commonPieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutBounce',
            animateRotate: true,
            animateScale: true
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: colors.textMuted,
                    padding: 20,
                    usePointStyle: true
                }
            }
        },
        cutout: '60%', // Makes it a donut chart for a more modern look
        borderWidth: 0
    };

    // ==========================================
    // USER DASHBOARD CHARTS
    // ==========================================
    const userBarCtx = document.getElementById('userBarChart');
    if (userBarCtx) {
        new Chart(userBarCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Tax Paid (₹)',
                    data: [1200, 0, 3500, 0, 4800, 15000],
                    backgroundColor: colors.secondary,
                    borderRadius: 4,
                    barPercentage: 0.6
                }]
            },
            options: commonBarOptions
        });
    }

    const userPieCtx = document.getElementById('userPieChart');
    if (userPieCtx) {
        new Chart(userPieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Approved', 'Pending', 'Rejected', 'Draft'],
                datasets: [{
                    data: [8, 3, 1, 2],
                    backgroundColor: [colors.success, colors.info, colors.danger, colors.textMuted],
                    borderColor: colors.primary,
                    borderWidth: 2
                }]
            },
            options: commonPieOptions
        });
    }

    // ==========================================
    // ADMIN DASHBOARD CHARTS
    // ==========================================
    const adminBarCtx = document.getElementById('adminBarChart');
    if (adminBarCtx) {
        new Chart(adminBarCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue (₹ Lakhs)',
                    data: [120, 145, 130, 180, 210, 250],
                    backgroundColor: colors.success,
                    borderRadius: 4,
                    barPercentage: 0.6
                }]
            },
            options: commonBarOptions
        });
    }

    const adminPieCtx = document.getElementById('adminPieChart');
    if (adminPieCtx) {
        new Chart(adminPieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Property Tax', 'Water Supply', 'Trade License', 'Building Plan'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [colors.secondary, colors.info, colors.accent, colors.success],
                    borderColor: colors.primary,
                    borderWidth: 2
                }]
            },
            options: commonPieOptions
        });
    }
});
