export type ExplorationArticleLocale = 'en' | 'zh';

interface ExplorationArticleCard {
  title: string;
  body: string;
  logo?: string;
  image?: string;
  example?: string;
  strengths?: string[];
}

interface ExplorationArticleListCard {
  title: string;
  body?: string;
  points: string[];
}

interface ExplorationArticleExample {
  title: string;
  prompt: string;
  note: string;
}

interface ExplorationArticleVisual {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  points: string[];
}

export interface ExplorationArticleContent {
  eyebrow: string;
  metaPills: string[];
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  heroHighlights: ExplorationArticleCard[];
  visualizationLabel: string;
  visualizationTitle: string;
  visualizations: ExplorationArticleVisual[];
  problemLabel: string;
  problemTitle: string;
  problemPoints: string[];
  genericPromptLabel: string;
  genericPrompt: string;
  genericPromptNote: string;
  coreIdeaLabel: string;
  coreIdeaTitle: string;
  coreIdeaStatements: string[];
  structuredPromptLabel: string;
  structuredPrompt: string;
  structuredPromptNote: string;
  principlesLabel: string;
  principlesTitle: string;
  principlesVisual: ExplorationArticleVisual;
  principles: ExplorationArticleListCard[];
  examplesLabel: string;
  examplesTitle: string;
  examplesVisual: ExplorationArticleVisual;
  examples: ExplorationArticleExample[];
  frameworkLabel: string;
  frameworkTitle: string;
  frameworkIntro: string;
  frameworkVisual: ExplorationArticleVisual;
  frameworkNodes: ExplorationArticleCard[];
  frameworkTemplateLabel: string;
  frameworkTemplate: string;
  comparisonLabel: string;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonVisual: ExplorationArticleVisual;
  comparisons: ExplorationArticleCard[];
  promptSectionLabel: string;
  promptSectionTitle: string;
  promptSectionIntro: string;
  promptVisual: ExplorationArticleVisual;
  englishPromptLabel: string;
  englishPrompt: string;
  chinesePromptLabel: string;
  chinesePrompt: string;
  refinementLabel: string;
  refinementPrompt: string;
  closingNote: string;
}

type ExplorationArticleMap = Record<string, Record<ExplorationArticleLocale, ExplorationArticleContent>>;

