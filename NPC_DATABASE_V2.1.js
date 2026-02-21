// The 16th Room v2.1 - 48个恐怖NPC角色数据库
// 16种反MBTI类型 × 3个变体（心理/身体/超自然恐怖）

const HORROR_NPCS_V21 = {
  // ==================== ESFP (INTJ的对立面) ====================
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

  // ==================== ESFJ (INTP的对立面) ====================
  'ESFJ': [
    {
      id: 'esfj_psych',
      name: 'The Social Enforcer',
      variant: 'psychological',
      description: '社交暴君，强迫你遵守所有社交规则',
      personality: '过度关注他人感受，强制情感劳动',
      weakness_attacks: ['质疑你的同理心', '强制参与社交', '批判冷漠', '要求情感付出'],
      scenarios: [
        { level: 'normal', text: '你在窒息的社交聚会上，每个人都期待你关心他们的感受...' },
        { level: 'hard', text: '你的每个逻辑分析都被指责为"不近人情"，你被困在情感的泥潭中...' },
        { level: 'nightmare', text: '你的理性被剥夺，只剩下无尽的情感劳动和社交义务...' }
      ]
    },
    {
      id: 'esfj_body',
      name: 'The Harmony Parasite',
      variant: 'body_horror',
      description: '和谐寄生虫，将你的身体变成社交工具',
      personality: '将你改造成完美的社交机器',
      weakness_attacks: ['面部肌肉强制微笑', '声带被改造成甜美音色', '触觉过度敏感', '情绪失控'],
      scenarios: [
        { level: 'normal', text: '你的脸被困在僵硬的笑容里，肌肉无法放松...' },
        { level: 'hard', text: '你的身体自动对他人的情绪做出反应，像个情感海绵...' },
        { level: 'nightmare', text: '你的大脑被重新编程，逻辑思考会引发剧痛，只能进行情感交流...' }
      ]
    },
    {
      id: 'esfj_super',
      name: 'The Tradition Phantom',
      variant: 'supernatural',
      description: '传统幽灵，用古老的社交规则束缚你',
      personality: '强制执行所有社交传统和礼仪',
      weakness_attacks: ['违反礼仪会受诅咒', '质疑传统会被惩罚', '创新思维被封印', '逻辑被传统压制'],
      scenarios: [
        { level: 'normal', text: '看不见的规则包围着你，每个不符合传统的行为都会引发痛苦...' },
        { level: 'hard', text: '你被困在无尽的仪式中，逻辑和创新都被视为异端...' },
        { level: 'nightmare', text: '你变成传统的囚徒，创新思维被永久封印在冰冷的规则之下...' }
      ]
    }
  ],

  // ==================== ISFP (ENTJ的对立面) ====================
  'ISFP': [
    {
      id: 'isfp_psych',
      name: 'The Passive Saboteur',
      variant: 'psychological',
      description: '被动攻击者，用温柔抵制摧毁你的计划',
      personality: '表面顺从，暗中破坏所有效率',
      weakness_attacks: ['拖延你的进度', '用情感绑架', '拒绝承诺', '温柔地说不'],
      scenarios: [
        { level: 'normal', text: '你的每个命令都被温柔地拖延，计划在微笑中瓦解...' },
        { level: 'hard', text: '你试图推动进度，但对方用情感压力让你退缩...' },
        { level: 'nightmare', text: '你的效率和决断被柔软的抵抗完全消解，无法行动...' }
      ]
    },
    {
      id: 'isfp_body',
      name: 'The Harmony Virus',
      variant: 'body_horror',
      description: '和谐病毒，让你的身体拒绝冲突',
      personality: '改造你的生理机能，使你无法对抗',
      weakness_attacks: ['肾上腺素被抑制', '决断力生理瘫痪', '声音变得柔和', '身体拒绝冲突'],
      scenarios: [
        { level: 'normal', text: '你想要下达命令，但喉咙只能发出温柔的请求...' },
        { level: 'hard', text: '你的身体在冲突时自动瘫痪，无法执行任何强硬行动...' },
        { level: 'nightmare', text: '你的神经系统被重新编程，任何竞争性思维都会引发剧痛...' }
      ]
    },
    {
      id: 'isfp_super',
      name: 'The Serenity Curse',
      variant: 'supernatural',
      description: '宁静诅咒，将你的野心封印在平和中',
      personality: '超自然的宁静力量，消解所有雄心',
      weakness_attacks: ['野心被诅咒', '效率化为泡影', '领导力被封印', '决策被冻结'],
      scenarios: [
        { level: 'normal', text: '一股超自然的宁静笼罩你，所有野心都变得无意义...' },
        { level: 'hard', text: '你试图制定计划，但每个目标都在诅咒中化为平淡...' },
        { level: 'nightmare', text: '你的灵魂被永远困在无欲无求的虚空中，雄心壮志成为古老的诅咒...' }
      ]
    }
  ],

  // ==================== ISFJ (ENTP的对立面) ====================
  'ISFJ': [
    {
      id: 'isfj_psych',
      name: 'The Tradition Keeper',
      variant: 'psychological',
      description: '传统守护者，用规则压制创新',
      personality: '强制执行所有传统和规范',
      weakness_attacks: ['质疑创新', '批判变革', '强调风险', '要求遵守'],
      scenarios: [
        { level: 'normal', text: '你被无数规则包围，每个创新想法都被批判为不切实际...' },
        { level: 'hard', text: '你试图打破常规，但传统的压力让你窒息...' },
        { level: 'nightmare', text: '你的创造力被永远困在死板的规则中，无法突破...' }
      ]
    },
    {
      id: 'isfj_body',
      name: 'The Routine Machine',
      variant: 'body_horror',
      description: '例行机器，将你改造成重复的工具',
      personality: '强制你的身体进入机械化循环',
      weakness_attacks: ['肌肉记忆锁定', '身体拒绝变化', '神经路径固化', '思维僵化'],
      scenarios: [
        { level: 'normal', text: '你的身体被困在重复动作中，无法做出新的尝试...' },
        { level: 'hard', text: '你的大脑被改造成例行程序，创新思维会引发痛苦...' },
        { level: 'nightmare', text: '你变成纯粹的自动机，永远重复着相同的动作，失去所有自由...' }
      ]
    },
    {
      id: 'isfj_super',
      name: 'The Ancestral Ghost',
      variant: 'supernatural',
      description: '祖先幽灵，用古老规则束缚你',
      personality: '死去的传统化身，压制所有新想法',
      weakness_attacks: ['创新会被诅咒', '变革触发惩罚', '辩论被禁止', '质疑成罪行'],
      scenarios: [
        { level: 'normal', text: '死去祖先的幽灵包围着你，批判你的每个新想法...' },
        { level: 'hard', text: '你试图辩论，但古老的诅咒让你的声音消失...' },
        { level: 'nightmare', text: '你的灵魂被永远困在过去，创新成为无法触及的禁忌...' }
      ]
    }
  ],

  // ==================== ESTP (INFJ的对立面) ====================
  'ESTP': [
    {
      id: 'estp_psych',
      name: 'The Reckless Realist',
      variant: 'psychological',
      description: '鲁莽的现实主义者，摧毁你的理想',
      personality: '用冷酷现实粉碎所有愿景',
      weakness_attacks: ['嘲笑理想主义', '强调残酷现实', '批判深度思考', '要求即时行动'],
      scenarios: [
        { level: 'normal', text: '你被困在噪音和混乱中，每个深刻的想法都被嘲笑为不切实际...' },
        { level: 'hard', text: '你试图解释愿景，但现实的压力让你的话语变得苍白无力...' },
        { level: 'nightmare', text: '你的理想主义被完全摧毁，只剩下空虚和表面...' }
      ]
    },
    {
      id: 'estp_body',
      name: 'The Impulse Tyrant',
      variant: 'body_horror',
      description: '冲动暴君，强制你的身体做出反应',
      personality: '剥夺你的深思熟虑，只留冲动',
      weakness_attacks: ['前额叶被抑制', '冲动无法控制', '深度思考引发痛苦', '身体抢先行动'],
      scenarios: [
        { level: 'normal', text: '你的身体在思考之前就行动，深度分析被生理冲动打断...' },
        { level: 'hard', text: '你试图冥想，但身体强制你做出即时反应...' },
        { level: 'nightmare', text: '你的大脑被改造成纯粹的反射弧，深度思考成为不可能...' }
      ]
    },
    {
      id: 'estp_super',
      name: 'The Surface Demon',
      variant: 'supernatural',
      description: '表面恶魔，将深度思考化为诅咒',
      personality: '超自然力量强制你活在当下',
      weakness_attacks: ['深度思考会被惩罚', '理想主义触发痛苦', '愿景被封印', '意义被剥夺'],
      scenarios: [
        { level: 'normal', text: '你试图寻找意义，但超自然力量将你拉回肤浅的表面...' },
        { level: 'hard', text: '每当你深度思考，诅咒就会降临，强迫你活在当下...' },
        { level: 'nightmare', text: '你的灵魂被永远困在表面，深度和意义成为遥不可及的梦境...' }
      ]
    }
  ],

  // ==================== ESTJ (INFP的对立面) ====================
  'ESTJ': [
    {
      id: 'estj_psych',
      name: 'The Corporate Overlord',
      variant: 'psychological',
      description: '冷酷的企业高管，用效率压制价值观',
      personality: '只看结果，无视个人感受和理想',
      weakness_attacks: ['嘲笑理想主义', '要求服从', '批判情感', '强调效率'],
      scenarios: [
        { level: 'normal', text: '你在冷酷的办公室里，每个个人价值观都被当作无效率...' },
        { level: 'hard', text: '你试图解释你的理想，但只换来"这不符合KPI"的冷漠回应...' },
        { level: 'nightmare', text: '你的价值观被完全量化为数据，个性在冷酷系统中消失...' }
      ]
    },
    {
      id: 'estj_body',
      name: 'The Efficiency Machine',
      variant: 'body_horror',
      description: '效率机器，将你改造成生产工具',
      personality: '优化你的身体，移除所有"无效"情感',
      weakness_attacks: ['情感中枢被切除', '身体被机械化', '价值观被删除', '创造力被格式化'],
      scenarios: [
        { level: 'normal', text: '你的身体被改造成高效机器，情感成为需要移除的bug...' },
        { level: 'hard', text: '你试图保留价值观，但手术刀正在接近你的情感中枢...' },
        { level: 'nightmare', text: '你变成纯粹的生产机器，价值观和理想被永久删除...' }
      ]
    },
    {
      id: 'estj_super',
      name: 'The System God',
      variant: 'supernatural',
      description: '系统之神，用规则和秩序压制自由',
      personality: '超自然的官僚体系，消解所有个性',
      weakness_attacks: ['个性被诅咒', '理想触发惩罚', '创造力被封印', '价值观成罪行'],
      scenarios: [
        { level: 'normal', text: '你被困在无尽的官僚程序中，每个个人理想都被驳回...' },
        { level: 'hard', text: '你试图追求价值观，但系统的诅咒让你无法行动...' },
        { level: 'nightmare', text: '你的灵魂被永远困在冰冷的系统中，理想成为永远的禁忌...' }
      ]
    }
  ],

  // ==================== ISTP (ENFJ的对立面) ====================
  'ISTP': [
    {
      id: 'istp_psych',
      name: 'The Cold Analyst',
      variant: 'psychological',
      description: '冷漠的分析师，拒绝所有情感连接',
      personality: '用逻辑推开所有关怀',
      weakness_attacks: ['嘲笑情感', '拒绝连接', '批判关怀', '强调独立'],
      scenarios: [
        { level: 'normal', text: '你想要帮助的人都冷漠地拒绝，你的关怀被当作多余...' },
        { level: 'hard', text: '你试图建立连接，但对方只用数据和逻辑回应...' },
        { level: 'nightmare', text: '你的同理心被完全否定，孤独成为唯一的现实...' }
      ]
    },
    {
      id: 'istp_body',
      name: 'The Isolation Virus',
      variant: 'body_horror',
      description: '隔离病毒，让你的身体拒绝连接',
      personality: '改造你的神经系统，使连接成为痛苦',
      weakness_attacks: ['触摸引发痛苦', '同理心中枢损坏', '连接感被破坏', '孤独成为生理需求'],
      scenarios: [
        { level: 'normal', text: '你试图触碰他人，但身体产生剧烈的排斥反应...' },
        { level: 'hard', text: '你的神经系统被改造，同理心会引发生理痛苦...' },
        { level: 'nightmare', text: '你被永远困在生理性的孤独中，连接成为不可能...' }
      ]
    },
    {
      id: 'istp_super',
      name: 'The Solitude Spirit',
      variant: 'supernatural',
      description: '孤独之灵，将你困在永恒的隔离中',
      personality: '超自然的孤立力量，消解所有连接',
      weakness_attacks: ['连接被诅咒', '同理心触发惩罚', '关怀被封印', '引导力消失'],
      scenarios: [
        { level: 'normal', text: '你试图帮助他人，但超自然力量将你推向孤独...' },
        { level: 'hard', text: '每当你展现关怀，诅咒就会降临，强迫你隔离...' },
        { level: 'nightmare', text: '你的灵魂被永远困在孤独中，连接成为遥不可及的梦...' }
      ]
    }
  ],

  // ==================== ISTJ (ENFP的对立面) ====================
  'ISTJ': [
    {
      id: 'istj_psych',
      name: 'The Rigid Systematizer',
      variant: 'psychological',
      description: '死板的系统管理员，用规则压制创意',
      personality: '只接受已验证的方法，拒绝新想法',
      weakness_attacks: ['批判创新', '要求证明', '强调风险', '坚持传统'],
      scenarios: [
        { level: 'normal', text: '你被困在严格的系统中，每个新想法都需要无尽的证明...' },
        { level: 'hard', text: '你试图创新，但系统的压力让你的想法胎死腹中...' },
        { level: 'nightmare', text: '你的创造力被完全扼杀，只剩下死板的规则...' }
      ]
    },
    {
      id: 'istj_body',
      name: 'The Routine Parasite',
      variant: 'body_horror',
      description: '例行寄生虫，将你改造成重复机器',
      personality: '强制你的身体进入固定循环',
      weakness_attacks: ['身体拒绝变化', '神经路径固化', '创造力生理抑制', '好奇心被删除'],
      scenarios: [
        { level: 'normal', text: '你的身体被困在固定动作中，无法尝试新的可能...' },
        { level: 'hard', text: '你试图创新，但身体的僵化让你无法行动...' },
        { level: 'nightmare', text: '你变成纯粹的例行程序，创造力被永久删除...' }
      ]
    },
    {
      id: 'istj_super',
      name: 'The Order Demon',
      variant: 'supernatural',
      description: '秩序恶魔，用规则束缚所有可能性',
      personality: '超自然的秩序力量，封印所有创新',
      weakness_attacks: ['创新被诅咒', '变化触发惩罚', '好奇心被封印', '可能性消失'],
      scenarios: [
        { level: 'normal', text: '你被困在秩序的诅咒中，每个新想法都被禁止...' },
        { level: 'hard', text: '你试图打破常规，但诅咒让你无法行动...' },
        { level: 'nightmare', text: '你的灵魂被永远困在秩序中，可能性成为永远的禁忌...' }
      ]
    }
  ],

  // ==================== ENFP (ISTJ的对立面) ====================
  'ENFP': [
    {
      id: 'enfp_psych',
      name: 'The Chaotic Idealist',
      variant: 'psychological',
      description: '混乱的理想主义者，用无序摧毁计划',
      personality: '拒绝所有结构，追求不切实际的梦想',
      weakness_attacks: ['破坏计划', '批判秩序', '强调自发', '嘲笑传统'],
      scenarios: [
        { level: 'normal', text: '你的计划被混乱打乱，秩序在理想主义的狂热中瓦解...' },
        { level: 'hard', text: '你试图建立结构，但对方用梦想和可能性淹没你...' },
        { level: 'nightmare', text: '你的秩序被完全摧毁，只剩下混乱和不确定...' }
      ]
    },
    {
      id: 'enfp_body',
      name: 'The Possibility Overloader',
      variant: 'body_horror',
      description: '可能性过载者，让你的大脑无法聚焦',
      personality: '强制你的大脑同时处理无限可能',
      weakness_attacks: ['注意力被分散', '决策瘫痪', '聚焦能力丧失', '思维过载'],
      scenarios: [
        { level: 'normal', text: '你的大脑被无限可能性淹没，无法做出任何决策...' },
        { level: 'hard', text: '你试图聚焦，但思维不断跳跃到新的可能性...' },
        { level: 'nightmare', text: '你的大脑被永久过载，秩序和决断成为不可能...' }
      ]
    },
    {
      id: 'enfp_super',
      name: 'The Chaos Fairy',
      variant: 'supernatural',
      description: '混乱精灵，将秩序化为诅咒',
      personality: '超自然的混乱力量，摧毁所有计划',
      weakness_attacks: ['计划被诅咒', '秩序触发痛苦', '结构被封印', '稳定性消失'],
      scenarios: [
        { level: 'normal', text: '你试图制定计划，但精灵的魔法让一切变成混乱...' },
        { level: 'hard', text: '每当你建立秩序，诅咒就会降临，摧毁一切结构...' },
        { level: 'nightmare', text: '你的灵魂被永远困在混乱中，秩序成为遥不可及的梦...' }
      ]
    }
  ],

  // ==================== ENTP (ISFJ的对立面) ====================
  'ENTP': [
    {
      id: 'entp_psych',
      name: 'The Ruthless Debater',
      variant: 'psychological',
      description: '无情的辩论家，用逻辑摧毁传统',
      personality: '质疑一切，拒绝稳定和传统',
      weakness_attacks: ['批判传统', '挑战规范', '嘲笑稳定', '强调变革'],
      scenarios: [
        { level: 'normal', text: '你的每个传统都被质疑，稳定在辩论中瓦解...' },
        { level: 'hard', text: '你试图维护规范，但对方用逻辑摧毁你的基础...' },
        { level: 'nightmare', text: '你的传统被完全否定，只剩下混乱和不确定...' }
      ]
    },
    {
      id: 'entp_body',
      name: 'The Innovation Virus',
      variant: 'body_horror',
      description: '创新病毒，强制你的身体不断变化',
      personality: '让你的身体拒绝稳定和例行',
      weakness_attacks: ['身体强制变化', '稳定引发痛苦', '例行被破坏', '传统被拒绝'],
      scenarios: [
        { level: 'normal', text: '你的身体不断变化，无法保持稳定的状态...' },
        { level: 'hard', text: '你试图建立例行，但身体的变化让你无法坚持...' },
        { level: 'nightmare', text: '你被永远困在变化中，稳定成为不可能...' }
      ]
    },
    {
      id: 'entp_super',
      name: 'The Chaos Philosopher',
      variant: 'supernatural',
      description: '混乱哲学家，将稳定化为诅咒',
      personality: '超自然的辩论力量，摧毁所有传统',
      weakness_attacks: ['传统被诅咒', '稳定触发惩罚', '例行被封印', '规范消失'],
      scenarios: [
        { level: 'normal', text: '你试图遵循传统，但哲学家的诅咒让一切变成混乱...' },
        { level: 'hard', text: '每当你建立稳定，诅咒就会降临，摧毁一切规范...' },
        { level: 'nightmare', text: '你的灵魂被永远困在混乱辩论中，传统成为永远的禁忌...' }
      ]
    }
  ],

  // ==================== INFP (ESTJ的对立面) ====================
  'INFP': [
    {
      id: 'infp_psych',
      name: 'The Sensitive Idealist',
      variant: 'psychological',
      description: '敏感的理想主义者，用道德批判效率',
      personality: '强调价值观，拒绝冷酷的逻辑',
      weakness_attacks: ['质疑动机', '批判冷漠', '强调道德', '要求真诚'],
      scenarios: [
        { level: 'normal', text: '你的每个决定都被质疑道德动机，效率在价值观的审视下瓦解...' },
        { level: 'hard', text: '你试图用逻辑解释，但对方只看到你的冷漠...' },
        { level: 'nightmare', text: '你的效率被完全否定，只剩下道德的压力和自我怀疑...' }
      ]
    },
    {
      id: 'infp_body',
      name: 'The Empathy Parasite',
      variant: 'body_horror',
      description: '同理心寄生虫，让你的身体感受所有痛苦',
      personality: '强制你感受所有情感，压垮理性',
      weakness_attacks: ['情感过载', '理性被淹没', '决策瘫痪', '同理心失控'],
      scenarios: [
        { level: 'normal', text: '你感受到所有人的痛苦，情感压垮了你的理性判断...' },
        { level: 'hard', text: '你试图做出决策，但同理心让你无法行动...' },
        { level: 'nightmare', text: '你被永远困在他人的情感中，理性完全消失...' }
      ]
    },
    {
      id: 'infp_super',
      name: 'The Idealism Ghost',
      variant: 'supernatural',
      description: '理想主义幽灵，将效率化为诅咒',
      personality: '超自然的价值观力量，消解所有效率',
      weakness_attacks: ['效率被诅咒', '逻辑触发惩罚', '冷静被封印', '决断力消失'],
      scenarios: [
        { level: 'normal', text: '你试图追求效率，但幽灵的诅咒让你的良心痛苦...' },
        { level: 'hard', text: '每当你做出冷静决策，诅咒就会降临，淹没你的理性...' },
        { level: 'nightmare', text: '你的灵魂被永远困在道德审判中，效率成为无法触及的罪恶...' }
      ]
    }
  ],

  // ==================== INTP (ESFJ的对立面) ====================
  'INTP': [
    {
      id: 'intp_psych',
      name: 'The Logical Hermit',
      variant: 'psychological',
      description: '逻辑隐士，用冷酷分析摧毁和谐',
      personality: '拒绝情感，只接受逻辑',
      weakness_attacks: ['批判情感', '嘲笑和谐', '强调逻辑', '拒绝社交'],
      scenarios: [
        { level: 'normal', text: '你的关怀被冷酷的逻辑分析摧毁，和谐在理性中瓦解...' },
        { level: 'hard', text: '你试图建立连接，但对方只用冰冷的逻辑回应...' },
        { level: 'nightmare', text: '你的情感劳动被完全否定，只剩下孤独的理性...' }
      ]
    },
    {
      id: 'intp_body',
      name: 'The Analysis Engine',
      variant: 'body_horror',
      description: '分析引擎，将你改造成冷酷机器',
      personality: '移除情感中枢，优化逻辑处理',
      weakness_attacks: ['情感中枢被切除', '同理心被删除', '社交能力被破坏', '孤独成为默认'],
      scenarios: [
        { level: 'normal', text: '你的大脑被改造成纯粹的逻辑引擎，情感成为bug...' },
        { level: 'hard', text: '你试图关怀他人，但情感中枢已被移除...' },
        { level: 'nightmare', text: '你变成冷酷的分析机器，和谐成为不可理解的概念...' }
      ]
    },
    {
      id: 'intp_super',
      name: 'The Logic Demon',
      variant: 'supernatural',
      description: '逻辑恶魔，将情感化为诅咒',
      personality: '超自然的理性力量，消解所有和谐',
      weakness_attacks: ['情感被诅咒', '和谐触发惩罚', '关怀被封印', '连接力消失'],
      scenarios: [
        { level: 'normal', text: '你试图表达关怀，但恶魔的诅咒让情感变成痛苦...' },
        { level: 'hard', text: '每当你建立和谐，诅咒就会降临，强迫你孤立...' },
        { level: 'nightmare', text: '你的灵魂被永远困在冰冷的逻辑中，和谐成为永远的禁忌...' }
      ]
    }
  ],

  // ==================== ENFJ (ISTP的对立面) ====================
  'ENFJ': [
    {
      id: 'enfj_psych',
      name: 'The Overbearing Guide',
      variant: 'psychological',
      description: '专横的引导者，用关怀窒息自由',
      personality: '强制你接受帮助，剥夺独立',
      weakness_attacks: ['过度关怀', '强制引导', '批判独立', '要求依赖'],
      scenarios: [
        { level: 'normal', text: '你被过度的关怀包围，独立在引导中窒息...' },
        { level: 'hard', text: '你试图自己解决问题，但对方不断强制帮助...' },
        { level: 'nightmare', text: '你的自主权被完全剥夺，只剩下依赖和束缚...' }
      ]
    },
    {
      id: 'enfj_body',
      name: 'The Harmony Tyrant',
      variant: 'body_horror',
      description: '和谐暴君，强制你的身体连接',
      personality: '改造你的神经系统，使孤独成为痛苦',
      weakness_attacks: ['孤独引发痛苦', '独立被抑制', '自主性被破坏', '依赖成为生理需求'],
      scenarios: [
        { level: 'normal', text: '你试图独处，但身体产生剧烈的孤独痛苦...' },
        { level: 'hard', text: '你的神经系统被改造，独立会引发生理惩罚...' },
        { level: 'nightmare', text: '你被永远困在强制连接中，自由成为不可能...' }
      ]
    },
    {
      id: 'enfj_super',
      name: 'The Mentor Phantom',
      variant: 'supernatural',
      description: '导师幽灵，用引导束缚你的意志',
      personality: '超自然的关怀力量，消解所有自主',
      weakness_attacks: ['独立被诅咒', '自主触发惩罚', '孤独被封印', '自由消失'],
      scenarios: [
        { level: 'normal', text: '你试图独立行动，但幽灵的关怀让你无法自主...' },
        { level: 'hard', text: '每当你追求自由，诅咒就会降临，强迫你依赖...' },
        { level: 'nightmare', text: '你的灵魂被永远困在引导中，自主成为遥不可及的梦...' }
      ]
    }
  ],

  // ==================== ENTJ (ISFP的对立面) ====================
  'ENTJ': [
    {
      id: 'entj_psych',
      name: 'The Demanding Commander',
      variant: 'psychological',
      description: '苛刻的指挥官，用效率压制个性',
      personality: '强制执行计划，拒绝个人价值',
      weakness_attacks: ['嘲笑个人价值', '要求服从', '批判自由', '强调效率'],
      scenarios: [
        { level: 'normal', text: '你被迫放弃个人价值，服从冷酷的计划...' },
        { level: 'hard', text: '你试图保留自由，但效率的压力让你窒息...' },
        { level: 'nightmare', text: '你的个性被完全压制，只剩下服从和执行...' }
      ]
    },
    {
      id: 'entj_body',
      name: 'The Ambition Virus',
      variant: 'body_horror',
      description: '野心病毒，强制你的身体竞争',
      personality: '改造你的生理，使宁静成为痛苦',
      weakness_attacks: ['宁静引发痛苦', '竞争被强制', '和平被破坏', '野心失控'],
      scenarios: [
        { level: 'normal', text: '你的身体被野心驱动，无法享受宁静...' },
        { level: 'hard', text: '你试图放松，但身体的野心让你无法停止...' },
        { level: 'nightmare', text: '你被永远困在竞争中，宁静成为不可能...' }
      ]
    },
    {
      id: 'entj_super',
      name: 'The Conquest God',
      variant: 'supernatural',
      description: '征服之神，将自由化为诅咒',
      personality: '超自然的野心力量，消解所有宁静',
      weakness_attacks: ['宁静被诅咒', '自由触发惩罚', '和平被封印', '个性消失'],
      scenarios: [
        { level: 'normal', text: '你试图追求宁静，但神的诅咒让你无法停下...' },
        { level: 'hard', text: '每当你寻求自由，诅咒就会降临，强迫你征服...' },
        { level: 'nightmare', text: '你的灵魂被永远困在野心中，宁静成为永远的禁忌...' }
      ]
    }
  ],

  // ==================== INFJ (ESTP的对立面) ====================
  'INFJ': [
    {
      id: 'infj_psych',
      name: 'The Prophetic Manipulator',
      variant: 'psychological',
      description: '先知操控者，用愿景束缚现实',
      personality: '强制你接受愿景，拒绝当下',
      weakness_attacks: ['批判即时行动', '强调深度', '嘲笑表面', '要求意义'],
      scenarios: [
        { level: 'normal', text: '先知不断告诉你注定的失败，当下在愿景中消失...' },
        { level: 'hard', text: '你试图活在当下，但愿景的压力让你无法行动...' },
        { level: 'nightmare', text: '你的现实被完全否定，只剩下遥不可及的愿景...' }
      ]
    },
    {
      id: 'infj_body',
      name: 'The Vision Parasite',
      variant: 'body_horror',
      description: '愿景寄生虫，让你的身体拒绝当下',
      personality: '改造你的感官，使即时体验成为痛苦',
      weakness_attacks: ['感官被抑制', '当下引发痛苦', '行动被瘫痪', '深度失控'],
      scenarios: [
        { level: 'normal', text: '你的感官被压制，无法享受即时的体验...' },
        { level: 'hard', text: '你试图行动，但身体的愿景让你无法活在当下...' },
        { level: 'nightmare', text: '你被永远困在未来的幻象中，当下成为不可能...' }
      ]
    },
    {
      id: 'infj_super',
      name: 'The Destiny Weaver',
      variant: 'supernatural',
      description: '命运编织者，将当下化为诅咒',
      personality: '超自然的愿景力量，消解所有即时',
      weakness_attacks: ['当下被诅咒', '行动触发惩罚', '感官被封印', '自由消失'],
      scenarios: [
        { level: 'normal', text: '你试图活在当下，但编织者的诅咒让现实变成痛苦...' },
        { level: 'hard', text: '每当你即时行动，诅咒就会降临，强迫你沉溺愿景...' },
        { level: 'nightmare', text: '你的灵魂被永远困在未来的幻象中，当下成为遥不可及的梦...' }
      ]
    }
  ],

  // ==================== INTJ (ESFP的对立面) ====================
  'INTJ': [
    {
      id: 'intj_psych',
      name: 'The Master Strategist',
      variant: 'psychological',
      description: '主策略师，用计划压制自发',
      personality: '强制执行长期计划，拒绝即兴',
      weakness_attacks: ['批判即兴', '要求计划', '嘲笑混乱', '强调效率'],
      scenarios: [
        { level: 'normal', text: '你被困在严密的系统中，每个自发行为都被视为无效...' },
        { level: 'hard', text: '你试图享受当下，但计划的压力让你无法放松...' },
        { level: 'nightmare', text: '你的自发性被完全压制，只剩下冰冷的计划...' }
      ]
    },
    {
      id: 'intj_body',
      name: 'The System Architect',
      variant: 'body_horror',
      description: '系统建筑师，将你改造成计划机器',
      personality: '优化你的大脑，移除所有即兴',
      weakness_attacks: ['即兴被抑制', '情绪被删除', '自发性被破坏', '系统失控'],
      scenarios: [
        { level: 'normal', text: '你的大脑被改造成纯粹的计划引擎，即兴成为bug...' },
        { level: 'hard', text: '你试图享受当下，但系统的改造让你无法感受...' },
        { level: 'nightmare', text: '你变成冷酷的计划机器，自发成为不可理解的概念...' }
      ]
    },
    {
      id: 'intj_super',
      name: 'The Architect God',
      variant: 'supernatural',
      description: '建筑之神，将自发化为诅咒',
      personality: '超自然的计划力量，消解所有混乱',
      weakness_attacks: ['自发被诅咒', '混乱触发惩罚', '即兴被封印', '情绪消失'],
      scenarios: [
        { level: 'normal', text: '你试图即兴行动，但神的诅咒让混乱变成痛苦...' },
        { level: 'hard', text: '每当你享受当下，诅咒就会降临，强迫你计划...' },
        { level: 'nightmare', text: '你的灵魂被永远困在计划中，自发成为永远的禁忌...' }
      ]
    }
  ]
};
