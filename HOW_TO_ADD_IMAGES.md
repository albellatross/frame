# 如何添加项目图片和详情

## 方式 1: 使用在线图片（推荐用于演示）

在 `constants.ts` 中直接添加图片 URL：

```typescript
{
  id: 'p3',
  title: 'NUWA - AIGC Platform',
  // ... 其他字段
  gallery: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1600',
  ],
  externalLinks: {
    behance: 'https://www.behance.net/gallery/xxx/NUWA-Project'
  },
}
```

## 方式 2: 使用本地图片

### 步骤 1: 创建图片文件夹
```bash
mkdir -p public/projects
```

### 步骤 2: 添加项目图片
将您的项目截图放到 `public/projects/` 文件夹：
```
public/
  projects/
    nuwa-1.jpg
    nuwa-2.jpg
    nuwa-3.jpg
    reme-1.jpg
    reme-2.jpg
```

### 步骤 3: 在 constants.ts 中引用
```typescript
{
  id: 'p3',
  title: 'NUWA - AIGC Platform',
  coverImage: '/projects/nuwa-cover.jpg',
  gallery: [
    '/projects/nuwa-1.jpg',
    '/projects/nuwa-2.jpg',
    '/projects/nuwa-3.jpg',
  ],
}
```

## 方式 3: 从 Figma 导出

### 步骤 1: 在 Figma 中选择项目截图
1. 打开您的 Portfolio Figma 文件
2. 选择要导出的界面/截图
3. 右键 → Export

### 步骤 2: 导出设置
- **格式**: PNG
- **Scale**: 2x（用于高清显示）
- **后缀**: 例如 `nuwa-hero`, `nuwa-feature-1`

### 步骤 3: 批量导出
如果有多张图：
1. 全选所有要导出的 frames
2. 右键 → Batch export
3. 选择 PNG @ 2x

### 步骤 4: 上传到图床或本地
**选项 A - 图床（推荐）:**
- Imgur: https://imgur.com/upload
- ImgBB: https://imgbb.com/
- 复制图片链接，粘贴到 `gallery` 数组

**选项 B - 本地文件:**
- 将导出的图片放到 `public/projects/`
- 使用相对路径 `/projects/xxx.png`

## 完整示例

```typescript
export const PROJECTS_EN: Project[] = [
  {
    id: 'p3',
    title: 'NUWA - AIGC Platform',
    category: 'C-Side',
    platform: 'Web',
    year: '2023',
    role: 'Lead Designer',
    shortDescription: 'AI-powered content generation showcase.',

    // 封面图
    coverImage: '/projects/nuwa-cover.jpg',

    // 图片画廊（按顺序展示）
    gallery: [
      '/projects/nuwa-hero.jpg',           // 主界面
      '/projects/nuwa-text-to-image.jpg',  // 文字生成图像功能
      '/projects/nuwa-image-expand.jpg',   // 图像扩展功能
      '/projects/nuwa-video-gen.jpg',      // 视频生成功能
      '/projects/nuwa-gallery-view.jpg',   // 作品展示页
    ],

    // 外部链接
    externalLinks: {
      behance: 'https://www.behance.net/gallery/xxx/NUWA',
      live: 'https://nuwa.microsoft.com'  // 如果有线上地址
    },

    // 项目标签
    tags: ['AIGC', 'AI Design', 'Web Design', 'Figma'],

    acts: {
      // ... 项目详情
    }
  },

  // 更多项目...
]
```

## 图片建议

### 尺寸建议
- **封面图** (coverImage): 1600x1200px 或 16:9 比例
- **详情图** (gallery): 1600px 宽度，高度自适应

### 文件大小
- 单张图片控制在 500KB 以内
- 使用工具压缩：TinyPNG, Squoosh.app

### 图片内容建议
1. **Hero shot** - 主界面/关键功能
2. **Key features** - 2-3 个核心功能展示
3. **User flow** - 用户使用流程图
4. **Design details** - 设计细节/交互动画截图
5. **Impact** - 数据看板/成果展示

## 快速测试

想立即看到效果？使用这些占位图测试：

```typescript
gallery: [
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600',
]
```

---

## 下一步

1. ✅ 创建 `public/projects` 文件夹
2. ✅ 从 Figma 导出项目截图
3. ✅ 在 `constants.ts` 中添加 `gallery` 数组
4. ✅ 添加 `externalLinks` 指向 Behance/Zcool
5. ✅ 刷新浏览器查看效果

需要帮助吗？告诉我您想先添加哪个项目的图片！