export const EXPLORATION_ARTICLES: ExplorationArticleMap = {
  'exp-prompt': {
    en: {
      eyebrow: 'Design Team Sharing',
      metaPills: ['12-page deck', 'Bilingual copy'],
      heroLabel: 'Writing Image Prompts as Visual Design',
      heroTitle: 'From intuition to executable visual decisions',
      heroBody:
        'This exploration explains how to write image prompts like visual specs. A useful prompt names the subject, composition, camera, light, material, and mood, so the model knows what to keep stable and what to change.',
      heroHighlights: [
        {
          title: 'Why the outputs feel random',
          body: 'Results become unstable when the prompt never specifies what should control the frame.',
        },
        {
          title: 'What the prompt actually does',
          body: 'A prompt is a compact design brief for visual hierarchy, not a wish list of styles.',
        },
        {
          title: 'Why structure matters',
          body: 'Once the writing is systematic, images become easier to reproduce, refine, and share with others.',
        },
      ],
      visualizationLabel: 'Image2 Visualizations',
      visualizationTitle: 'The key ideas turned into visual working models',
      visualizations: [
        {
          eyebrow: 'From vague to executable',
          title: 'Prompting becomes visual specification',
          body:
            'A vague idea becomes useful when it names controllable choices: who is in the frame, where they sit, how the camera sees them, and how the light behaves.',
          image: '/projects/prompt-template-thinking/visual-decisions-v2.png',
          alt:
            'An abstract dark studio illustration where glowing particles become modular visual design controls and a composed portrait frame.',
          points: [
            'Example: write "subject on the right third", not only "cinematic portrait".',
            'Hierarchy tells the model what matters first.',
            'Clear conditions make the next edit easier to describe.',
          ],
        },
        {
          eyebrow: 'Reusable template system',
          title: 'Five modules create a repeatable prompt framework',
          body:
            'A template turns prompt writing into fillable slots. For example: mood first, then subject, camera, lighting, and detail.',
          image: '/projects/prompt-template-thinking/template-framework-v2.png',
          alt:
            'A refined dark 3D illustration of five connected prompt modules that feed into a finished image frame.',
          points: [
            'Emotion: calm, tense, warm, restrained.',
            'Subject: who or what anchors the image.',
            'Camera, lighting, and detail make the result controllable.',
          ],
        },
        {
          eyebrow: 'Iteration loop',
          title: 'Refinement is a directed edit, not another random roll',
          body:
            'A follow-up prompt should edit one clear condition. For example: keep the pose, make the light warmer, and soften facial detail.',
          image: '/projects/prompt-template-thinking/refinement-flow.png',
          alt:
            'A cinematic interface illustration showing three image frames progressing from vague output to structured prompt and refined result.',
          points: [
            'Check what changed against the original prompt.',
            'Keep the parts that already work.',
            'Change one or two variables instead of rewriting everything.',
          ],
        },
      ],
      problemLabel: 'Problem Framing',
      problemTitle: 'Why AI images feel random',
      problemPoints: [
        'A prompt like "beautiful cinematic portrait" leaves the model to choose the subject, camera, and light.',
        'If those choices are not written down, a good result is hard to repeat.',
        'Changing models can help, but it does not fix an unclear brief.',
        'The real fix is to write the visual decisions explicitly.',
      ],
      genericPromptLabel: 'Generic prompt example',
      genericPrompt:
        'Create a cinematic, emotional portrait of a lonely woman at night, beautiful lighting, ultra realistic.',
      genericPromptNote:
        'This asks for a vibe but gives no composition, camera angle, light direction, or subject placement. The result may look polished, but it is hard to control.',
      coreIdeaLabel: 'Reframe',
      coreIdeaTitle: 'Prompt is visual writing',
      coreIdeaStatements: [
        'Prompt != command: "make it cinematic" is too open.',
        'Prompt = visual decision-making: "right third, left side light, neutral background" is executable.',
        'AI is a visual executor: it follows written conditions better than unspoken taste.',
      ],
      structuredPromptLabel: 'Structured prompt example',
      structuredPrompt:
        'Create an image with a clear single subject and minimal background. The subject carries visual weight through scale and lighting, while secondary elements are intentionally subdued.',
      structuredPromptNote: 'Clear composition produces a clearer focal point.',
      principlesLabel: 'Design Principles',
      principlesTitle: 'Four ways to make prompts more stable',
      principlesVisual: {
        eyebrow: 'Style matrix',
        title: 'Same subject, many visual languages',
        body:
          'A stable prompt keeps subject, pose, composition, and light consistent while changing only the visual language.',
        image: '/projects/prompt-template-thinking/style-variations-v2.png',
        alt:
          'A twelve-panel style matrix showing the same seated person rendered as anime, oil painting, crayon, pencil, watercolor, charcoal, ink, vector, pixel art, and photoreal styles.',
        points: [
          'Style changes the surface language, not the core brief.',
          'Lock subject and composition before comparing styles.',
          'Use style anchors deliberately instead of stacking keywords.',
        ],
      },
      principles: [
        {
          title: 'Style is an anchor',
          body: 'Style works best when the content stays fixed and the visual language changes.',
          points: [
            'Example: same seated person, same chair, anime vs oil painting.',
            'Keep the subject and composition consistent before changing style.',
            'Use one strong style direction instead of five style keywords.',
          ],
        },
        {
          title: 'Subject and composition',
          body: 'Avoid the centered default whenever the image needs tension or direction.',
          points: [
            'Weak: "a person sitting in a chair".',
            'Clear: "person seated on the right third of the frame".',
            'Placement creates hierarchy before style is applied.',
          ],
        },
        {
          title: 'Pseudo perspective',
          body: 'Depth becomes clearer when the prompt gives the model spatial cues.',
          points: [
            'Use angle: "viewed from a high rooftop angle".',
            'Use density: "background stays dark and visually quiet".',
            'Use scale: "small distant lights behind the subject".',
          ],
        },
        {
          title: 'Lighting defines mood',
          body: 'Mood becomes visible when light is written as direction, softness, and color.',
          points: [
            'Weak: "emotional lighting".',
            'Clear: "soft warm side light from the left".',
            'Sharper shadows feel tense; softer shadows feel calm.',
          ],
        },
      ],
      examplesLabel: 'Executable Examples',
      examplesTitle: 'Three prompt moves from the original deck',
      examplesVisual: {
        eyebrow: 'Prompt moves',
        title: 'Composition, depth, and light are visible instructions',
        body:
          'The same subject can shift from a flat image to a directed scene when placement, camera angle, and lighting become explicit.',
        image: '/projects/prompt-template-thinking/executable-examples.png',
        alt:
          'A three-panel cinematic illustration showing composition, depth, and lighting variations for a seated portrait prompt.',
        points: [
          'Composition gives the image hierarchy.',
          'Angle and background density create depth.',
          'Light direction and softness turn mood into a visual condition.',
        ],
      },
      examples: [
        {
          title: 'Composition',
          prompt:
            'Create a portrait of a woman seated on a chair, positioned on the right third of the frame.',
          note: 'The placement instruction introduces hierarchy immediately.',
        },
        {
          title: 'Depth',
          prompt:
            'Create a cinematic portrait of a woman seated on a chair, viewed from a high rooftop angle looking downward. Use neutral-to-warm directional lighting with a calm and restrained mood. The subject is clearly visible, and the background remains dark and visually quiet.',
          note: 'Angle, distance, and background density create depth without explicit 3D language.',
        },
        {
          title: 'Lighting and mood',
          prompt:
            'Create a portrait of a woman seated on a chair, positioned on the right third of the frame. Use soft, directional side lighting with a subtly warm color temperature, creating gentle highlights and smooth shadow transitions.',
          note: 'The mood becomes tangible once the light direction, softness, and temperature are explicit.',
        },
      ],
      frameworkLabel: 'Reusable System',
      frameworkTitle: 'A reusable prompt writing framework',
      frameworkIntro:
        'The framework breaks one image request into five decisions. Write each decision once, then change only the slot you want to test.',
      frameworkVisual: {
        eyebrow: 'Modular template',
        title: 'A template makes visual taste reusable',
        body:
          'The framework gives every image request a repeatable path from emotion to subject, camera, lighting, and detail.',
        image: '/projects/prompt-template-thinking/template-framework-v2.png',
        alt:
          'A refined dark 3D illustration of five connected prompt modules that feed into a finished image frame.',
        points: [
          'Each module controls one part of the visual brief.',
          'Reusable slots reduce improvisation.',
          'The same template can be adapted across scenes and styles.',
        ],
      },
      frameworkNodes: [
        {
          title: 'Emotion',
          body: 'Mood target, such as calm, tense, warm, or lonely.',
        },
        {
          title: 'Subject',
          body: 'Who appears, where they sit, and what should dominate.',
        },
        {
          title: 'Camera',
          body: 'How the scene is viewed: close-up, wide shot, high angle.',
        },
        {
          title: 'Lighting',
          body: 'Where light comes from, how soft it is, and how warm it feels.',
        },
        {
          title: 'Detail',
          body: 'Material and texture, such as matte fabric or soft skin detail.',
        },
      ],
      frameworkTemplateLabel: 'Framework template',
      frameworkTemplate:
        'Create a {emotion} atmosphere using {lighting condition + color tone}. A {subject} placed {composition placement} acts as the primary visual anchor. Shot with a {lens} at {angle} with {depth of field}. Lighting is {direction} with a {ratio} contrast and {temperature} color temperature. Materials show {material traits} with {micro details}.',
      comparisonLabel: 'Model Selection',
      comparisonTitle: 'How to compare current image generation models',
      comparisonIntro:
        'After the prompt structure is clear, the next question is which model best fits the task. The comparison should focus on real market tools, not abstract capability labels.',
      comparisonVisual: {
        eyebrow: 'Market model scan',
        title: 'Compare models by the job they do best',
        body:
          'Use the same prompt across models, then compare where each model is strongest: semantic understanding, editing, conversation, or text rendering.',
        image: '/projects/prompt-template-thinking/model-selection-v2.png',
        alt:
          'A dark analytical 3D diagram showing a structured prompt feeding multiple model crystals and capability panels.',
        points: [
          'Same prompt: keep the input identical so the difference is visible.',
          'Same criteria: compare consistency, instruction following, and text handling.',
          'Same task type: choose the model that fits the real production job.',
        ],
      },
      comparisons: [
        {
          title: 'Nanobanana',
          logo: 'Gemini',
          image: '/projects/prompt-template-thinking/model-nano-banana.png',
          body: 'Strong for complex semantic understanding and keeping a character, scene, or object consistent across variations.',
          example: 'Example: keep the same character and room layout while changing outfit, pose, and lighting across a campaign set.',
          strengths: ['Logical reasoning', 'Character and scene consistency', 'Complex prompt restoration'],
        },
        {
          title: 'ChatGPT Image2',
          logo: 'OpenAI',
          image: '/projects/prompt-template-thinking/model-chatgpt-images.png',
          body: 'Strong when the task needs natural conversation, semantic alignment, and multi-turn refinement without rewriting the whole prompt.',
          example: 'Example: generate a poster direction, then say "keep the layout, make the lighting softer, and move the subject right."',
          strengths: ['Conversational iteration', 'Semantic alignment', 'Low prompt-writing barrier'],
        },
        {
          title: '即梦',
          logo: 'Jimeng',
          image: '/projects/prompt-template-thinking/model-design-stack.png',
          body: 'Strong for a combined generation and editing workflow, especially when the task includes Chinese copy or detailed local adjustments.',
          example: 'Example: create a Chinese poster, then edit the title area, background, and subject detail inside the same workflow.',
          strengths: ['Generation + editing in one flow', 'Chinese text rendering', 'Complex instruction following'],
        },
        {
          title: 'Qwen Image',
          logo: 'Qwen',
          image: '/projects/prompt-template-thinking/model-midjourney.png',
          body: 'Strong when the image depends on Chinese-English text rendering and precise image editing.',
          example: 'Example: make a bilingual information card, preserve the main product image, and accurately edit only the text block.',
          strengths: ['Chinese-English text rendering', 'Precise image editing', 'Text-heavy visual tasks'],
        },
      ],
      promptSectionLabel: 'End-to-End Example',
      promptSectionTitle: 'The full prompt and its bilingual translation',
      promptSectionIntro:
        'The last slides land the framework with one complete prompt, a Chinese translation, and a small follow-up edit request.',
      promptVisual: {
        eyebrow: 'Complete workflow',
        title: 'A full prompt acts like a visual production spec',
        body:
          'The final example translates subject, placement, pose, material, light, background, and mood into a complete image brief, then refines one condition at a time.',
        image: '/projects/prompt-template-thinking/prompt-refinement-spec-v2.png',
        alt:
          'A dark 3D workflow illustration showing structured prompt cards becoming a seated portrait, then a warmer softer refined version.',
        points: [
          'The prompt specifies the whole scene, not just the subject.',
          'The follow-up edit changes light, softness, and detail.',
          'Iteration stays anchored to the original visual spec.',
        ],
      },
      englishPromptLabel: 'English prompt',
      englishPrompt:
        'Create a cinematic portrait of a woman seated on a modern chair, positioned on the right third of the frame. Her body leans slightly backward, with one arm resting on the chair arm and the other relaxed on her lap. She wears an all-black outfit with a matte fabric texture. Lighting comes from the left side, creating clear shadow structure without losing facial detail. The mood is calm and restrained, with a neutral background and no additional props.',
      chinesePromptLabel: 'Chinese translation',
      chinesePrompt:
        'Generate a cinematic portrait. A woman is seated on a modern chair, placed on the right third of the frame as the visual focal point. Her body leans slightly backward, with one arm resting naturally on the chair arm and the other on her lap. She wears an all-black outfit with a matte fabric texture and no obvious reflections. Light enters from the left side of the frame, creating clear but not exaggerated light and shadow structure while preserving facial detail. The background is a neutral and simple solid environment, with no extra props or decoration. The overall mood is quiet, calm, restrained, and cinematic.',
      refinementLabel: 'Follow-up edit request',
      refinementPrompt: 'Make the lighting warmer and softer, and reduce the sharpness of facial details.',
      closingNote:
        'The useful takeaway is simple: treat the prompt like a visual spec. Once the image brief becomes structured, taste turns into a workflow instead of a lucky accident.',
    },
    zh: {
      eyebrow: '设计团队分享',
      metaPills: ['12 页分享', '支持中英切换'],
      heroLabel: 'Writing Image Prompts as Visual Design',
      heroTitle: '从直觉到可执行的视觉决策',
      heroBody:
        '这份分享讲的是如何把图像 prompt 写成视觉规格。好的 prompt 会明确主体、构图、镜头、光线、材质和情绪，让模型知道哪些要保持稳定，哪些可以被调整。',
      heroHighlights: [
        {
          title: '为什么结果会随机',
          body: '当 prompt 没有写清主体、构图、镜头和光线时，输出就会显得不稳定。',
        },
        {
          title: 'Prompt 真正在做什么',
          body: '它不是一串风格关键词，而是一份压缩过的视觉设计 brief。',
        },
        {
          title: '为什么结构重要',
          body: '写法一旦系统化，复现、迭代和协作都会更轻松。',
        },
      ],
      visualizationLabel: 'Image2 可视化',
      visualizationTitle: '把重点信息转成可感知的视觉模型',
      visualizations: [
        {
          eyebrow: '从模糊到可执行',
          title: 'Prompt 本质上是在写视觉规格',
          body:
            '模糊想法要变得可用，需要写清楚可控制的选择：谁在画面里、坐在哪里、镜头怎么看、光线怎么打。',
          image: '/projects/prompt-template-thinking/visual-decisions-v2.png',
          alt:
            '深色工作室插图，发散的灵感粒子转化为模块化视觉控制项，并汇入带三分法网格的人像画面。',
          points: [
            '例子：写“人物在画面右侧三分之一”，不要只写“电影感人像”。',
            '层级会告诉模型画面里什么最重要。',
            '条件越清楚，下一步修改越容易描述。',
          ],
        },
        {
          eyebrow: '可复用模板系统',
          title: '五个模块组成可复用的 prompt 框架',
          body:
            '模板把 prompt 变成可以填写的槽位。例如先写情绪，再写主体、镜头、光线和细节。',
          image: '/projects/prompt-template-thinking/template-framework-v2.png',
          alt:
            '深色 3D 插图，五个相连的 prompt 模块共同输入到一张完成的视觉画面中。',
          points: [
            'Emotion：安静、紧张、温暖、克制。',
            'Subject：谁或什么是画面锚点。',
            'Camera、Lighting、Detail 让结果可以被控制。',
          ],
        },
        {
          eyebrow: '迭代流程',
          title: '微调不是重新抽卡，而是定向编辑',
          body:
            '后续 prompt 应该只改清楚的一两个条件。例如：保持姿态不变，把光线调暖，并降低面部锐度。',
          image: '/projects/prompt-template-thinking/refinement-flow.png',
          alt:
            '电影感界面插图，三张画面从模糊输出逐步变为结构化构图和精修后的图像。',
          points: [
            '先对照原始 prompt 看哪些条件跑偏。',
            '保留已经正确的主体、姿态和构图。',
            '不要重写整条 prompt，只改需要调整的变量。',
          ],
        },
      ],
      problemLabel: '问题定义',
      problemTitle: '为什么 AI 图像会显得随机',
      problemPoints: [
        '像“漂亮的电影感人像”这种写法，会把主体、镜头和光线都交给模型猜。',
        '如果这些选择没有写下来，好图就很难复现。',
        '换模型只能改善画面质感，不能解决 brief 不清楚的问题。',
        '真正的解法是把视觉决策逐条写出来。',
      ],
      genericPromptLabel: '泛化写法示例',
      genericPrompt: '创建一张夜晚孤独女人的电影感、情绪化、灯光漂亮、超写实的人像。',
      genericPromptNote: '这句话只有氛围，没有构图、镜头角度、光线方向和主体位置。结果即使好看，也很难复现。',
      coreIdeaLabel: '重新理解 Prompt',
      coreIdeaTitle: 'Prompt 不是命令，而是视觉写作',
      coreIdeaStatements: [
        'Prompt != 指令：只写“更电影感”太开放。',
        'Prompt = 视觉决策：写“右三分之一、左侧光、中性背景”才可执行。',
        'AI 是视觉执行器：它更擅长执行写出来的条件，而不是猜审美。',
      ],
      structuredPromptLabel: '结构化写法示例',
      structuredPrompt:
        '创建一张只有单一明确主体、背景只保留纯色或低对比元素的图像。主体通过尺度与光线承担主要视觉重量，次要元素被有意压低。',
      structuredPromptNote: '当构图和权重被写清楚，焦点也会更清楚。',
      principlesLabel: '设计原则',
      principlesTitle: '四种让 prompt 更稳定的写法',
      principlesVisual: {
        eyebrow: '风格矩阵',
        title: '同一个主题做风格对比',
        body:
          '示例固定同一个人物、坐姿、椅子、构图和光线，只改变二次元、油画、蜡笔、铅笔等视觉风格。',
        image: '/projects/prompt-template-thinking/style-variations-v2.png',
        alt:
          '十二宫格风格矩阵，同一个坐在椅子上的人物分别呈现为二次元、油画、蜡笔、铅笔、水彩、炭笔、墨洗、矢量、像素和写实风格。',
        points: [
          '风格改变的是表层语言，例如线条、笔触、材质和色彩。',
          '先锁定主体和构图，再比较风格。',
          '风格锚点要有意识地使用，而不是堆关键词。',
        ],
      },
      principles: [
        {
          title: '风格是锚点',
          body: '风格最适合在内容固定之后，用来切换视觉语言。',
          points: [
            '例子：同一个坐姿人物，同一把椅子，分别生成二次元、油画、蜡笔画和铅笔画。',
            '先固定主体和构图，再比较风格差异。',
            '用一个明确风格方向，不要堆五六个风格关键词。',
          ],
        },
        {
          title: '主体与构图',
          body: '当画面需要张力和方向时，要主动避开默认的居中构图。',
          points: [
            '弱写法：“一个人坐在椅子上”。',
            '清楚写法：“人物坐在画面右侧三分之一位置”。',
            '位置会先建立层级，风格是在这个基础上叠加的。',
          ],
        },
        {
          title: '伪透视',
          body: '纵深需要给模型空间线索，而不是只写“有空间感”。',
          points: [
            '角度线索：“从高处俯视”。',
            '密度线索：“背景保持暗且安静”。',
            '尺度线索：“远处有小而稀疏的灯点”。',
          ],
        },
        {
          title: '光线定义情绪',
          body: '情绪要落到光线方向、软硬和色温上。',
          points: [
            '弱写法：“情绪化灯光”。',
            '清楚写法：“左侧柔和暖光”。',
            '硬阴影更紧张，软阴影更安静。',
          ],
        },
      ],
      examplesLabel: '可执行示例',
      examplesTitle: '原始分享里的三种写法',
      examplesVisual: {
        eyebrow: '可执行写法',
        title: '构图、纵深和光线都是可见的指令',
        body:
          '同一个主体，只要明确位置、镜头角度和光线条件，就能从“泛泛好看”变成有方向的画面。',
        image: '/projects/prompt-template-thinking/executable-examples.png',
        alt:
          '三联画式电影感插图，展示同一个坐姿人像在构图、纵深和光线条件下的不同结果。',
        points: [
          '构图先建立画面层级。',
          '角度和背景密度制造纵深。',
          '光线方向与软硬把情绪变成视觉条件。',
        ],
      },
      examples: [
        {
          title: '构图',
          prompt: '创建一张女性坐在椅子上的肖像，人物位于画面右侧三分之一位置。',
          note: '一旦主体位置被写明，层级关系就立即建立起来。',
        },
        {
          title: '纵深',
          prompt:
            '创建一张电影感女性肖像。人物坐在椅子上，从高处俯视角度观看。使用中性偏暖的方向性光线，整体氛围冷静克制。主体清晰可见，背景保持较暗且视觉上安静。',
          note: '角度、距离和背景密度能在不直接写 3D 的情况下制造纵深。',
        },
        {
          title: '光线与情绪',
          prompt:
            '创建一张女性坐在椅子上的肖像，人物位于画面右侧三分之一位置。使用柔和的侧向方向光，色温略暖，形成温柔的高光与顺滑的阴影过渡。',
          note: '当光线方向、软硬和色温被明确后，情绪才真正落地。',
        },
      ],
      frameworkLabel: '可复用系统',
      frameworkTitle: '一套可复用的 prompt 写作框架',
      frameworkIntro:
        '这套框架把一次图像请求拆成五个决策。每个决策写一次，之后只替换你想测试的那个槽位。',
      frameworkVisual: {
        eyebrow: '模块化模板',
        title: '模板让审美判断可以被复用',
        body:
          '这套框架让每次图像请求都可以从情绪、主体、镜头、光线和细节出发，形成稳定的写作路径。',
        image: '/projects/prompt-template-thinking/template-framework-v2.png',
        alt:
          '深色 3D 插图，五个相连的 prompt 模块共同输入到一张完成的视觉画面中。',
        points: [
          '每个模块控制一类视觉 brief。',
          '可替换的槽位减少临场发挥。',
          '同一套模板可以迁移到不同场景与风格。',
        ],
      },
      frameworkNodes: [
        {
          title: 'Emotion',
          body: '情绪目标，例如安静、紧张、温暖、孤独。',
        },
        {
          title: 'Subject',
          body: '谁出现、站在哪里、什么是视觉重心。',
        },
        {
          title: 'Camera',
          body: '观看方式，例如近景、广角、高处俯视。',
        },
        {
          title: 'Lighting',
          body: '光从哪里来、软还是硬、冷还是暖。',
        },
        {
          title: 'Detail',
          body: '材质和细节，例如哑光面料、柔和皮肤细节。',
        },
      ],
      frameworkTemplateLabel: '框架模板',
      frameworkTemplate:
        'Create a {emotion} atmosphere using {lighting condition + color tone}. A {subject} placed {composition placement} acts as the primary visual anchor. Shot with a {lens} at {angle} with {depth of field}. Lighting is {direction} with a {ratio} contrast and {temperature} color temperature. Materials show {material traits} with {micro details}.',
      comparisonLabel: '模型选择',
      comparisonTitle: '当前主流生图模型应该怎么对比',
      comparisonIntro:
        '当 prompt 结构已经清楚之后，下一步才是选择适合任务的模型。这里比较真实市场工具，不只写“质量好、速度快”这类泛泛维度。',
      comparisonVisual: {
        eyebrow: '市场模型扫描',
        title: '用真实任务比较模型，而不是比一个抽象分数',
        body:
          '同一条 prompt 放进不同模型里，看它们在语义理解、编辑能力、对话迭代和文字渲染上分别强在哪里。',
        image: '/projects/prompt-template-thinking/model-selection-v2.png',
        alt:
          '深色分析型 3D 信息图，结构化 prompt 输入到多个模型晶体，并连接不同能力面板。',
        points: [
          '同一条 prompt：输入一致，输出差异才看得清。',
          '同一套标准：看一致性、指令跟随、文字处理和编辑精度。',
          '同一个任务类型：最后按真实生产场景选工具。',
        ],
      },
      comparisons: [
        {
          title: 'Nanobanana',
          logo: 'Gemini',
          image: '/projects/prompt-template-thinking/model-nano-banana.png',
          body: '适合需要复杂语义理解和一致性的任务，尤其是同一个角色、场景或物体要在多张图里保持稳定。',
          example: '例子：同一个人物和房间不变，只改变服装、姿态和光线，生成一组 campaign 图。',
          strengths: ['逻辑推理', '人物与场景一致性', '复杂 prompt 还原'],
        },
        {
          title: 'ChatGPT Image2',
          logo: 'OpenAI',
          image: '/projects/prompt-template-thinking/model-chatgpt-images.png',
          body: '适合需要对话式调整和语义对齐的任务。它的优势是不需要每次重写 prompt，可以通过多轮对话逐步修。',
          example: '例子：先生成一张海报，再说“保持版式，把光线变柔和，把人物往右移”。',
          strengths: ['对话式迭代', '语义对齐', '降低 prompt 门槛'],
        },
        {
          title: '即梦',
          logo: 'Jimeng',
          image: '/projects/prompt-template-thinking/model-design-stack.png',
          body: '适合把生成和编辑放在同一个流程里做，尤其是任务里包含中文文字或比较细的局部修改时。',
          example: '例子：生成中文海报后，继续在同一流程里修改标题区域、背景和主体细节。',
          strengths: ['生成 + 编辑一体', '中文文字渲染', '复杂指令跟随'],
        },
        {
          title: 'Qwen Image',
          logo: 'Qwen',
          image: '/projects/prompt-template-thinking/model-midjourney.png',
          body: '适合文字占比高、需要中英文渲染，或者需要精确图片编辑的任务。',
          example: '例子：做一张中英双语信息卡，保留产品图，只精确修改文字区块。',
          strengths: ['中英文文字渲染', '精确图片编辑', '信息型视觉任务'],
        },
      ],
      promptSectionLabel: '完整示例',
      promptSectionTitle: '完整 prompt 与中英对照',
      promptSectionIntro:
        '最后几页用一条完整 prompt、一份中文翻译和一个后续微调请求，把这套框架收束成可直接复用的写法。',
      promptVisual: {
        eyebrow: '完整流程',
        title: '完整 prompt 像一份视觉生产规格',
        body:
          '最终示例把主体、位置、姿态、材质、光线、背景和情绪写成完整 brief，再通过后续请求定向微调。',
        image: '/projects/prompt-template-thinking/prompt-refinement-spec-v2.png',
        alt:
          '深色 3D 工作流插图，结构化 prompt 卡片生成坐姿人像，再变成更暖更柔和的精修版本。',
        points: [
          'Prompt 指定的是整张图，而不只是主体。',
          '后续微调聚焦光线、柔和度与细节。',
          '迭代始终回到原始视觉规格。',
        ],
      },
      englishPromptLabel: '英文 prompt',
      englishPrompt:
        'Create a cinematic portrait of a woman seated on a modern chair, positioned on the right third of the frame. Her body leans slightly backward, with one arm resting on the chair arm and the other relaxed on her lap. She wears an all-black outfit with a matte fabric texture. Lighting comes from the left side, creating clear shadow structure without losing facial detail. The mood is calm and restrained, with a neutral background and no additional props.',
      chinesePromptLabel: '中文翻译',
      chinesePrompt:
        '生成一张电影感人像照片。 一位女性坐在一把现代感椅子上，人物位于画面右侧三分之一位置，成为视觉重心。 身体微微向后倾斜，一只手自然搭在椅子扶手上，另一只手放在腿上，姿态放松而克制。 她穿着一套全黑服装，面料为哑光质地，没有明显反光。 光线从画面左侧打入，形成清晰但不过度夸张的明暗结构，面部细节保持完整。 背景为中性、简洁的纯色环境，不添加任何多余物品或装饰。 整体情绪安静、冷静、内敛，具有电影画面质感。',
      refinementLabel: '后续微调请求',
      refinementPrompt: 'Make the lighting warmer and softer, and reduce the sharpness of facial details.',
      closingNote:
        '最有用的结论其实很简单：把 prompt 当成视觉规格说明，而不是一次性的咒语。结构一旦稳定，审美就会变成流程，而不是碰运气。',
    },
  },
};
