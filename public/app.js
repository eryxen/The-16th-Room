console.log("JS loaded");

const qs = [
    {t:"在黑暗的房间里，你更愿意...",a:"找其他人一起探索，互相壮胆",b:"独自静静观察，避免引起注意"},
    {t:"恐怖电影中，你更害怕...",a:"被所有人抛弃，孤立无援",b:"被迫成为众人焦点"},
    {t:"参加聚会时，你通常...",a:"主动与很多人交流",b:"找几个熟悉的人深入交谈"},
    {t:"听到奇怪声音时，你的第一反应是...",a:"仔细分辨声音的来源和性质",b:"想象各种可能的恐怖原因"},
    {t:"面对超自然现象，你更相信...",a:"能看到、听到的具体证据",b:"直觉和第六感的警告"},
    {t:"学习新事物时，你更喜欢...",a:"从具体细节开始学习",b:"先理解整体概念和联系"},
    {t:"面对未知威胁，你倾向于...",a:"冷静分析局势，制定逻辑策略",b:"考虑对所有人的情感影响"},
    {t:"做重要决定时，你更重视...",a:"客观事实和逻辑推理",b:"内心感受和价值观"},
    {t:"批评别人时，你更注重...",a:"指出具体问题和解决方案",b:"考虑对方的感受和自尊"},
    {t:"在危机中，你更喜欢...",a:"按照既定计划行动",b:"灵活应变，适应情况"},
    {t:"在不确定的情况下，你更倾向于...",a:"尽快做出明确决定",b:"保持开放，收集更多信息"},
    {t:"面对变化时，你更...",a:"希望有充分的准备时间",b:"享受变化带来的新鲜感"}
];

let st = {q:0, ans:[], ut:null, nt:null, npc:null, hl:1, name:'', gender:''};
const opp = {'INTJ':'ESFP','INTP':'ESFJ','ENTJ':'ISFP','ENTP':'ISFJ','INFJ':'ESTP','INFP':'ESTJ','ENFJ':'ISTP','ENFP':'ISTJ','ISTJ':'ENFP','ISFJ':'ENTP','ESTJ':'INFP','ESFJ':'INTP','ISTP':'ENFJ','ISFP':'ENTJ','ESTP':'INFJ','ESFP':'INTJ'};
const npcs = {
    ESFP:{n:'The Chaotic Performer',d:'疯狂的表演者',s:'你被困在永不停歇的派对中...'},
    ESFJ:{n:'The Social Enforcer',d:'社交暴君',s:'你在窒息的社交聚会上...'},
    ISFP:{n:'The Passive Saboteur',d:'被动攻击者',s:'你的每个计划都被温柔抵制...'},
    ISFJ:{n:'The Tradition Keeper',d:'传统守护者',s:'你被无数规则包围...'},
    ESTP:{n:'The Reckless Realist',d:'鲁莽的现实主义者',s:'你被困在噪音中...'},
    ESTJ:{n:'The Corporate Overlord',d:'冷酷的企业高管',s:'你在冷酷的办公室里...'},
    ISTP:{n:'The Cold Analyst',d:'冷漠的分析师',s:'你想要帮助的人都拒绝你...'},
    ISTJ:{n:'The Rigid Systematizer',d:'死板的系统管理员',s:'你被困在严格的系统中...'},
    ENFP:{n:'The Chaotic Idealist',d:'混乱的理想主义者',s:'你的计划被混乱打乱...'},
    ENTP:{n:'The Ruthless Debater',d:'无情的辩论家',s:'你的每个举动都被质疑动机...'},
    INFP:{n:'The Sensitive Idealist',d:'敏感的理想主义者',s:'你的每个决定都被质疑道德...'},
    INTP:{n:'The Logical Hermit',d:'逻辑隐士',s:'你的关怀被冷酷分析摧毁...'},
    ENFJ:{n:'The Overbearing Guide',d:'专横的引导者',s:'你被导师控制...'},
    ENTJ:{n:'The Demanding Commander',d:'苛刻的指挥官',s:'你被迫放弃个人价值...'},
    INFJ:{n:'The Prophetic Manipulator',d:'先知操控者',s:'先知不断告诉你注定的失败...'},
    INTJ:{n:'The Master Strategist',d:'主策略师',s:'你被困在系统中，失去自我...'}
};

