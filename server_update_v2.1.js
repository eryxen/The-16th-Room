// 这个脚本会生成完整的 server.js v2.1 版本
// 包含完整的48个NPC数据

const fs = require('fs');

// 读取 NPC 数据库文件
const npcData = fs.readFileSync('NPC_DATABASE_V2.1.js', 'utf8');

// 提取 HORROR_NPCS_V21 对象（从 const HORROR_NPCS_V21 = { 开始）
const match = npcData.match(/const HORROR_NPCS_V21 = ({[\s\S]*});/);

if (!match) {
  console.error('❌ 无法找到 HORROR_NPCS_V21 数据');
  process.exit(1);
}

const npcDataString = match[1];

// 读取当前 server.js
let serverCode = fs.readFileSync('server.js', 'utf8');

// 替换旧的 HORROR_NPCS 为新的 HORROR_NPCS_V21
// 找到 const HORROR_NPCS = { 到它的结束
const oldNpcPattern = /const HORROR_NPCS = \{[\s\S]*?\n\};/;

const newNpcCode = `const HORROR_NPCS_V21 = ${npcDataString};`;

serverCode = serverCode.replace(oldNpcPattern, newNpcCode);

// 更新 /api/chat 端点，支持 npcVariant
// 找到 const npc = HORROR_NPCS[npcType] 这一行并替换
serverCode = serverCode.replace(
  /const npc = HORROR_NPCS\[npcType\][^;]*;/,
  `const npcVariants = HORROR_NPCS_V21[npcType] || HORROR_NPCS_V21['ESFP'];
  const npcVariant = req.body.npcVariant || 0;
  const npc = npcVariants[npcVariant] || npcVariants[0];`
);

// 写入新的 server.js
fs.writeFileSync('server_v2.1_integrated.js', serverCode);

console.log('✅ server_v2.1_integrated.js 已生成');
console.log('📊 包含完整的48个NPC数据');
