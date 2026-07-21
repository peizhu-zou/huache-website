# 性能说明

本版本继承 v3 performance 的优化方案：

- 不使用 Framer Motion。
- 全站滚动出现效果由单个 IntersectionObserver 管理。
- 卡片使用绘制式玻璃材质，不使用大面积实时 backdrop blur。
- 动力流动画仅使用 transform 与 opacity。
- 页面离屏内容使用 content-visibility 延迟绘制。
- 页面进入后台后自动暂停动力流动画。
- 移动端及减少动态效果模式自动降低动画强度。

本次信息架构调整没有引入新的动画库或重型客户端组件。
