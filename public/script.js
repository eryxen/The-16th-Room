// The 16th Room v1.3 - Fixed Frontend

// ============ MBTI Questions ============
const mbtiQuestions = [
    // EI
    { text: "在黑暗的房间里，你更愿意...", a: "找其他人一起探索，互相壮胆", b: "独自静静观察，避免引起注意" },
    { text: "恐怖电影中，你更害怕...", a: "被所有人抛弃，孤立无援", b: "被迫成为众人焦点" },
    { text: "参加聚会时，你通常...", a: "主动与很多人交流", b: "找几个熟悉的人深入交谈" },
    // SN
    { text: "听到奇怪声音时，你的第一反应是...", a: "仔细分辨声音的来源和性质", b: "想象各种可能的恐怖原因" },
    { text: "面对超自然现象，你更相信...", a: "能看到、听到的具体证据", b: "直觉和第六感的警告" },
    { text: "学习新事物时，你更喜欢...", a: "从具体细节开始学习", b: "先理解整体概念和联系" },
    // TF
    { text: "面对未知威胁，你倾向于...", a: "冷静分析局势，制定逻辑策略", b: "考虑对所有人的情感影响" },
    { text: "做重要决定时，你更重视...", a: "客观事实和逻辑推理", b: "内心感受和价值观" },
    { text: "批评别人时，你更注重...", a: "指出具体问题和解决方案", b: "考虑对方的感受和自尊" },
    // JP
    { text: "在危机中，你更喜欢...", a: "按照既定计划行动", b: "灵活应变，适应情况" },
    { text: "在不确定的情况下，你更倾向于...", a: "尽快做出明确决定", b: "保持开放，收集更多信息" },
    { text: "面对变化时，你更...", a: "希望有充分的准备时间", b: "享受变化带来的新鲜感" }
];

// ============ State ============
let state = {
    currentQuestion: 0,
    answers: [],
    userType: null,
    npcType: null,
    npc: null,
    horrorLevel: 1,
    userName: '',
    userGender: ''
};

// ============ Functions ============
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenName + '-screen').classList.add('active');
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
    document.getElementById('question-counter').textContent = (state.currentQuestion + 1) + ' / ' + mbtiQuestions.length;
    document.getElementById('progress').style.width = ((state.currentQuestion + 1) / mbtiQuestions.length * 100) + '%';
    
    const container = document.getElementById('question-options');
    container.innerHTML = '';
    
    // Option A
    const btnA = document.createElement('div');
    btnA.className = 'option';
    btnA.textContent = 'A: ' + q.a;
    btnA.onclick = function() { selectAnswer('A'); };
    container.appendChild(btnA);
    
    // Option B
    const btnB = document.createElement('div');
    btnB.className = 'option';
    btnB.textContent = 'B: ' + q.b;
    btnB.onclick = function() { selectAnswer('B'); };
    container.appendChild(btnB);
    
    updateNavButtons();
}

function selectAnswer(ans) {
    state.answers[state.currentQuestion] = ans;
    document.querySelectorAll('.option').forEach(function(opt, i) {
        opt.classList.toggle('selected', (ans === 'A' && i === 0) || (ans === 'B' && i === 1));
    });
    updateNavButtons();
    
    // Auto advance to next question
    setTimeout(function() {
        if (state.currentQuestion < mbtiQuestions.length - 1) {
            nextQuestion();
        } else {
            finishTest();
        }
    }, 300);
}

