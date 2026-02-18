// The 16th Room v1.1 - Simple Frontend

// ============ MBTI Questions ============
const mbtiQuestions = [
    { text: "在黑暗的房间里，你更愿意...", E: "找其他人一起探索", I: "独自静静观察" },
    { text: "听到奇怪声音时，你的第一反应是...", S: "仔细分辨声音来源", N: "想象各种可能原因" },
    { text: "面对未知威胁，你倾向于...", T: "冷静分析，制定策略", F: "考虑对所有人的影响" },
    { text: "在危机中，你更喜欢...", J: "按照既定计划行动", P: "灵活应变" },
    { text: "恐怖电影中，你更害怕...", E: "被所有人抛弃", I: "被迫成为焦点" },
    { text: "面对超自然现象，你更相信...", S: "能看到的具体证据", N: "直觉和第六感" },
    { text: "做重要决定时，你更重视...", T: "客观事实和逻辑", F: "内心感受和价值观" },
    { text: "在不确定的情况下，你更倾向于...", J: "尽快做出决定", P: "保持开放收集更多信息" },
    { text: "参加聚会时，你通常...", E: "主动与多人交流", I: "找熟人深入交谈" },
    { text: "学习新事物时，你更喜欢...", S: "从具体细节开始", N: "先理解整体概念" },
    { text: "批评别人时，你更注重...", T: "指出具体问题", F: "考虑对方感受" },
    { text: "面对变化时，你更...", J: "希望有充分准备时间", P: "享受变化的新鲜感" }
];

// ============ State ============
let state = {
    currentQuestion: 0,
    answers: [],
    userType: null,
    npcType: null,
    npc: null,
    horrorLevel: 1
};

// ============ DOM Elements ============
const screens = {
    welcome: document.getElementById('welcome-screen'),
    test: document.getElementById('test-screen'),
    result: document.getElementById('result-screen'),
    chat: document.getElementById('chat-screen')
};

// ============ Functions ============
function showScreen(screenName) {
    console.log('Showing screen:', screenName);
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function startTest() {
    state.currentQuestion = 0;
    state.answers = [];
    showQuestion();
    showScreen('test');
}

function showQuestion() {
    const q = mbtiQuestions[state.currentQuestion];
    document.getElementById('question-text').textContent = q.text;
    document.getElementById('question-counter').textContent = 
        `${state.currentQuestion + 1} / ${mbtiQuestions.length}`;
    
    const progress = ((state.currentQuestion + 1) / mbtiQuestions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = '';
    
    // Get the two options from the question (it has keys like E,I or S,N etc.)
    const keys = Object.keys(q).filter(k => k !== 'text');
    const opt1 = keys[0];
    const opt2 = keys[1];
    
    // Option 1
    const btn1 = document.createElement('div');
    btn1.className = 'option';
    btn1.textContent = q[opt1];
    btn1.onclick = () => selectAnswer(opt1);
    optionsContainer.appendChild(btn1);
    
    // Option 2
    const btn2 = document.createElement('div');
    btn2.className = 'option';
    btn2.textContent = q[opt2];
    btn2.onclick = () => selectAnswer(opt2);
    optionsContainer.appendChild(btn2);
    
    // Highlight selected
    if (state.answers[state.currentQuestion]) {
        const selected = state.answers[state.currentQuestion] === opt1 ? btn1 : btn2;
        selected.classList.add('selected');
    }
    
    updateNavButtons();
}

function selectAnswer(answer) {
    state.answers[state.currentQuestion] = answer;
    
    // Update UI
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    const index = answer === 'E' ? 0 : 1;
    document.querySelectorAll('.option')[index].classList.add('selected');
    
    updateNavButtons();
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = state.currentQuestion === 0;
    
    const hasAnswer = state.answers[state.currentQuestion];
    const isLast = state.currentQuestion === mbtiQuestions.length - 1;
    
    if (isLast && hasAnswer) {
        nextBtn.textContent = '完成';
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = '下一题';
        nextBtn.disabled = !hasAnswer;
    }
}

function nextQuestion() {
    if (state.currentQuestion < mbtiQuestions.length - 1) {
        state.currentQuestion++;
        showQuestion();
    } else {
        finishTest();
    }
}

function prevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        showQuestion();
    }
}

