// The 16th Room v1.0 - Frontend Logic

class The16thRoom {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.userType = null;
        this.npcType = null;
        this.currentNpc = null;
        this.horrorLevel = 1;
        this.chatHistory = [];
        
        this.initializeQuestions();
        this.bindEvents();
    }
    
    initializeQuestions() {
        this.questions = [
            {
                text: "在一个黑暗的房间里，你更愿意...",
                options: {
                    E: "找其他人一起探索，互相壮胆",
                    I: "独自静静观察，避免引起注意"
                }
            },
            {
                text: "听到奇怪声音时，你的第一反应是...",
                options: {
                    S: "仔细分辨声音的来源和性质",
                    N: "想象各种可能的恐怖原因"
                }
            },
            {
                text: "面对未知威胁，你倾向于...",
                options: {
                    T: "冷静分析局势，制定逻辑策略",
                    F: "考虑对所有人的情感影响"
                }
            },
            {
                text: "在危机中，你更喜欢...",
                options: {
                    J: "按照既定计划行动",
                    P: "灵活应变，适应情况"
                }
            },
            {
                text: "恐怖电影中，你更害怕...",
                options: {
                    E: "被所有人抛弃，孤立无援",
                    I: "被迫成为众人焦点"
                }
            },
            {
                text: "面对超自然现象，你更相信...",
                options: {
                    S: "能看到、听到的具体证据",
                    N: "直觉和第六感的警告"
                }
            },
            {
                text: "做重要决定时，你更重视...",
                options: {
                    T: "客观事实和逻辑推理",
                    F: "内心感受和价值观"
                }
            },
            {
                text: "在不确定的情况下，你更倾向于...",
                options: {
                    J: "尽快做出明确决定",
                    P: "保持开放，收集更多信息"
                }
            },
            {
                text: "参加聚会时，你通常...",
                options: {
                    E: "主动与很多人交流",
                    I: "找几个熟悉的人深入交谈"
                }
            },
            {
                text: "学习新事物时，你更喜欢...",
                options: {
                    S: "从具体细节开始学习",
                    N: "先理解整体概念和联系"
                }
            },
            {
                text: "批评别人时，你更注重...",
                options: {
                    T: "指出具体问题和解决方案",
                    F: "考虑对方的感受和自尊"
                }
            },
            {
                text: "面对变化时，你更...",
                options: {
                    J: "希望有充分的准备时间",
                    P: "享受变化带来的新鲜感"
                }
            }
        ];
    }
    
    bindEvents() {
        // 开始按钮
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('Start button clicked!');
                this.showScreen('test-screen');
                this.startTest();
            });
        } else {
            console.error('Start button not found!');
        }
        
        // 测试导航
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.prevQuestion();
        });
        
        // 进入房间
        document.getElementById('enter-room-btn').addEventListener('click', () => {
            this.enterChatRoom();
        });
        
        // 聊天功能
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });
        
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // 控制按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
        
        document.getElementById('escape-btn').addEventListener('click', () => {
            this.escapeRoom();
        });
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    startTest() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('question-counter').textContent = 
            `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        
        // 创建选项
        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';
        
        Object.entries(question.options).forEach(([key, text]) => {
            const option = document.createElement('div');
            option.className = 'option';
            option.textContent = text;
            option.dataset.answer = key;
            
            option.addEventListener('click', () => {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                this.answers[this.currentQuestionIndex] = key;
                this.updateNavButtons();
            });
            
            optionsContainer.appendChild(option);
        });
        
        // 恢复之前的选择
        if (this.answers[this.currentQuestionIndex]) {
            const selectedOption = optionsContainer.querySelector(
                `[data-answer="${this.answers[this.currentQuestionIndex]}"]`
            );
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
        
        this.updateNavButtons();
    }
    
    updateNavButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        const hasAnswer = this.answers[this.currentQuestionIndex];
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        
        if (isLastQuestion && hasAnswer) {
            nextBtn.textContent = '完成测试';
            nextBtn.disabled = false;
        } else {
            nextBtn.textContent = '下一题';
            nextBtn.disabled = !hasAnswer;
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        } else {
            this.finishTest();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion();
        }
    }
    
    async finishTest() {
        this.showLoading(true);
        
        try {
            const response = await fetch('/api/mbti-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answers: this.answers
                })
            });
            
            const result = await response.json();
            this.userType = result.userType;
            this.npcType = result.npcType;
            this.currentNpc = result.npc;
            
            this.showResults(result);
        } catch (error) {
            console.error('Test failed:', error);
            alert('测试失败，请重试');
        }
        
        this.showLoading(false);
    }
    
    showResults(result) {
        document.getElementById('user-type').textContent = result.userType;
        document.getElementById('npc-name').textContent = result.npc.name;
        document.getElementById('npc-desc').textContent = result.npc.description;
        document.getElementById('scenario').textContent = result.npc.scenario;
        
        this.showScreen('result-screen');
    }
    
    enterChatRoom() {
        document.getElementById('current-npc').textContent = 
            `正在与 ${this.currentNpc.name} 对话`;
        
        this.chatHistory = [];
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '';
        
        // 添加初始消息
        this.addMessage('ai', this.currentNpc.name, this.getInitialMessage());
        
        this.showScreen('chat-screen');
    }
    
    getInitialMessage() {
        const greetings = [
            `欢迎来到我的领域...${this.userType}类型的人，你的弱点我一清二楚。`,
            `终于等到你了...让我来看看${this.userType}的恐惧是什么味道。`,
            `${this.userType}？有意思...我知道如何让你感到真正的恐惧。`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    addMessage(sender, name, content) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        messageDiv.innerHTML = `
            <div class="message-sender">${name}</div>
            <div class="message-content">${content}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.chatHistory.push({ sender, name, content });
    }
    
    async sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // 添加用户消息
        this.addMessage('user', '你', message);
        input.value = '';
        
        // 显示加载状态
        this.showLoading(true);
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    userType: this.userType,
                    npcType: this.npcType,
                    horrorLevel: this.horrorLevel
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // 添加AI回复
                this.addMessage('ai', this.currentNpc.name, result.message);
                
                // 可能升级恐怖等级
                if (this.chatHistory.length % 6 === 0 && this.horrorLevel < 5) {
                    this.horrorLevel++;
                    this.updateHorrorLevel();
                }
            } else {
                this.addMessage('ai', '系统', '抱歉，AI暂时无法回应，请稍后再试。');
            }
        } catch (error) {
            console.error('Chat error:', error);
            this.addMessage('ai', '系统', '连接中断，恐怖体验暂停...');
        }
        
        this.showLoading(false);
    }
    
    updateHorrorLevel() {
        const levelIndicator = document.getElementById('horror-level');
        const dots = '●'.repeat(this.horrorLevel) + '○'.repeat(5 - this.horrorLevel);
        levelIndicator.querySelector('.level-dots').textContent = dots;
        
        // 显示升级提示
        this.addMessage('ai', '系统', `⚠️ 恐怖等级升级至 ${this.horrorLevel}/5`);
    }
    
    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }
    
    restart() {
        if (confirm('确定要重新开始吗？当前进度将丢失。')) {
            this.showScreen('welcome-screen');
            this.currentQuestionIndex = 0;
            this.answers = [];
            this.userType = null;
            this.npcType = null;
            this.currentNpc = null;
            this.horrorLevel = 1;
            this.chatHistory = [];
        }
    }
    
    escapeRoom() {
        const escapeMessages = [
            "你试图逃离，但门已经被锁死了...",
            "逃跑只会让恐惧更加强烈...", 
            "没有人能从自己的内心阴影中逃脱...",
            "这里是你内心的映射，逃到哪里都是徒劳..."
        ];
        
        const randomMessage = escapeMessages[Math.floor(Math.random() * escapeMessages.length)];
        this.addMessage('ai', '房间', randomMessage);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new The16thRoom();
});