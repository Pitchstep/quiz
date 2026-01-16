const questions = [
    {
        q: 'hva er hovedstaten i Litauen?',
        choices: ['berlin', 'madrid', 'paris', 'vilnius'],
        answer: 3,
    },
    {
        q: 'hvilke programmerings språk kjører i nettleseren?',
        choices: ['java', 'c', 'python', 'javascript'],
        answer: 3,
    },
    {
        q: 'hva står css for?',
        choices: ['Central Style Sheets', 'Cascading Style Sheets', 'Cascading Simple Sheets', 'Computer Style Sheets'],
        answer: 1,
    },
    {
        q: 'hvilke html element plasseres js i?',
        choices: ['\<js\>', '\<script\>', '\<javascript\>', '\<java\>'],
        answer: 1,
    },
    {
        q: 'hvilke selskap er størst i verden?',
        choices: ['google', 'facebook', 'microsoft', 'nvidia'],
        answer: 3,
    },
];

let state = {
    index: 0,
    answers: Array(questions.length).fill(null),
    score: 0,
    timePerQuestion: 20,
    remaining: questions.length * 20,
    timerId: null,
};

const els = {
    question: document.getElementById('question'),
    choices: document.getElementById('choices'),
    current: document.getElementById('current'),
    total: document.getElementById('total'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    result: document.getElementById('result'),
    scoreText: document.getElementById('scoreText'),
    restartBtn: document.getElementById('restartBtn'),
    timer: document.getElementById('timer'),
};

function formatTime(sec){
    const m = Math.floor(sec / 60).toString().padStart(2,'0');
    const s = (sec % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
}

function startTimer(){
    els.timer.textContent = formatTime(state.remaining);
    state.timerId = setInterval(()=>{
        state.remaining -= 1;
        els.timer.textContent = formatTime(state.remaining);
        if(state.remaining <= 0){
            clearInterval(state.timerId);
            finishQuiz();
        }
    }, 1000);
}

function stopTimer(){
    if(state.timerId) clearInterval(state.timerId);
}

function render(){
    const q = questions[state.index];
    els.current.textContent = state.index + 1;
    els.total.textContent = questions.length;
    els.question.textContent = q.q;

    els.choices.innerHTML = '';
    q.choices.forEach((c, i) => {
        const li = document.createElement('li');
        li.className = 'choice';
        li.tabIndex = 0;
        li.setAttribute('role','radio');
        li.setAttribute('aria-checked', state.answers[state.index] === i ? 'true' : 'false');
        const text = document.createElement('span');
        text.textContent = c;
        li.appendChild(text);
        li.addEventListener('click', ()=> selectChoice(i));
        els.choices.appendChild(li);
    });

    console.log(state.answers.indexOf(null).toString());

    els.prevBtn.disabled = state.index === 0;
    els.nextBtn.textContent = state.index === questions.length - 1 ? 'FERDIG' : 'neste';
}

function selectChoice(choiceIndex){
    state.answers[state.index] = choiceIndex;
    Array.from(els.choices.children).forEach((li, i)=>{
        li.setAttribute('aria-checked', i === choiceIndex ? 'true' : 'false');
    });
}

function next(){
    if(state.index < questions.length - 1){
        state.index +=1;
        render();
    } else {
        finishQuiz();
    }
}

function prev(){
    if(state.index > 0){
        state.index -=1;
        render();
    }
}

function finishQuiz(){
    stopTimer();
    let score = 0;
    questions.forEach((q, i)=>{
        if(state.answers[i] === q.answer) score += 1;
    });
    state.score = score;
    showResult();
    console.log(score);
}

function showResult(){
    els.scoreText.textContent = `du fikk ${state.score} av ${questions.length} (${Math.round((state.score / questions.length) * 100)}%).`;
    els.result.classList.remove('hidden');
}

function restart(){
    state.index = 0;
    state.answers = Array(questions.length).fill(null);
    state.score = 0;
    state.remaining = questions.length * state.timePerQuestion;
    els.result.classList.add('hidden');
    render();
    stopTimer();
    startTimer();
    console.log("Restart")
}

els.nextBtn.addEventListener('click', next);
els.prevBtn.addEventListener('click', prev);
els.restartBtn.addEventListener('click', restart);

// init
render();
startTimer();
question = {
    title: "spørsmål tittel",
    description: "spørsmål beskrivelse."
};
