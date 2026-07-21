# Product Mega Menu behavior

桌面端：

1. 鼠标悬停“产品中心”打开菜单。
2. 左列选择六大产品族。
3. 中列选择产品系列。
4. 右列进入具体产品。
5. 菜单关闭有 220ms 延迟，方便鼠标跨越导航与菜单之间的间隙。
6. 支持键盘 Focus、Esc 关闭和点击菜单外部关闭。

移动端：

- 没有 Hover，自动使用产品树形折叠菜单。
- 可从产品族进入分类页，也可直接进入具体产品页。

性能：

- Mega Menu 不使用 Framer Motion。
- 仅使用 React 状态和 CSS opacity/transform。
- 菜单中不自动播放大 GIF，防止导航交互卡顿。
