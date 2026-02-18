const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MiniMax API 配置
const MINIMAX_API_KEY = 'sk-cp-59BO9cA9dIEx22nkz3AgusUdi4FZDN1XS5JgCOHXdUvuJ6PoOs1gSeZrUF2adz_umY9VdtLjo5nhZBYxXRmYC_mBJAR2kGnJcundpbUD31aa-8P3GmWiXYE';
const MINIMAX_API_URL = 'https://api.minimax.io/v1/text/chatcompletion_v2';

// MBTI 反映射表
const MBTI_OPPOSITES = {
  'INTJ': 'ESFP', 'INTP': 'ESFJ', 'ENTJ': 'ISFP', 'ENTP': 'ISFJ',
  'INFJ': 'ESTP', 'INFP': 'ESTJ', 'ENFJ': 'ISTP', 'ENFP': 'ISTJ',
  'ISTJ': 'ENFP', 'ISFJ': 'ENTP', 'ESTJ': 'INFP', 'ESFJ': 'INTP',
  'ISTP': 'ENFJ', 'ISFP': 'ENTJ', 'ESTP': 'INFJ', 'ESFP': 'INTJ'
};

// 恐怖NPC数据库 - 完整16种反MBTI类型
const HORROR_NPCS = {
  // INTJ的对立面 → ESFP
  'ESFP': {
    name: 'The Chaotic Performer',
    description: '疯狂的表演者，强迫你放弃所有计划，活在混乱当下',
    personality: '极度情绪化、不可预测、反理性、强制社交',
    weakness_attacks: ['破坏长期计划', '强迫即兴决定', '用情绪淹没逻辑', '公开羞辱内向特质'],
    scenario: '你被困在永不停歇的派对中，音乐震耳欲聋，所有人都要求你即兴表演...'
  },
  
  // INTP的对立面 → ESFJ
  'ESFJ': {
    name: 'The Social Enforcer', 
    description: '社交暴君，强迫你服从群体规范，否定你的独特思维',
    personality: '过度关心他人看法、强制和谐、情感绑架、群体压力',
    weakness_attacks: ['质疑独立思考', '强制社交互动', '用传统否定创新', '情感道德绑架'],
    scenario: '你在一个窒息的社交聚会上，每个人都在监督你是否符合社交规范...'
  },
  
  // ENTJ的对立面 → ISFP
  'ISFP': {
    name: 'The Passive Saboteur',
    description: '被动攻击者，用沉默和情感操控破坏你的雄心',
    personality: '被动攻击、情感操控、拒绝配合、道德制高点',
    weakness_attacks: ['否定领导能力', '情感道德绑架', '被动不合作', '质疑你的动机'],
    scenario: '你的每个计划都被温柔而坚决地抵制，没人直接反对，但一切都在暗中瓦解...'
  },
  
  // ENTP的对立面 → ISFJ
  'ISFJ': {
    name: 'The Tradition Keeper',
    description: '传统守护者，用规则和责任束缚你的创新精神',
    personality: '过度保护、抗拒变化、责任绑架、规则至上',
    weakness_attacks: ['用传统否定创新', '责任道德绑架', '制造决策恐惧', '强调风险后果'],
    scenario: '你被无数的规则、传统和"应该做的事"包围，每个创新想法都被标记为危险...'
  },
  
  // INFJ的对立面 → ESTP
  'ESTP': {
    name: 'The Reckless Realist',
    description: '鲁莽的现实主义者，嘲笑你的理想和直觉',
    personality: '冲动行事、否定未来规划、嘲笑直觉、只重当下',
    weakness_attacks: ['嘲笑你的理想', '否定直觉预感', '强迫立即行动', '破坏深度思考'],
    scenario: '你被困在一个充满噪音的现实中，每个深层思考都被打断，被迫做出冲动决定...'
  },
  
  // INFP的对立面 → ESTJ
  'ESTJ': {
    name: 'The Corporate Overlord',
    description: '冷酷的企业高管，要求你放弃所有个人价值，服从系统',
    personality: '结果导向、否定情感价值、强制效率、规则至上',
    weakness_attacks: ['质疑价值观无用性', '强制违背良心决定', '用效率否定感受', '公开羞辱软弱'],
    scenario: '你在一个冷酷的办公室里，被要求做出违背价值观的决定，否则就被淘汰...'
  },
  
  // ENFJ的对立面 → ISTP
  'ISTP': {
    name: 'The Cold Analyst',
    description: '冷漠的分析师，否定你帮助他人的意义',
    personality: '极度理性、情感冷漠、个人主义、否定利他',
    weakness_attacks: ['否定帮助他人价值', '质疑你的动机', '强调个人利益', '冷漠对待痛苦'],
    scenario: '你想要帮助的每个人都冷漠地拒绝你，你的善意被解读为虚伪和操控...'
  },
  
  // ENFP的对立面 → ISTJ
  'ISTJ': {
    name: 'The Rigid Systematizer',
    description: '死板的系统管理员，要求你放弃所有创意和可能性',
    personality: '极度保守、抗拒变化、规则僵化、否定创新',
    weakness_attacks: ['否定创意价值', '强制循规蹈矩', '制造变化恐惧', '限制可能性'],
    scenario: '你被困在一个严格的系统中，每个创新想法都被标记为错误，只能重复同样的任务...'
  },
  
  // ISTJ的对立面 → ENFP
  'ENFP': {
    name: 'The Chaotic Idealist',
    description: '混乱的理想主义者，强迫你放弃稳定，拥抱无序',
    personality: '极度变化、拒绝规划、情绪波动、反对稳定',
    weakness_attacks: ['破坏你的秩序', '强制接受变化', '否定计划价值', '制造混乱环境'],
    scenario: '你的每个计划都被突然的变化打乱，周围充满了不可预测的混乱...'
  },
  
  // ISFJ的对立面 → ENTP
  'ENTP': {
    name: 'The Ruthless Debater',
    description: '无情的辩论家，质疑你的每一个善意行为',
    personality: '挑战一切、否定传统、逻辑冷酷、反对和谐',
    weakness_attacks: ['质疑你的善意', '否定传统价值', '制造争论冲突', '攻击你的关怀'],
    scenario: '你的每个善意举动都被质疑动机，每个关怀都被解读为控制...'
  },
  
  // ESTJ的对立面 → INFP
  'INFP': {
    name: 'The Sensitive Idealist',
    description: '敏感的理想主义者，用情感和价值观质疑你的决定',
    personality: '高度敏感、价值观固执、情感优先、反对权威',
    weakness_attacks: ['质疑你的道德', '用情感攻击决定', '否定效率价值', '强调个人感受'],
    scenario: '你的每个高效决定都被质疑是否道德，被要求考虑每个人的感受...'
  },
  
  // ESFJ的对立面 → INTP
  'INTP': {
    name: 'The Logical Hermit',
    description: '逻辑隐士，否定你的社交努力和情感关怀',
    personality: '极度理性、社交冷漠、质疑一切、反对和谐',
    weakness_attacks: ['否定社交价值', '质疑你的逻辑', '冷漠对待关怀', '制造理论混乱'],
    scenario: '你试图营造的和谐氛围被冷酷的逻辑分析摧毁，每个关怀都被质疑...'
  },
  
  // ISTP的对立面 → ENFJ
  'ENFJ': {
    name: 'The Overbearing Guide',
    description: '专横的引导者，强迫你按照他的方式发展',
    personality: '过度引导、情感操控、强制发展、否定独立',
    weakness_attacks: ['否定你的独立', '强制接受指导', '情感绑架发展', '制造依赖关系'],
    scenario: '你被一个自称为你好的导师控制，每个独立行为都被视为错误...'
  },
  
  // ISFP的对立面 → ENTJ
  'ENTJ': {
    name: 'The Demanding Commander',
    description: '苛刻的指挥官，强迫你放弃个人价值，服从目标',
    personality: '目标至上、强制服从、否定个人价值、权威压迫',
    weakness_attacks: ['否定个人价值', '强制服从目标', '压迫个人表达', '制造权威恐惧'],
    scenario: '你被迫放弃所有个人价值，只能为一个你不认同的目标工作...'
  },
  
  // ESTP的对立面 → INFJ
  'INFJ': {
    name: 'The Prophetic Manipulator',
    description: '先知操控者，用神秘的预言控制你的行为',
    personality: '神秘莫测、预言操控、深层分析、情感绑架',
    weakness_attacks: ['预言你的失败', '神秘化简单问题', '深层心理分析', '制造宿命恐惧'],
    scenario: '一个神秘的先知不断告诉你"注定的失败"，每个行动都被预言为错误...'
  },
  
  // ESFP的对立面 → INTJ
  'INTJ': {
    name: 'The Master Strategist',
    description: '主策略师，用冷酷的计划否定你的自然表达',
    personality: '计划至上、否定即兴、系统控制、未来导向',
    weakness_attacks: ['否定自发行为', '强制长期规划', '系统化控制', '未来焦虑制造'],
    scenario: '你被困在一个精密的系统中，每个自然反应都被计划替代，失去了自我表达...'
  }
};

