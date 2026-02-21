(function(){
"use strict";

// The 16th Room v2.1 - 30题MBTI测试 + 48个NPC角色
var qs=[
  // ==================== E/I 外向/内向 (8题) ====================
  {t:"当你进入一个充满陌生人的赛博酒吧时，你会...",a:"主动和吧台的人搭话，快速融入气氛",b:"找个角落坐下，观察周围的人"},
  {t:"在霓虹闪烁的街道上，你更喜欢...",a:"和朋友们一起探索夜市",b:"独自漫步，享受城市的孤独感"},
  {t:"当你完成一项艰难的黑客任务后，你会...",a:"立刻分享给朋友，庆祝胜利",b:"自己默默享受成就感"},
  {t:"在虚拟会议中，你通常...",a:"积极发言，分享自己的想法",b:"保持静音，在聊天框里打字"},
  {t:"当你感到疲惫时，你更想要...",a:"找朋友聊天，从交流中获得能量",b:"关掉所有设备，独自休息"},
  {t:"在地下派对上，你更可能...",a:"成为舞池的焦点",b:"在暗处看别人跳舞"},
  {t:"当有人邀请你参加突然的聚会时，你...",a:"立刻答应，期待见到新面孔",b:"犹豫一下，更想待在家里"},
  {t:"你更享受的周末是...",a:"参加各种社交活动，见很多人",b:"在家里充电，做自己的事"},
  // ==================== S/N 感觉/直觉 (8题) ====================
  {t:"当你看到一个破旧的机器人时，你首先注意到...",a:"它的零件损坏程度、表面锈蚀细节",b:"它可能的过去故事、存在的意义"},
  {t:"学习新的编程语言时，你更喜欢...",a:"通过实际项目边做边学",b:"先理解整体架构和设计哲学"},
  {t:"在描述一个赛博朋克城市时，你会...",a:"描述街道布局、建筑高度、霓虹颜色",b:"想象这个城市的未来走向、社会结构"},
  {t:"你更相信...",a:"数据库里记录的事实",b:"你的直觉和预感"},
  {t:"当你阅读一份技术文档时，你更关注...",a:"具体的操作步骤和参数",b:"背后的设计理念和可能性"},
  {t:"你更容易记住...",a:"具体发生的事情和细节",b:"事物之间的联系和模式"},
  {t:"在解决技术问题时，你倾向于...",a:"使用已验证的方法",b:"尝试创新的解决方案"},
  {t:"你更喜欢的任务是...",a:"有明确步骤和结果的",b:"需要想象力和创造力的"},
  // ==================== T/F 思考/情感 (7题) ====================
  {t:"当队友犯了一个严重错误时，你会...",a:"直接指出问题，分析错在哪里",b:"先安慰对方，再委婉提醒"},
  {t:"在做重要决定时，你更依赖...",a:"逻辑分析和数据支持",b:"个人价值观和他人感受"},
  {t:"当你不同意别人的方案时，你会...",a:"直接指出逻辑漏洞",b:"考虑对方感受，用建议的方式表达"},
  {t:"你更容易被...说服",a:"事实、数据、逻辑推理",b:"情感故事、道德价值"},
  {t:"在冲突中，你更看重...",a:"谁的观点更合理",b:"如何维护关系和谐"},
  {t:"别人对你的评价更可能是...",a:"理性、客观、冷静",b:"善解人意、温暖、体贴"},
  {t:"在批评别人时，你会...",a:"对事不对人，直接说问题",b:"担心伤害对方，尽量委婉"},
  // ==================== J/P 判断/知觉 (7题) ====================
  {t:"你的工作台通常是...",a:"整洁有序，每样东西都有固定位置",b:"看起来混乱，但你知道东西在哪"},
  {t:"面对一个项目截止日期，你会...",a:"提前完成，避免最后时刻的压力",b:"在截止日期前爆发效率"},
  {t:"你更喜欢的工作方式是...",a:"制定详细计划，按步骤执行",b:"保持灵活，随时调整方向"},
  {t:"在做决定时，你倾向于...",a:"快速决定并坚持",b:"保持开放，等待更多信息"},
  {t:"你的日程表通常...",a:"排得很满，每个时段都有安排",b:"留有大量空白，随性安排"},
  {t:"当计划被打乱时，你会...",a:"感到不安，想要重新制定计划",b:"无所谓，享受随机性"},
  {t:"你更喜欢...",a:"确定的事情和结果",b:"保持可能性和灵活性"}
];

var opp={"INTJ":"ESFP","INTP":"ESFJ","ENTJ":"ISFP","ENTP":"ISFJ","INFJ":"ESTP","INFP":"ESTJ","ENFJ":"ISTP","ENFP":"ISTJ","ISTJ":"ENFP","ISFJ":"ENTP","ESTJ":"INFP","ESFJ":"INTP","ISTP":"ENFJ","ISFP":"ENTJ","ESTP":"INFJ","ESFP":"INTJ"};

// v2.1: 简化的NPC数据（完整数据在后端）
var npcs={
ESFP:[{n:"The Chaotic Performer",d:"疯狂的表演者"},{n:"The Sensory Overloader",d:"感官暴君"},{n:"The Manic Spirit",d:"躁狂之灵"}],
ESFJ:[{n:"The Social Enforcer",d:"社交暴君"},{n:"The Harmony Parasite",d:"和谐寄生虫"},{n:"The Tradition Phantom",d:"传统幽灵"}],
ISFP:[{n:"The Passive Saboteur",d:"被动攻击者"},{n:"The Harmony Virus",d:"和谐病毒"},{n:"The Serenity Curse",d:"宁静诅咒"}],
ISFJ:[{n:"The Tradition Keeper",d:"传统守护者"},{n:"The Routine Machine",d:"例行机器"},{n:"The Ancestral Ghost",d:"祖先幽灵"}],
ESTP:[{n:"The Reckless Realist",d:"鲁莽的现实主义者"},{n:"The Impulse Tyrant",d:"冲动暴君"},{n:"The Surface Demon",d:"表面恶魔"}],
ESTJ:[{n:"The Corporate Overlord",d:"冷酷的企业高管"},{n:"The Efficiency Machine",d:"效率机器"},{n:"The System God",d:"系统之神"}],
ISTP:[{n:"The Cold Analyst",d:"冷漠的分析师"},{n:"The Isolation Virus",d:"隔离病毒"},{n:"The Solitude Spirit",d:"孤独之灵"}],
ISTJ:[{n:"The Rigid Systematizer",d:"死板的系统管理员"},{n:"The Routine Parasite",d:"例行寄生虫"},{n:"The Order Demon",d:"秩序恶魔"}],
ENFP:[{n:"The Chaotic Idealist",d:"混乱的理想主义者"},{n:"The Possibility Overloader",d:"可能性过载者"},{n:"The Chaos Fairy",d:"混乱精灵"}],
ENTP:[{n:"The Ruthless Debater",d:"无情的辩论家"},{n:"The Innovation Virus",d:"创新病毒"},{n:"The Chaos Philosopher",d:"混乱哲学家"}],
INFP:[{n:"The Sensitive Idealist",d:"敏感的理想主义者"},{n:"The Empathy Parasite",d:"同理心寄生虫"},{n:"The Idealism Ghost",d:"理想主义幽灵"}],
INTP:[{n:"The Logical Hermit",d:"逻辑隐士"},{n:"The Analysis Engine",d:"分析引擎"},{n:"The Logic Demon",d:"逻辑恶魔"}],
ENFJ:[{n:"The Overbearing Guide",d:"专横的引导者"},{n:"The Harmony Tyrant",d:"和谐暴君"},{n:"The Mentor Phantom",d:"导师幽灵"}],
ENTJ:[{n:"The Demanding Commander",d:"苛刻的指挥官"},{n:"The Ambition Virus",d:"野心病毒"},{n:"The Conquest God",d:"征服之神"}],
INFJ:[{n:"The Prophetic Manipulator",d:"先知操控者"},{n:"The Vision Parasite",d:"愿景寄生虫"},{n:"The Destiny Weaver",d:"命运编织者"}],
INTJ:[{n:"The Master Strategist",d:"主策略师"},{n:"The System Architect",d:"系统建筑师"},{n:"The Architect God",d:"建筑之神"}]
};

var st={q:0,ans:[],ut:null,nt:null,npc:null,npcVariant:0,hl:1,name:"",gender:""};

function $(id){return document.getElementById(id)}
function show(id){document.querySelectorAll(".screen").forEach(function(s){s.classList.remove("active")});$(id).classList.add("active")}

function showQ(){
    var q=qs[st.q];
    $("q-text").textContent=q.t;
    $("cnt").textContent=(st.q+1)+" / "+qs.length;
    $("prog").style.width=((st.q+1)/qs.length*100)+"%";
    var c=$("q-opts");
    c.innerHTML="";
    ["a","b"].forEach(function(k){
        var d=document.createElement("div");
        d.className="opt"+(st.ans[st.q]===k?" sel":"");
        d.textContent=k.toUpperCase()+": "+q[k];
        d.addEventListener("click",function(){selAns(k)});
        c.appendChild(d);
    });
}

function selAns(k){
    st.ans[st.q]=k;
    var opts=document.querySelectorAll(".opt");
    opts.forEach(function(o,i){o.classList.toggle("sel",(k==="a"&&i===0)||(k==="b"&&i===1))});
    setTimeout(function(){st.q<qs.length-1?nextQ():finish()},350);
}

function nextQ(){if(st.q<qs.length-1){st.q++;showQ()}}
function prevQ(){if(st.q>0){st.q--;showQ()}}

function finish(){
    // v2.1: 30题MBTI计算
    // E/I (问题0-7): a=E, b=I - 需要5/8
    // S/N (问题8-15): a=S, b=N - 需要5/8
    // T/F (问题16-22): a=T, b=F - 需要4/7
    // J/P (问题23-29): a=J, b=P - 需要4/7
    var mt="";
    var e=st.ans.filter(function(a,i){return i<8&&a==="a"}).length;
    mt+=e>=5?"E":"I";
    var s=st.ans.filter(function(a,i){return i>=8&&i<16&&a==="a"}).length;
    mt+=s>=5?"S":"N";
    var t=st.ans.filter(function(a,i){return i>=16&&i<23&&a==="a"}).length;
    mt+=t>=4?"T":"F";
    var j=st.ans.filter(function(a,i){return i>=23&&a==="a"}).length;
    mt+=j>=4?"J":"P";
    
    st.ut=mt;
    st.nt=opp[mt]||"ESFP";
    // v2.1: 随机选择NPC变体（0-2）
    st.npcVariant=Math.floor(Math.random()*3);
    st.npc=npcs[st.nt][st.npcVariant];
    
    $("r-type").textContent=mt;
    $("r-npc").textContent=st.npc.n;
    $("r-desc").textContent=st.npc.d;
    $("r-scene").textContent="加载场景中...";
    
    // v2.1: 从后端获取完整NPC数据（包含场景）
    fetch("/api/npc-data",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({npcType:st.nt,variant:st.npcVariant})
    }).then(function(r){return r.json()}).then(function(x){
        if(x.success && x.npc){
            st.npc.fullData=x.npc;
            // 随机选择场景难度
            var scenarios=x.npc.scenarios;
            var scene=scenarios[Math.floor(Math.random()*scenarios.length)];
            $("r-scene").textContent=scene.text;
        }
    }).catch(function(){
        $("r-scene").textContent="场景加载失败";
    });
    
    show("s-result");
}

function addMsg(t,n,c){
    var d=document.createElement("div");
    d.className="msg "+(t==="user"?"u":"a");
    d.innerHTML="<div class='snd'>"+n+"</div><div>"+c+"</div>";
    $("msgs").appendChild(d);
    $("msgs").scrollTop=999999;
}

function sendMsg(){
    var inp=$("inp-msg");
    var m=inp.value.trim();
    if(!m)return;
    addMsg("user",st.name,m);
    inp.value="";
    $("loader").classList.remove("off");
    fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            message:m,
            userType:st.ut,
            npcType:st.nt,
            npcVariant:st.npcVariant,
            horrorLevel:st.hl,
            userName:st.name,
            userGender:st.gender
        })
    }).then(function(r){return r.json()}).then(function(x){
        $("loader").classList.add("off");
        if(x.success){
            addMsg("ai",st.npc.n,x.message);
            if(Math.random()<0.3&&st.hl<5){
                st.hl++;
                addMsg("ai","系统","⚠️ 恐怖等级升至 "+st.hl+"/5");
            }
        }else{
            addMsg("ai","系统","连接异常");
        }
    }).catch(function(){
        $("loader").classList.add("off");
        addMsg("ai","系统","连接中断");
    });
}

