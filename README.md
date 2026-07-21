# 华车时代官网 v6 — 产品体系与三级 Mega Menu

本版本以 `v5-light-autonomy` 为基础，保留浅色工业主题、北理工科研团队孵化背景、自主可控表达、性能优化、PowerFlow、路由动画修复和平台 GIF 展示。

## 本版新增

- 顶部“产品中心”三级联动 Mega Menu
  - 一级：六大产品族
  - 二级：产品系列
  - 三级：具体产品
- 移动端产品树形菜单
- 六大产品族页面
- 11 个公开产品详情页
- 产品中心系统关系图
- 重点产品与技术参数展示

## 六大产品族

1. 电机
2. 电机控制器
3. 增程器
4. 电源系统
   - DCDC
   - DCAC
   - ACDC
5. 配电系统
   - 汽车配电
   - 飞行器配电
6. 智能底盘

公开产品数据整理自 `products v2(1).xlsx`。未达到公开条件或仍处于内部、概念、测试阶段的产品没有进入公开详情页。没有具体公开型号的产品系列会显示“产品资料整理中”，不会虚构参数。

## 主要文件

```text
lib/product-catalog.ts             六大产品族、产品系列、具体产品与参数
components/SiteHeader.tsx          桌面三级 Mega Menu 和移动端产品树
app/products/page.tsx              产品中心总览
app/products/[family]/page.tsx     产品族页面
app/products/[family]/[slug]/page.tsx 具体产品详情页
app/globals.css                    Mega Menu、产品页面与响应式样式
components/PowerFlow.tsx           与六大产品族对应的动态能量链路
```

## 修改产品数据

产品数据统一放在：

```text
lib/product-catalog.ts
```

新增具体产品时，应填写：

```text
id
code
slug
title
nameEn
summary
voltage
power
cooling
protection
applications
maturity
```

如果一个产品系列暂时没有公开型号，让 `products` 保持为空数组即可：

```ts
products: []
```

## Blender GIF

平台演示 GIF 路径：

```text
public/media/electrified-powertrain-demo.gif
```

用真实 Blender GIF 覆盖同名文件，不需要修改代码。

## 本地运行

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

## 正式构建

```bash
npm run typecheck
npm run build
npm start
```
