document.addEventListener('DOMContentLoaded', function() {
    // Анимация метрик
    function animateMetrics() {
        // Точность
        gsap.to("#accuracy-value", {
            innerText: "98.7%",
            duration: 2,
            snap: { innerText: 0.1 },
            scrollTrigger: {
                trigger: ".efficiency-section",
                start: "top 70%"
            }
        });
        gsap.to("#accuracy-value + .metric-graph .graph-fill", {
            width: "98.7%",
            duration: 2,
            ease: "power3.out"
        });

        // Сокращение времени
        gsap.to("#time-value", {
            innerText: "20x",
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: ".efficiency-section",
                start: "top 70%"
            }
        });
        gsap.to("#time-value + .metric-graph .graph-fill", {
            width: "95%",
            duration: 2,
            ease: "power3.out"
        });

        // Кейсы
        const casesCounter = { value: 0 };
        gsap.to(casesCounter, {
            value: 10000,
            duration: 2,
            roundProps: "value",
            onUpdate: () => {
                document.getElementById("cases-value").innerText =
                    casesCounter.value.toLocaleString();
            },
            scrollTrigger: {
                trigger: ".efficiency-section",
                start: "top 70%"
            }
        });
        gsap.to("#cases-value + .metric-graph .graph-fill", {
            width: "100%",
            duration: 2,
            ease: "power3.out"
        });

        // ROI
        gsap.to("#roi-value", {
            innerText: "27%",
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: ".efficiency-section",
                start: "top 70%"
            }
        });
        gsap.to("#roi-value + .metric-graph .graph-fill", {
            width: "100%",
            duration: 2,
            ease: "power3.out"
        });
    }

    // Радар-график
    function initRadarChart() {
        const ctx = document.getElementById('aiRadarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Рыночная позиция', 'Финансы', 'Операции', 'Маркетинг', 'HR', 'Юридические'],
                datasets: [{
                    label: 'Ваш бизнес',
                    data: [85, 70, 65, 60, 75, 80],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                }, {
                    label: 'Отраслевой стандарт',
                    data: [65, 60, 70, 55, 60, 65],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // Анимация карточек при скролле
    function animateCards() {
        gsap.utils.toArray('.foundation-card, .audience-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // Инициализация
    animateMetrics();
    initRadarChart();
    animateCards();
});

document.addEventListener('DOMContentLoaded', function() {
    // Фиксируем высоту карточек после загрузки
    const cards = document.querySelectorAll('.foundation-card');
    let maxHeight = 0;

    // Сначала сбросим все высоты
    cards.forEach(card => {
        card.style.height = 'auto';
    });

    // Находим максимальную высоту
    cards.forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    // Устанавливаем единую высоту
    cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
    });
});