function updateNavButtons() {
    document.getElementById('prev-btn').disabled = state.currentQuestion === 0;
    const nextBtn = document.getElementById('next-btn');
    const isLast = state.currentQuestion === mbtiQuestions.length - 1;
    nextBtn.disabled = !state.answers[state.currentQuestion];
    nextBtn.textContent = isLast ? '完成' : '下一题';
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
    document.getElementById('loading').classList.remove('hidden');
    
    // Convert A/B to MBTI
    let mbti = '';
    // E/I (questions 0-2)
    let e = state.answers.filter((a, i) => i < 3 && a === 'A').length;
    mbti += e > 1 ? 'E' : 'I';
    // S/N (questions 3-5)
    let s = state.answers.filter((a, i) => i >= 3 && i < 6 && a === 'A').length;
    mbti += s > 1 ? 'S' : 'N';
    // T/F (questions 6-8)
    let t = state.answers.filter((a, i) => i >= 6 && i < 9 && a === 'A').length;
    mbti += t > 1 ? 'T' : 'F';
    // J/P (questions 9-11)
    let j = state.answers.filter((a, i) => i >= 9 && a === 'A').length;
    mbti += j > 1 ? 'J' : 'P';
    
    const opposites = {
        'INTJ':'ESFP','INTP':'ESFJ','ENTJ':'ISFP','ENTP':'ISFJ',
        'INFJ':'ESTP','INFP':'ESTJ','ENFJ':'ISTP','ENFP':'ISTJ',
        'ISTJ':'ENFP','ISFJ':'ENTP','ESTJ':'INFP','ESFJ':'INTP',
        'ISTP':'ENFJ','ISFP':'ENTJ','ESTP':'INFJ','ESFP':'INTJ'
    };
    
    const npcNames = {
        'ESFP':{name:'The Chaotic Performer',desc:'疯狂的表演者，强迫你放弃所有计划，活在混乱当下',scenario:'你被困在永不停歇的派对中，音乐震耳欲聋...'},
        'ESFJ':{name:'The Social Enforcer',desc:'社交暴君，强迫你服从群体规范',scenario:'你在一个窒息的社交聚会上...'},
        'ISFP':{name:'The Passive Saboteur',desc:'被动攻击者，用沉默破坏你的雄心',scenario:'你的每个计划都被温柔抵制...'},
        'ISFJ':{name:'The Tradition Keeper',desc:'传统守护者，用规则束缚你的创新',scenario:'你被无数规则包围...'},
        'ESTP':{name:'The Reckless Realist',desc:'鲁莽的现实主义者，嘲笑你的理想',scenario:'你被困在噪音中...'},
        'ESTJ':{name:'The Corporate Overlord',desc:'冷酷的企业高管，要求你服从系统',scenario:'你在冷酷的办公室里...'},
        'ISTP':{name:'The Cold Analyst',desc:'冷漠的分析师，否定你帮助他人的意义',scenario:'你想要帮助的人都拒绝你...'},
        'ISTJ':{name:'The Rigid Systematizer',desc:'死板的系统管理员，否定你的创意',scenario:'你被困在严格的系统中...'},
        'ENFP':{name:'The Chaotic Idealist',desc:'混乱的理想主义者，强迫你拥抱无序',scenario:'你的计划被混乱打乱...'},
        'ENTP':{name:'The Ruthless Debater',desc:'无情的辩论家，质疑你的善意',scenario:'你的每个举动都被质疑动机...'},
        'INFP':{name:'The Sensitive Idealist',desc:'敏感的理想主义者，用情感质疑你的决定',scenario:'你的每个决定都被质疑道德...'},
        'INTP':{name:'The Logical Hermit',desc:'逻辑隐士，否定你的社交努力',scenario:'你的关怀被冷酷分析摧毁...'},
        'ENFJ':{name:'The Overbearing Guide',desc:'专横的引导者，强迫你按他的方式发展',scenario:'你被导师控制...'},
        'ENTJ':{name:'The Demanding Commander',desc:'苛刻的指挥官，强迫你服从目标',scenario:'你被迫放弃个人价值...'},
        'INFJ':{name:'The Prophetic Manipulator',desc:'先知操控者，用预言控制你的行为',scenario:'先知不断告诉你注定的失败...'},
        'INTJ':{name:'The Master Strategist',desc:'主策略师，用计划否定你的自然表达',scenario:'你被困在系统中，失去自我...'}
    };
    
    const npcType = opposites[mbti] || 'ESFP';
    const npc = npcNames[npcType] || npcNames['ESFP'];
    
    state.userType = mbti;
    state.npcType = npcType;
    state.npc = npc;
    
    document.getElementById('user-type').textContent = mbti;
    document.getElementById('npc-name').textContent = npc.name;
    document.getElementById('npc-desc').textContent = npc.desc;
    document.getElementById('scenario').textContent = npc.scenario;
    
    showScreen('result');
    document.getElementById('loading').classList.add('hidden');
}

