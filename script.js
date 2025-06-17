let currentQuestion = 1;
let score = 0;
let timeLeft = 60;
let timer;
let currentAnswer = '';
let correctAnswer = 0;
let num1, num2, operator;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    
    const operators = ['+', '-', '×'];
    operator = operators[Math.floor(Math.random() * operators.length)];
    
    switch(operator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            if (num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            correctAnswer = num1 - num2;
            break;
        case '×':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            correctAnswer = num1 * num2;
            break;
    }
    
    document.getElementById('question').textContent = `${num1} ${operator} ${num2} = ?`;
    document.getElementById('answerDisplay').textContent = '_';
    currentAnswer = '';
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('timer').textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNotification('⏰ Waktu habis!', 'wrong');
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        }
    }, 1000);
}

function inputNumber(num) {
    if (currentAnswer.length < 3) {
        currentAnswer += num;
        document.getElementById('answerDisplay').textContent = currentAnswer;
    }
}

function clearAnswer() {
    currentAnswer = '';
    document.getElementById('answerDisplay').textContent = '_';
}

function submitAnswer() {
    if (currentAnswer === '') return;
    
    clearInterval(timer);
    
    if (parseInt(currentAnswer) === correctAnswer) {
        score++;
        showNotification('✅ Benar!', 'correct');
    } else {
        showNotification(`❌ Salah! Jawabannya ${correctAnswer}`, 'wrong');
    }
    
    // Selalu lanjut ke soal berikutnya setelah 2 detik
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 1.5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 1600);
}

function nextQuestion() {
    // Reset display style
    const display = document.getElementById('answerDisplay');
    display.style.background = 'rgba(0, 0, 0, 0.7)';
    display.style.borderColor = '#00ff00';
    
    currentQuestion++;
    
    if (currentQuestion > 10) {
        endGame();
        return;
    }
    
    document.getElementById('questionNumber').textContent = currentQuestion;
    updateProgressBar();
    generateQuestion();
    startTimer();
}

function updateProgressBar() {
    const progress = (currentQuestion / 10) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function endGame() {
    document.getElementById('finalScore').textContent = score;
    
    let message = '';
    if (score >= 9) {
        message = '🌟 Luar biasa! Anda jenius matematika! 🌟';
    } else if (score >= 7) {
        message = '👏 Bagus sekali! Terus berlatih! 👏';
    } else if (score >= 5) {
        message = '👍 Tidak buruk! Masih bisa ditingkatkan! 👍';
    } else {
        message = '💪 Jangan menyerah! Latihan lagi ya! 💪';
    }
    
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultScreen').style.display = 'flex';
}

function restartGame() {
    currentQuestion = 1;
    score = 0;
    document.getElementById('questionNumber').textContent = currentQuestion;
    document.getElementById('resultScreen').style.display = 'none';
    updateProgressBar();
    generateQuestion();
    startTimer();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateQuestion();
    startTimer();
    updateProgressBar();
});