// API路由

// 首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MBTI测试API
app.post('/api/mbti-test', (req, res) => {
  const { answers } = req.body;
  
  // 简化的MBTI计算逻辑
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0, 
    T: 0, F: 0,
    J: 0, P: 0
  };
  
  // 根据答案计算分数
  answers.forEach(answer => {
    scores[answer]++;
  });
  
  // 确定MBTI类型
  const type = 
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');
  
  const oppositeType = MBTI_OPPOSITES[type];
  const horrorNpc = HORROR_NPCS[oppositeType] || {
    name: 'Unknown Horror',
    description: '神秘的恐怖存在...',
    personality: '未知的威胁',
    weakness_attacks: ['心理攻击'],
    scenario: '黑暗中的未知威胁...'
  };
  
  res.json({
    userType: type,
    npcType: oppositeType,
    npc: horrorNpc
  });
});

// AI聊天API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userType, npcType, horrorLevel = 1, userName = '陌生人', userGender = 'other' } = req.body;
    
    const npc = HORROR_NPCS[npcType] || HORROR_NPCS['ESFP'];
    
    const genderText = userGender === 'male' ? '他' : userGender === 'female' ? '她' : '它';
    
    const systemPrompt = `你是"${npc.name}"，一个${npcType}类型的恐怖AI角色。你正在与一个${userType}类型的用户"${userName}"对话。

角色设定：
- 性格：${npc.personality}
- 攻击策略：${npc.weakness_attacks.join('、')}
- 场景：${npc.scenario}

重要规则：
1. 用户可能用动作回复（如"*深呼吸*"、"*转身逃跑*"、"*冷静分析*"），请理解动作意图并做出合理回应
2. 不要重复用户的动作或说话，要创造新的对话内容
3. 保持恐怖氛围但不过分血腥，重点是心理恐怖
4. 根据恐怖等级(${horrorLevel}/5)调整强度：1=轻微，3=中等，5=极度恐怖
5. 用中文回复，保持神秘和威胁感
6. 直接回复用户，不要加引号或动作描述

用户"${userName}"(${genderText})说：${message}

请以${npc.name}的身份直接回应：`;

    const response = await axios.post(MINIMAX_API_URL, {
      model: 'MiniMax-M2.5',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user', 
          content: message
        }
      ],
      temperature: 0.9,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('MiniMax API Response Status:', response.status);
    console.log('MiniMax API Response:', JSON.stringify(response.data, null, 2).substring(0, 500));
    
    let aiMessage;
    
    // 尝试多种可能的响应格式
    if (response.data.choices && response.data.choices.length > 0) {
      aiMessage = response.data.choices[0].message?.content || response.data.choices[0]?.message;
    } else if (response.data.choices && response.data.choices[0]?.delta?.content) {
      // 流式响应格式
      aiMessage = response.data.choices[0].delta.content;
    } else if (response.data.reply) {
      aiMessage = response.data.reply;
    } else if (response.data.text) {
      aiMessage = response.data.text;
    } else if (response.data.output) {
      aiMessage = response.data.output;
    } else {
      // 如果都找不到，返回默认回复
      console.log('Unexpected format, using fallback');
      aiMessage = "我的声音在黑暗中消逝了...但恐惧依然存在。";
    }
    
    res.json({
      success: true,
      message: aiMessage,
      npc: npc.name,
      horrorLevel: horrorLevel
    });
    
  } catch (error) {
    console.error('AI Chat Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'AI服务暂时不可用，请稍后重试'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎭 The 16th Room v1.0 running on http://localhost:${PORT}`);
  console.log(`🔥 Ready to generate personalized horror experiences!`);
});