// Parallax
document.getElementById("start-btn").addEventListener("click", startTest);
document.addEventListener('mousemove', e => {
    const c = document.querySelector('.container');
    if(c) {
        const x = (window.innerWidth/2 - e.clientX) / 50;
        const y = (window.innerHeight/2 - e.clientY) / 50;
        c.style.transform = `translateZ(-20px) rotateY(${x}deg) rotateX(${-y}deg)`;
    }
});

function showScr(n) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(n+'-screen').classList.add('active');
}

function startTest() { console.log("startTest clicked");
    st.q = 0; st.ans = [];
    showQ();
    showScr('test');
}

function showQ() {
    const q = qs[st.q];
    document.getElementById('q-text').textContent = q.t;
    document.getElementById('counter').textContent = (st.q+1) + ' / ' + qs.length;
    document.getElementById('progress').style.width = ((st.q+1)/qs.length*100) + '%';
    
    const oc = document.getElementById('q-opts');
    oc.innerHTML = '';
    ['a','b'].forEach(k => {
        const b = document.createElement('div');
        b.className = 'option-btn' + (st.ans[st.q]===k ? ' selected' : '');
        b.textContent = (k.toUpperCase()+': ' + q[k]);
        b.onclick = () => selAns(k);
        oc.appendChild(b);
    });
}

function selAns(k) {
    st.ans[st.q] = k;
    document.querySelectorAll('.option-btn').forEach((o,i) => o.classList.toggle('selected', (k==='a'&&i===0)||(k==='b'&&i===1)));
    setTimeout(() => st.q < 11 ? nextQ() : finish(), 350);
}

function nextQ() { if(st.q<11){st.q++;showQ();} }
function prevQ() { if(st.q>0){st.q--;showQ();} }

function finish() {
    let mt='', e=st.ans.filter((a,i)=>i<3&&a==='a').length;
    mt += e>1?'E':'I';
    let s=st.ans.filter((a,i)=>i>=3&&i<6&&a==='a').length;
    mt += s>1?'S':'N';
    let t=st.ans.filter((a,i)=>i>=6&&i<9&&a==='a').length;
    mt += t>1?'T':'F';
    let j=st.ans.filter((a,i)=>i>=9&&a==='a').length;
    mt += j>1?'J':'P';
    st.ut = mt; st.nt = opp[mt]||'ESFP'; st.npc = npcs[st.nt]||npcs.ESFP;
    document.getElementById('u-type').textContent = mt;
    document.getElementById('npc-name').textContent = st.npc.n;
    document.getElementById('npc-desc').textContent = st.npc.d;
    document.getElementById('scenario').textContent = st.npc.s;
    showScr('result');
}

function showChar() { showScr('char'); }

function selGender(el, g) {
    st.gender = g;
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
}

function startChat() {
    st.name = document.getElementById('char-name').value.trim() || '陌生人';
    document.getElementById('npc-indicator').textContent = '与 ' + st.npc.n + ' 对话';
    document.getElementById('msgs').innerHTML = '';
    addMsg('ai', st.npc.n, st.npc.s);
    showScr('chat');
}

function addMsg(t, n, c) {
    const d = document.createElement('div');
    d.className = 'chat-msg ' + t;
    d.innerHTML = '<div class="chat-sender">'+n+'</div><div>'+c+'</div>';
    document.getElementById('msgs').appendChild(d);
    document.getElementById('msgs').scrollTop = 9999;
}

async function sendMsg() {
    const inp = document.getElementById('msg-input');
    const m = inp.value.trim();
    if(!m) return;
    addMsg('user', st.name, m);
    inp.value = '';
    document.getElementById('loader').classList.remove('hidden');
    try {
        const r = await fetch('/api/chat', {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({message:m, userType:st.ut, npcType:st.nt, horrorLevel:st.hl, userName:st.name, userGender:st.gender})
        });
        const x = await r.json();
        if(x.success) {
            addMsg('ai', st.npc.n, x.message); document.getElementById("loader").classList.add("hidden");
            if(Math.random()<0.3 && st.hl<5) {
                st.hl++;
                addMsg('ai','系统','⚠️ 恐怖等级升至 '+st.hl+'/5');
            }
        }
    } catch(e) { document.getElementById("loader").classList.add("hidden"); addMsg('ai','系统','连接中断'); }
    document.getElementById('loader').classList.add('hidden');
}
