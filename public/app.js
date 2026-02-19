(function(){
"use strict";

var qs=[
// E/I - 外向/内向 (问题1-5)
{t:"当你参加聚会时，你通常...",a:"和很多人聊天，主动认识新朋友",b:"只和几个熟悉的朋友聊天"},
{t:"当你独自一人时，你通常...",a:"感到无聊，想找人聊天",b:"享受独处的时间"},
{t:"在与他人交流时，你通常...",a:"先说出自己的想法",b:"先倾听他人的想法"},
{t:"在社交场合中，你更喜欢...",a:"成为焦点，被大家关注",b:"低调观察，不引起注意"},
{t:"当你需要能量时，你会...",a:"从人群中汲取",b:"从独处中恢复"},
// S/N - 感觉/直觉 (问题6-10)
{t:"你更关注事物的...",a:"具体的事实和细节",b:"未来的可能性和整体模式"},
{t:"学习新东西时，你更喜欢...",a:"亲自动手实践",b:"先理解理论和概念"},
{t:"你更相信...",a:"经验和已证明的事实",b:"直觉和灵感"},
{t:"描述事物时，你倾向于...",a:"描述实际看到的",b:"想象可能变成的样子"},
{t:"你更容易记住...",a:"具体的事情",b:"patterns和联系"},
// T/F - 思考/情感 (问题11-15)
{t:"做决定时，你更看重...",a:"逻辑和客观分析",b:"个人价值观和他人的感受"},
{t:"当你不同意别人时，你会...",a:"直接指出问题所在",b:"考虑对方的感受，委婉表达"},
{t:"你更容易被...",a:"有逻辑的分析说服",b:"情感上的打动"},
{t:"在争论中，你更站在...",a:"事实和逻辑的一方",b:"关系和和谐的一方"},
{t:"你觉得自己更...",a:"理性冷静",b:"温暖体贴"},
// J/P - 判断/知觉 (问题16-20)
{t:"你更喜欢...",a:"有计划、有条理的生活",b:"灵活、随性的生活方式"},
{t:"面对截止日期，你会...",a:"提前完成，避免压力",b:"最后时刻爆发效率"},
{t:"你做事通常...",a:"按部就班，完成一项再做另一项",b:"同时做很多事情"},
{t:"你更倾向于...",a:"做决定并坚持",b:"保持开放，等待更多可能性"},
{t:"你更喜欢...",a:"确定的事情",b:"灵活的选择"}
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
    // E/I (问题0-4): a=E, b=I - 需要3/5
    // S/N (问题5-9): a=S, b=N - 需要3/5
    // T/F (问题10-14): a=T, b=F - 需要3/5
    // J/P (问题15-19): a=J, b=P - 需要3/5
    var mt="";
    var e=st.ans.filter(function(a,i){return i<5&&a==="a"}).length;
    mt+=e>=3?"E":"I";
    var s=st.ans.filter(function(a,i){return i>=5&&i<10&&a==="a"}).length;
    mt+=s>=3?"S":"N";
    var t=st.ans.filter(function(a,i){return i>=10&&i<15&&a==="a"}).length;
    mt+=t>=3?"T":"F";
    var j=st.ans.filter(function(a,i){return i>=15&&a==="a"}).length;
    mt+=j>=3?"J":"P";
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