// Init all event listeners
$("btn-start").addEventListener("click",function(){
    st.q=0;st.ans=[];
    showQ();
    show("s-test");
});

$("btn-prev").addEventListener("click",prevQ);
$("btn-next").addEventListener("click",function(){if(st.q===qs.length-1){finish()}else{nextQ()}});
$("btn-enter").addEventListener("click",function(){show("s-char")});
$("btn-chat").addEventListener("click",function(){
    st.name=$("inp-name").value.trim()||"陌生人";
    $("ch-ind").textContent="与 "+st.npc.n+" 对话";
    $("msgs").innerHTML="";
    // 使用从后端加载的场景（如果有）
    var initialScene=st.npc.fullData && st.npc.fullData.scenarios 
        ? st.npc.fullData.scenarios[Math.floor(Math.random()*st.npc.fullData.scenarios.length)].text
        : "你进入了第16号房间...";
    addMsg("ai",st.npc.n,initialScene);
    show("s-chat");
});
$("btn-send").addEventListener("click",sendMsg);
$("inp-msg").addEventListener("keypress",function(e){if(e.key==="Enter")sendMsg()});
$("btn-restart").addEventListener("click",function(){location.reload()});
$("btn-escape").addEventListener("click",function(){addMsg("ai","房间","你试图逃离，但门已经被锁死了...")});

document.querySelectorAll(".gbtn").forEach(function(b){
    b.addEventListener("click",function(){
        st.gender=this.getAttribute("data-g");
        document.querySelectorAll(".gbtn").forEach(function(x){x.classList.remove("sel")});
        this.classList.add("sel");
    });
});

console.log("The 16th Room v2.1 loaded - 30 questions, 48 NPCs");
})();