function enterChat() {
    showScreen('char');
}

function showCharScreen() {
    showScreen('char');
}

function startChat() {
    const name = document.getElementById('char-name').value.trim() || '陌生人';
    state.userName = name;
    
    document.getElementById('current-npc').textContent = '与 ' + state.npc.name + ' 对话';
    document.getElementById('chat-messages').innerHTML = '';
    
    const genderText = state.userGender === 'male' ? '他' : state.userGender === 'female' ? '她' : '它';
    const introMsg = state.npc.scenario + '\n\n' + state.npc.name + '注意到了' + genderText + '——' + state.userName + '。';
    
    addMessage('ai', state.npc.name, introMsg);
    showScreen('chat');
}

function selectGender(gender, btn) {
    state.userGender = gender;
    document.querySelectorAll('.gender-btn').forEach(function(b) {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
}

function addMessage(sender, name, content) {
    const div = document.createElement('div');
    div.className = 'message ' + sender;
    div.innerHTML = '<div class="message-sender">' + name + '</div><div class="message-content">' + content + '</div>';
    document.getElementById('chat-messages').appendChild(div);
    document.getElementById('chat-messages').scrollTop = 99999;
}

async function sendMessage() {
    const input = document.getElementById('message-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    addMessage('user', state.userName, msg);
    input.value = '';
    document.getElementById('loading').classList.remove('hidden');
    
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                message: msg, 
                userType: state.userType, 
                npcType: state.npcType, 
                horrorLevel: state.horrorLevel,
                userName: state.userName,
                userGender: state.userGender
            })
        });
        const result = await res.json();
        if (result.success) {
            addMessage('ai', state.npc.name, result.message);
            if (Math.random() < 0.3 && state.horrorLevel < 5) {
                state.horrorLevel++;
                document.querySelector('.level-dots').textContent = '●'.repeat(state.horrorLevel) + '○'.repeat(5-state.horrorLevel);
                addMessage('ai', '系统', '⚠️ 恐怖等级升至 ' + state.horrorLevel + '/5');
            }
        }
    } catch(e) {
        addMessage('ai', '系统', '连接中断');
    }
    
    document.getElementById('loading').classList.add('hidden');
}

// ============ Parallax Effect ============
function initParallax() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    document.addEventListener('mousemove', function(e) {
        const x = (window.innerWidth / 2 - e.clientX) / 30;
        const y = (window.innerHeight / 2 - e.clientY) / 30;
        
        container.style.transform = 
            'translateZ(-10px) rotateY(' + x + 'deg) rotateX(' + -y + 'deg)';
    });
}

// ============ Init ============
window.onload = function() {
    document.getElementById('start-btn').onclick = startTest;
    document.getElementById('next-btn').onclick = nextQuestion;
    document.getElementById('prev-btn').onclick = prevQuestion;
    document.getElementById('create-char-btn').onclick = showCharScreen;
    document.getElementById('start-chat-btn').onclick = startChat;
    document.getElementById('send-btn').onclick = sendMessage;
    document.getElementById('message-input').onkeypress = function(e) { if(e.key==='Enter') sendMessage(); };
    document.getElementById('restart-btn').onclick = function() { location.reload(); };
    document.getElementById('escape-btn').onclick = function() { addMessage('ai','房间','你试图逃离，但门已经被锁死了...'); };
    
    // Gender selection
    document.querySelectorAll('.gender-btn').forEach(function(btn) {
        btn.onclick = function() {
            selectGender(this.dataset.gender, this);
        };
    });
    
    // Init parallax
    initParallax();
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(function() {});
    }
};
