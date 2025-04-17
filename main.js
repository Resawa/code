// Анимация процесса
function animateProcess() {
    const steps = document.querySelectorAll('.step-card');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';

            // Анимация волны
            const wave = step.querySelector('.step-wave');
            setTimeout(() => {
                wave.style.transform = 'scaleX(1)';
            }, 300);

            // Обновление прогресса
            const progress = ((index + 1) / steps.length) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${index + 1}/${steps.length}`;
        }, index * 800);
    });
}

// Анимация преимуществ
function animateBenefits() {
    const benefits = document.querySelectorAll('.benefit-card');
    benefits.forEach((benefit, index) => {
        setTimeout(() => {
            benefit.style.opacity = '1';
            benefit.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Инициализация формы диагностики
function initDiagnosticForm() {
    const form = document.getElementById('diagnostic-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Валидация формы
            const businessName = document.getElementById('business-name').value;
            const businessType = document.getElementById('business-type').value;
            const revenue = document.getElementById('revenue').value;
            const employees = document.getElementById('employees').value;

            if (!businessName || !businessType || !revenue || !employees) {
                alert("Пожалуйста, заполните все поля формы");
                return;
            }

            // Здесь будет обработка формы
            alert("Диагностика запущена! В реальном приложении здесь будет отправка данных на сервер.");

            // Пример обработки (в реальном приложении заменить на fetch-запрос)
            try {
                // const formData = new FormData(form);
                // const response = await fetch('/api/diagnose', {
                //     method: 'POST',
                //     body: formData
                // });
                // const result = await response.json();
                // Обработка результата...
            } catch (error) {
                console.error('Diagnostic error:', error);
                alert("Произошла ошибка при выполнении диагностики. Пожалуйста, попробуйте позже.");
            }
        });
    }
}

// Инициализация всех анимаций при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    // Анимация процесса
    setTimeout(animateProcess, 1000);

    // Анимация преимуществ
    setTimeout(animateBenefits, 1500);

    // Инициализация формы диагностики
    initDiagnosticForm();

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
