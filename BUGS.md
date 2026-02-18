# 🐛 The 16th Room - Bug Tracker

## 待修复 (To Do)

### 高优先级
- [ ] 前端按钮点击后界面不切换（但代码已执行）
- [ ] Content Security Policy 阻止 eval()

### 中优先级  
- [ ] 添加恐怖背景音乐
- [ ] 添加更多MBTI问题选项（当前只有E/I两项）
- [ ] PWA离线功能测试

### 低优先级
- [ ] 移动端样式优化
- [ ] 添加用户记忆系统（localStorage）
- [ ] 添加更多恐怖NPC角色

---

## 已修复 (Fixed)

- [x] HTML缺少script标签 (2026-02-18)
- [x] MiniMax模型名称错误 abab6.5s-chat → MiniMax-M2.5 (2026-02-18)
- [x] 端口配置 3000 → 8080 (for Zeabur) (2026-02-18)
- [x] 添加PWA支持 (manifest.json + service worker) (2026-02-18)
- [x] CSP阻止脚本执行 (添加unsafe-eval) (2026-02-18)
- [x] CSS display切换不生效 (添加!important) (2026-02-18)

---

## 测试检查清单

- [ ] 首页加载正常
- [ ] 点击"开始心理测试"能切换页面
- [ ] MBTI问题能正常显示
- [ ] 答案选择后能进入下一题
- [ ] 测试完成后显示结果
- [ ] 能进入恐怖聊天房间
- [ ] AI能正常回复
- [ ] 恐怖等级能升级
- [ ] PWA能添加到主屏幕

---

## 技术债务

- 考虑从零重构前端（参考SillyTavern架构）
- 添加单元测试
- 添加E2E测试
- 优化API错误处理
- 添加日志系统
