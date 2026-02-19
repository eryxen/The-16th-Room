(function(){
"use strict";

var qs=[
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

var opp={"INTJ":"ESFP","INTP":"ESFJ","ENTJ":"ISFP","ENTP":"ISFJ","INFJ":"ESTP","INFP":"ESTJ","ENFJ":"ISTP","ENFP":"ISTJ","ISTJ":"ENFP","ISFJ":"ENTP","ESTJ":"INFP","ESFJ":"INTP","ISTP":"ENFJ","ISFP":"ENTJ","ESTP":"INFJ","ESFP":"INTJ"};

var npcs={
ESFP:{n:"The Chaotic Performer",d:"疯狂的表演者",s:"你被困在永不停歇的派对中..."},
ESFJ:{n:"The Social Enforcer",d:"社交暴君",s:"你在窒息的社交聚会上..."},
ISFP:{n:"The Passive Saboteur",d:"被动攻击者",s:"你的每个计划都被温柔抵制..."},
ISFJ:{n:"The Tradition Keeper",d:"传统守护者",s:"你被无数规则包围..."},
ESTP:{n:"The Reckless Realist",d:"鲁莽的现实主义者",s:"你被困在噪音中..."},
ESTJ:{n:"The Corporate Overlord",d:"冷酷的企业高管",s:"你在冷酷的办公室里..."},
ISTP:{n:"The Cold Analyst",d:"冷漠的分析师",s:"你想要帮助的人都拒绝你..."},
ISTJ:{n:"The Rigid Systematizer",d:"死板的系统管理员",s:"你被困在严格的系统中..."},
ENFP:{n:"The Chaotic Idealist",d:"混乱的理想主义者",s:"你的计划被混乱打乱..."},
ENTP:{n:"The Ruthless Debater",d:"无情的辩论家",s:"你的每个举动都被质疑动机..."},
INFP:{n:"The Sensitive Idealist",d:"敏感的理想主义者",s:"你的每个决定都被质疑道德..."},
INTP:{n:"The Logical Hermit",d:"逻辑隐士",s:"你的关怀被冷酷分析摧毁..."},
ENFJ:{n:"The Overbearing Guide",d:"专横的引导者",s:"你被导师控制..."},
ENTJ:{n:"The Demanding Commander",d:"苛刻的指挥官",s:"你被迫放弃个人价值..."},
INFJ:{n:"The Prophetic Manipulator",d:"先知操控者",s:"先知不断告诉你注定的失败..."},
INTJ:{n:"The Master Strategist",d:"主策略师",s:"你被困在系统中，失去自我..."}
};

var st={q:0,ans:[],ut:null,nt:null,npc:null,hl:1,name:"",gender:""};

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
    setTimeout(function(){st.q<11?nextQ():finish()},350);
}

function nextQ(){if(st.q<11){st.q++;showQ()}}
function prevQ(){if(st.q>0){st.q--;showQ()}}

function finish(){
    var mt="";
    var e=st.ans.filter(function(a,i){return i<3&&a==="a"}).length;
    mt+=e>1?"E":"I";
    var s=st.ans.filter(function(a,i){return i>=3&&i<6&&a==="a"}).length;
    mt+=s>1?"S":"N";
    var t=st.ans.filter(function(a,i){return i>=6&&i<9&&a==="a"}).length;
    mt+=t>1?"T":"F";
    var j=st.ans.filter(function(a,i){return i>=9&&a==="a"}).length;
    mt+=j>1?"J":"P";
    st.ut=mt;st.nt=opp[mt]||"ESFP";st.npc=npcs[st.nt]||npcs.ESFP;
    $("r-type").textContent=mt;
    $("r-npc").textContent=st.npc.n;
    $("r-desc").textContent=st.npc.d;
    $("r-scene").textContent=st.npc.s;
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
        body:JSON.stringify({message:m,userType:st.ut,npcType:st.nt,horrorLevel:st.hl,userName:st.name,userGender:st.gender})
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
    addMsg("ai",st.npc.n,st.npc.s);
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

console.log("The 16th Room v2.0 loaded");
})();