async function finishTest() {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
    
    try {
        const response = await fetch('/api/mbti-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: state.answers })
        });
        
        const result = await response.json();
        state.userType = result.userType;
        state.npcType = result.npcType;
        state.npc = result.npc;
        
        // Show results
        document.getElementById('user-type').textContent = result.userType;
        document.getElementById('npc-name').textContent = result.npc.name;
        document.getElementById('npc-desc').textContent = result.npc.description;
        document.getElementById('scenario').textContent = result.npc.scenario;
        
        showScreen('result');
    } catch (e) {
        console.error('Test error:', e);
        alert('测试失败，请重试');
    }
    
    loading.classList.add('hidden');
}

function enterChat() {
    document.getElementById('current-npc').textContent = `与 ${state.npc.name} 对话`;
    
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    
    // Welcome message
    addMessage('ai', state.npc.name, state.npc.scenario);
    
    showScreen('chat');
}

function addMessage(sender, name, content) {
    const messagesContainer = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `<div class="message-sender">${name}</div><div class="message-content">${content}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (!message) return;
    
    addMessage('user', '你', message);
    input.value = '';
    
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                userType: state.userType,
                npcType: state.npcType,
                horrorLevel: state.horrorLevel
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            addMessage('ai', state.npc.name, result.message);
            
            // Level up
            if (Math.random() < 0.3 && state.horrorLevel < 5) {
                state.horrorLevel++;
                const dots = '●'.repeat(state.horrorLevel) + '○'.repeat(5 - state.horrorLevel);
                document.querySelector('.level-dots').textContent = dots;
                addMessage('ai', '系统', `⚠️ 恐怖等级升至 ${state.horrorLevel}/5`);
            }
        } else {
            addMessage('ai', '系统', '抱歉，AI暂时无法回应');
        }
    } catch (e) {
        console.error('Chat error:', e);
        addMessage('ai', '系统', '连接中断');
    }
    
    loading.classList.add('hidden');
}

function restart() {
    if (confirm('确定要重新开始吗？')) {
        state = { currentQuestion: 0, answers: [], userType: null, npcType: null, npc: null, horrorLevel: 1 };
        showScreen('welcome');
    }
}

// ============ Initialize ============
function init() {
    console.log('Initializing The 16th Room v1.2...');
    
    const startBtn = document.getElementById('start-btn');
    const testScreen = document.getElementById('test-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    console.log('startBtn:', startBtn);
    console.log('testScreen:', testScreen);
    console.log('welcomeScreen:', welcomeScreen);
    
    if (startBtn) {
        startBtn.onclick = function() {
            console.log('Button clicked! Switching to test screen...');
            welcomeScreen.classList.remove('active');
            testScreen.classList.add('active');
            startTest();
        };
        console.log('Start button event attached');
    } else {
        console.error('Start button NOT FOUND');
    }
    
    // Navigation
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (nextBtn) nextBtn.onclick = nextQuestion;
    if (prevBtn) prevBtn.onclick = prevQuestion;
    
    // Enter room
    const enterBtn = document.getElementById('enter-room-btn');
    if (enterBtn) enterBtn.onclick = enterChat;
    
    // Chat
    const sendBtn = document.getElementById('send-btn');
    const msgInput = document.getElementById('message-input');
    
    if (sendBtn) sendBtn.onclick = sendMessage;
    if (msgInput) msgInput.onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };
    
    // Controls
    const restartBtn = document.getElementById('restart-btn');
    const escapeBtn = document.getElementById('escape-btn');
    
    if (restartBtn) restartBtn.onclick = restart;
    if (escapeBtn) escapeBtn.onclick = () => {
        addMessage('ai', '房间', '你试图逃离，但门已经被锁死了...');
    };
    
    console.log('Initialization complete!');
}

// Start when DOM is ready
window.onload = function() {
    console.log('Window loaded, running init...');
    init();
    
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    }
};
