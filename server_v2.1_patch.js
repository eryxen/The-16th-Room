// The 16th Room v2.1 Server - 完整48个NPC数据库

// MiniMax API 配置保持不变
const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'sk-cp-59BO9cA9dIEx22nkz3AgusUdi4FZDN1XS5JgCOHXdUvuJ6PoOs1gSeZrUF2adz_umY9VdtLjo5nhZBYxXRmYC_mBJAR2kGnJcundpbUD31aa-8P3GmWiXYE';

// v2.1: 完整48个NPC数据库（直接从 NPC_DATABASE_V2.1.js 复制）
const HORROR_NPCS_V21 = {
  'ESFP': [
    {
      id: 'esfp_psych',
      name: 'The Chaotic Performer',
      variant: 'psychological',
      description: '疯狂的表演者，强迫你活在混乱当下',
      personality: '极度情绪化、不可预测、反理性',
      weakness_attacks: ['破坏长期计划', '强迫即兴决定', '用情绪淹没逻辑', '公开羞辱内向特质'],
      scenarios: [
        { level: 'normal', text: '你被困在永不停歇的派对中，音乐震耳欲聋，所有人都要求你即兴表演...' },
        { level: 'hard', text: '舞台灯光刺眼，观众尖叫着要你放弃计划，跟随节奏起舞，理性在嘈杂中融化...' },
        { level: 'nightmare', text: '你的每个精密计划都被撕碎，变成彩色纸屑，混乱的狂欢吞没了一切秩序...' }
      ]
    },
    {
      id: 'esfp_body',
      name: 'The Sensory Overloader',
      variant: 'body_horror',
      description: '感官暴君，用过载的刺激摧毁你的理性',
      personality: '强迫你接受所有感官刺激，拒绝思考',
      weakness_attacks: ['霓虹灯刺穿眼球', '低音炮震碎耳膜', '触觉过载', '味觉轰炸'],
      scenarios: [
        { level: 'normal', text: '你的感官被强制放大，每个声音都像针扎，每道光都刺痛神经...' },
        { level: 'hard', text: '你的身体不受控制地对刺激反应，肌肉痉挛，无法思考...' },
        { level: 'nightmare', text: '你变成一团纯粹的感官，理性完全溶解在疼痛和快感的混合中...' }
      ]
    },
    {
      id: 'esfp_super',
      name: 'The Manic Spirit',
      variant: 'supernatural',
      description: '躁狂之灵，将你的灵魂困在永恒的狂欢中',
      personality: '超自然的派对暴君，剥夺独处权利',
      weakness_attacks: ['灵魂强制社交', '孤独被诅咒', '计划自动失败', '理性被封印'],
      scenarios: [
        { level: 'normal', text: '幽灵围绕着你跳舞，你无法逃离派对，独处的空间被诅咒...' },
        { level: 'hard', text: '你试图制定计划，但文字自动变成音符，思考变成舞步...' },
        { level: 'nightmare', text: '你的意识被分裂成无数碎片，每一片都在不同的派对中永恒狂欢...' }
      ]
    }
  ],
  // ... 其他45个NPC（从 NPC_DATABASE_V2.1.js 复制）
};

// 新API端点：获取NPC完整数据
app.post('/api/npc-data', (req, res) => {
  const { npcType, variant } = req.body;
  
  if (!HORROR_NPCS_V21[npcType]) {
    return res.json({ success: false, error: 'Invalid NPC type' });
  }
  
  const npcVariants = HORROR_NPCS_V21[npcType];
  const npc = npcVariants[variant] || npcVariants[0];
  
  res.json({ success: true, npc });
});

// 更新聊天API，支持npcVariant参数
app.post('/api/chat', async (req, res) => {
  const { message, userType, npcType, npcVariant = 0, horrorLevel, userName, userGender } = req.body;
  
  const npcVariants = HORROR_NPCS_V21[npcType] || HORROR_NPCS_V21['ESFP'];
  const npc = npcVariants[npcVariant] || npcVariants[0];
  
  // ... 其余聊天逻辑保持不变
});
