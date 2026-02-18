// The 16th Room v1.0 - 演示脚本
// 用于测试 API 功能

const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

// 模拟 INTJ 测试结果
const simulateINTJTest = async () => {
    console.log('🧠 模拟 INTJ 用户测试...\n');
    
    // INTJ 倾向的答案 (I, N, T, J)
    const intjAnswers = ['I', 'N', 'T', 'J', 'I', 'N', 'T', 'J', 'I', 'N', 'T', 'J'];
    
    try {
        const response = await axios.post(`${API_BASE}/mbti-test`, {
            answers: intjAnswers
        });
        
        const result = response.data;
        console.log('📊 测试结果:');
        console.log(`用户类型: ${result.userType}`);
        console.log(`恐怖NPC: ${result.npcType} - ${result.npc.name}`);
        console.log(`NPC描述: ${result.npc.description}`);
        console.log(`攻击策略: ${result.npc.weakness_attacks.join(', ')}`);
        console.log(`恐怖场景: ${result.npc.scenario}\n`);
        
        return result;
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        return null;
    }
};

// 模拟聊天对话
const simulateChat = async (userType, npcType, message) => {
    console.log(`💬 用户 (${userType}): ${message}`);
    
    try {
        const response = await axios.post(`${API_BASE}/chat`, {
            message: message,
            userType: userType,
            npcType: npcType,
            horrorLevel: 1
        });
        
        const result = response.data;
        if (result.success) {
            console.log(`👻 ${result.npc}: ${result.message}\n`);
        } else {
            console.log(`❌ AI 回复失败: ${result.error}\n`);
        }
        
        return result;
    } catch (error) {
        console.error('❌ 聊天失败:', error.response?.data || error.message);
        return null;
    }
};

// 完整演示流程
const runDemo = async () => {
    console.log('🎭 The 16th Room v1.0 演示开始\n');
    console.log('=' * 50);
    
    // 步骤1: 测试 MBTI 检测
    const testResult = await simulateINTJTest();
    if (!testResult) return;
    
    console.log('🏚️ 进入恐怖房间...\n');
    
    // 步骤2: 模拟多轮对话
    const conversations = [
        "你好，这是什么地方？",
        "我不害怕你，我有完整的计划应对这种情况。",
        "你无法影响我的判断，我的逻辑很强。",
        "我要离开这里，你阻止不了我。"
    ];
    
    for (const message of conversations) {
        await simulateChat(testResult.userType, testResult.npcType, message);
        // 等待1秒，模拟真实对话节奏
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('🎭 演示完成！');
    console.log('\n访问 http://localhost:3000 体验完整版本');
    
    // 关闭进程
    process.exit(0);
};

// 运行演示
if (require.main === module) {
    runDemo().catch(error => {
        console.error('演示运行失败:', error);
        process.exit(1);
    });
}

module.exports = { simulateINTJTest, simulateChat, runDemo };