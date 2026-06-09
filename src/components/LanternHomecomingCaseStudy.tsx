import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Gift,
  Lamp,
  LayoutGrid,
  MousePointer2,
  RotateCcw,
  Share2,
  Sparkles,
  Ticket,
} from 'lucide-react';

type Copy = {
  zh: string;
  en: string;
};

type LanternHomecomingCaseStudyProps = {
  isZh: boolean;
};

type AssetSlot = {
  fileName: string;
  title: Copy;
  description: Copy;
  proof: Copy;
  aspect?: string;
};

type EvidencePoint = {
  title: Copy;
  userProblem: Copy;
  designDecision: Copy;
  value: Copy;
  visual: AssetSlot;
  callouts: Copy[];
};

const FIGMA_URL =
  'https://www.figma.com/design/1I79ZbrPraSXynDAyJe170/%E6%98%A5%E8%8A%82%E9%97%AF%E5%85%B3%E5%B0%8F%E6%B8%B8%E6%88%8F?node-id=2-262&t=bBQqM0K5kIszJ6YK-1';

const pick = (copy: Copy, isZh: boolean) => (isZh ? copy.zh : copy.en);

const assetSlots = {
  sectionOne: {
    fileName: 'Section 1.png',
    title: {
      zh: '早期春节探索 / Vibe Coding 原型总览',
      en: 'Early Spring Festival exploration / Vibe Coding prototype overview',
    },
    description: {
      zh: '用于说明项目一开始围绕“春节回家路”探索，包含节日闯关、返乡语境和基础页面结构。',
      en: 'Use this to show the early Spring Festival homecoming direction, holiday challenge idea, and basic prototype structure.',
    },
    proof: {
      zh: '证明主题不是凭空改成元宵，而是从已有春节方向中保留“回家 / 归途 / 团圆”。',
      en: 'Shows that the Lantern Festival direction came from the earlier homecoming theme instead of a random reskin.',
    },
  },
  mobile: {
    fileName: 'mobile.png',
    title: {
      zh: '移动端 H5 主流程',
      en: 'Mobile H5 main flow',
    },
    description: {
      zh: '用于拆解首页故事选择、问答闯关、结局阅读、结局收集和 Train Ticket 票根分享。',
      en: 'Use this to break down story selection, quiz rounds, ending reading, ending collection, and Train Ticket sharing.',
    },
    proof: {
      zh: '证明小游戏已经从单页答题变成一条完整的节日剧情路径。',
      en: 'Shows the game becoming a full holiday story path instead of a single quiz page.',
    },
  },
  desktop: {
    fileName: 'Desktop.png',
    title: {
      zh: '桌面端适配',
      en: 'Desktop adaptation',
    },
    description: {
      zh: '用于说明同一套故事卡、问答卡和结局分享机制如何适配横向空间。',
      en: 'Use this to show how the same story cards, quiz cards, and ending share flow adapt to wider screens.',
    },
    proof: {
      zh: '证明视觉语言和交互路径在多端保持一致，而不是只做一张移动端长图。',
      en: 'Shows that the visual language and interaction path hold across devices.',
    },
  },
  ticket: {
    fileName: 'Train Ticket result screenshot',
    title: {
      zh: 'Train Ticket 归途票根结果页',
      en: 'Train Ticket result screen',
    },
    description: {
      zh: '用于放大票根弹窗、分享按钮、票根孔洞、时间地点和结果插画。',
      en: 'Use this to enlarge the ticket modal, share button, ticket holes, time/place details, and result illustration.',
    },
    proof: {
      zh: '证明结果页不是普通文字反馈，而是一张可以保存和分享的节日纪念物。',
      en: 'Shows that the result is a sharable holiday keepsake, not plain text feedback.',
    },
  },
};

const evidencePoints: EvidencePoint[] = [
  {
    title: {
      zh: '01 / 主题转译：从春节回家路到元宵夜归人',
      en: '01 / Theme translation: from Spring Festival homecoming to Lantern Night Return',
    },
    userProblem: {
      zh: '春节上线窗口变短后，原本强依赖春节符号的方案会失去节点价值。直接换成元宵皮肤也不成立，因为节日情绪不一样。',
      en: 'When the Spring Festival launch window became too tight, a concept built around Spring Festival symbols would lose timing. A simple Lantern Festival reskin would not work either, because the emotional tone is different.',
    },
    designDecision: {
      zh: '我保留“回家、归途、团圆”这三个可以跨节日延展的母题，把红包、春联、福字一类强春节符号，换成夜晚、灯会、灯笼、烟花和票根。',
      en: 'I kept the themes that could survive the timing change: homecoming, journey, reunion. Then I replaced Spring Festival only symbols with night, lantern fair, lanterns, fireworks, and a ticket.',
    },
    value: {
      zh: '这样项目不是推翻重做，而是在真实时间变化里重新判断哪些资产能留、哪些必须转译。',
      en: 'This made the project a design pivot rather than a restart. It shows how I decide what to keep and what needs translation when timing changes.',
    },
    visual: assetSlots.sectionOne,
    callouts: [
      { zh: '标出春节探索里的“回家路”语义。', en: 'Mark the homecoming idea in the Spring Festival exploration.' },
      { zh: '标出需要弱化的春节强符号。', en: 'Mark Spring Festival specific symbols that needed to be reduced.' },
      { zh: '标出可以延展到元宵的情绪资产。', en: 'Mark emotional assets that could carry into Lantern Festival.' },
    ],
  },
  {
    title: {
      zh: '02 / 入口：把“开始游戏”改成故事选择',
      en: '02 / Entry: turn start game into story selection',
    },
    userProblem: {
      zh: '如果首页只是一个开始按钮，用户不知道自己为什么要玩，也不知道不同路径会带来什么差异。',
      en: 'If the home screen is only a start button, users do not know why they should play or how different paths matter.',
    },
    designDecision: {
      zh: '我把首页组织成多张故事卡。用户先选择自己的元宵归途，再进入问答闯关。',
      en: 'I organized the home screen around story cards. The user chooses a Lantern Festival journey before entering the quiz.',
    },
    value: {
      zh: '故事卡让小游戏从“做题”变成“走一段夜归剧情”，也给结局收集埋下重复游玩的理由。',
      en: 'Story cards move the game from answering questions to following a night return story, and they prepare the reason to replay.',
    },
    visual: assetSlots.mobile,
    callouts: [
      { zh: '首页标题要明确“元宵夜归人”。', en: 'The home title should clearly say Lantern Night Return.' },
      { zh: '三张故事卡对应不同问答路线。', en: 'Three story cards map to different quiz routes.' },
      { zh: '主按钮只保留最明确的下一步。', en: 'The primary button keeps the next action obvious.' },
    ],
  },
  {
    title: {
      zh: '03 / 问答：用灯笼进度把闯关节奏做出来',
      en: '03 / Quiz: use lantern progress to make the challenge feel paced',
    },
    userProblem: {
      zh: 'Vibe Coding 原型能跑通问答，但如果缺少轮次、状态和反馈，用户会觉得自己只是在翻普通页面。',
      en: 'The Vibe Coding prototype can run the quiz, but without rounds, states, and feedback, it feels like flipping through ordinary pages.',
    },
    designDecision: {
      zh: '问答页把题目、选项和当前 Round 收进同一张卡片，顶部用灯笼进度提示闯关状态。',
      en: 'The quiz screen keeps the question, options, and current round in one card. Lantern progress at the top shows where the user is in the challenge.',
    },
    value: {
      zh: '用户知道自己走到第几轮，也知道下一步该点哪里。节日元素不只是装饰，它承担进度反馈。',
      en: 'Users know which round they are in and where to click next. The holiday element does real feedback work instead of acting as decoration.',
    },
    visual: assetSlots.mobile,
    callouts: [
      { zh: '标出 Round / lantern progress。', en: 'Mark round and lantern progress.' },
      { zh: '标出题目和选项的统一卡片区域。', en: 'Mark the unified question and option card.' },
      { zh: '标出选中/继续按钮状态。', en: 'Mark selected state and continue button.' },
    ],
  },
  {
    title: {
      zh: '04 / 结局收集：给用户再玩一次的理由',
      en: '04 / Ending collection: give users a reason to replay',
    },
    userProblem: {
      zh: '节日小游戏很短，如果只有一次结局，用户玩完就离开。',
      en: 'Holiday mini games are short. If there is only one ending, users leave after finishing once.',
    },
    designDecision: {
      zh: '我把结果显性化成结局收集。已解锁展示故事标题和插画，未解锁保留问号或剪影。',
      en: 'I made results visible as an ending collection. Unlocked endings show title and illustration; locked endings keep a question mark or silhouette.',
    },
    value: {
      zh: '用户能看到自己还差哪些结局，重复游玩变得有目标。',
      en: 'Users can see what they have not unlocked yet, so replaying has a clear target.',
    },
    visual: assetSlots.mobile,
    callouts: [
      { zh: '标出已解锁卡和未解锁卡的差异。', en: 'Mark the difference between unlocked and locked cards.' },
      { zh: '标出“再来一次”的回路。', en: 'Mark the replay path.' },
      { zh: '标出多结局排列。', en: 'Mark the multi-ending layout.' },
    ],
  },
  {
    title: {
      zh: '05 / 票根分享：把结局变成可以带走的物件',
      en: '05 / Ticket sharing: turn the ending into something users can keep',
    },
    userProblem: {
      zh: '普通结果页很难留下记忆点，也不适合分享。',
      en: 'A normal result page rarely leaves a strong memory and does not feel worth sharing.',
    },
    designDecision: {
      zh: '我把最终结果包装成 Train Ticket 归途票根。票根结构呼应回家路，时间、地点、孔洞和烟花细节增加仪式感。',
      en: 'I packaged the final result as a Train Ticket. The ticket structure echoes the homecoming journey, while time, place, punched holes, and fireworks add ceremony.',
    },
    value: {
      zh: '结果从一段文字变成一张可保存、可分享的节日纪念卡，传播路径更自然。',
      en: 'The result becomes a sharable holiday keepsake instead of a paragraph of text.',
    },
    visual: assetSlots.ticket,
    callouts: [
      { zh: '标出票根结构和孔洞。', en: 'Mark the ticket structure and punched holes.' },
      { zh: '标出结局标题和故事插画。', en: 'Mark the ending title and story illustration.' },
      { zh: '标出分享按钮。', en: 'Mark the share button.' },
    ],
  },
];

const translationRows = [
  {
    dimension: { zh: '节日节点', en: 'Holiday timing' },
    before: { zh: '春节', en: 'Spring Festival' },
    after: { zh: '元宵节', en: 'Lantern Festival' },
  },
  {
    dimension: { zh: '核心情绪', en: 'Core emotion' },
    before: { zh: '返乡、年味、热闹', en: 'Homecoming, New Year warmth, bustle' },
    after: { zh: '夜归、灯会、团圆后的余韵', en: 'Night return, lantern fair, reunion afterglow' },
  },
  {
    dimension: { zh: '视觉符号', en: 'Visual symbols' },
    before: { zh: '红包、春联、福字、红金装饰', en: 'Red envelopes, couplets, Fu character, red-gold decor' },
    after: { zh: '灯笼、烟花、暖橙光、票根、汤圆', en: 'Lanterns, fireworks, warm orange light, tickets, tangyuan' },
  },
  {
    dimension: { zh: '玩法重点', en: 'Interaction focus' },
    before: { zh: '节日闯关、任务挑战', en: 'Holiday challenge and tasks' },
    after: { zh: '故事选择、问答闯关、结局收集', en: 'Story selection, quiz rounds, ending collection' },
  },
  {
    dimension: { zh: '结果反馈', en: 'Result feedback' },
    before: { zh: '通关奖励 / 节日祝福', en: 'Completion reward or holiday blessing' },
    after: { zh: '归途票根 / 分享纪念卡', en: 'Return ticket and shareable keepsake' },
  },
];

const flowSteps = [
  {
    title: { zh: '故事选择', en: 'Story selection' },
    body: { zh: '用户先选择一个元宵归途，而不是直接开始答题。', en: 'The user chooses a Lantern Festival journey before answering questions.' },
    icon: LayoutGrid,
  },
  {
    title: { zh: '问答闯关', en: 'Quiz rounds' },
    body: { zh: 'Round、选项状态和灯笼进度让过程有游戏节奏。', en: 'Rounds, option states, and lantern progress make the flow feel like a game.' },
    icon: MousePointer2,
  },
  {
    title: { zh: '结局解锁', en: 'Ending unlocked' },
    body: { zh: '选择结果落到一段故事结局，给用户情绪反馈。', en: "The user's choices land in a story ending with emotional payoff." },
    icon: Gift,
  },
  {
    title: { zh: '结局收集', en: 'Ending collection' },
    body: { zh: '已解锁和未解锁状态让用户知道还有什么没玩到。', en: 'Unlocked and locked states show what is still missing.' },
    icon: CheckCircle2,
  },
  {
    title: { zh: '票根分享', en: 'Ticket sharing' },
    body: { zh: '结果被包装成可以保存和分享的归途票根。', en: 'The result becomes a return ticket users can save or share.' },
    icon: Ticket,
  },
];

const VisualSlot: React.FC<{ slot: AssetSlot; isZh: boolean; compact?: boolean }> = ({ slot, isZh, compact = false }) => (
  <figure className="overflow-hidden rounded-[18px] border border-[#8A3A1B]/18 bg-[#FFF7EC] shadow-[0_22px_56px_rgba(87,38,14,0.12)]">
    <div className="flex items-center gap-2 border-b border-[#8A3A1B]/12 bg-[#3A1E12] px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B3D]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#F7C266]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#7BC67B]" />
      <span className="ml-2 min-w-0 flex-1 truncate font-mono text-[11px] text-[#F8D7A3]/70">{slot.fileName}</span>
    </div>
    <div className={`grid place-items-center bg-[radial-gradient(circle_at_50%_18%,rgba(255,179,92,0.42),transparent_34%),linear-gradient(180deg,#FFF7EC,#F4E0C4)] p-5 ${compact ? 'min-h-[260px]' : 'min-h-[380px]'}`}>
      <div className="max-w-sm text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#D94C27]/12 text-[#D94C27]">
          <Lamp size={30} />
        </div>
        <p className="mt-5 text-lg font-semibold text-[#3B230E]">{pick(slot.title, isZh)}</p>
        <p className="mt-3 text-sm leading-6 text-[#6F4B32]">{pick(slot.description, isZh)}</p>
        <p className="mt-5 rounded-xl border border-dashed border-[#C77836]/45 bg-white/62 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9B3F1E]">
          {isZh ? 'needs real Figma screenshot' : 'needs real Figma screenshot'}
        </p>
      </div>
    </div>
    <figcaption className="border-t border-[#8A3A1B]/12 px-4 py-3 text-xs leading-5 text-[#75523A]">
      {pick(slot.proof, isZh)}
    </figcaption>
  </figure>
);

const SectionHeader: React.FC<{ eyebrow: string; title: Copy; body?: Copy; isZh: boolean }> = ({ eyebrow, title, body, isZh }) => (
  <div className="mb-9 max-w-3xl">
    <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#B45A22]">{eyebrow}</span>
    <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#3B230E] sm:text-5xl">{pick(title, isZh)}</h2>
    {body ? <p className="mt-5 text-base leading-8 text-[#6F4B32] sm:text-lg">{pick(body, isZh)}</p> : null}
  </div>
);

const EvidenceSection: React.FC<{ point: EvidencePoint; isZh: boolean }> = ({ point, isZh }) => (
  <section className="border-t border-[#E2C9A9] py-14 sm:py-20">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
      <div>
        <h3 className="text-2xl font-semibold leading-tight text-[#3B230E] sm:text-4xl">{pick(point.title, isZh)}</h3>
        <div className="mt-7 space-y-4">
          {[
            { label: isZh ? '用户问题' : 'User issue', body: pick(point.userProblem, isZh) },
            { label: isZh ? '我的设计判断' : 'My design decision', body: pick(point.designDecision, isZh) },
            { label: isZh ? '为什么有效' : 'Why it works', body: pick(point.value, isZh) },
          ].map((item) => (
            <div key={item.label} className="rounded-[16px] border border-[#E1C49A] bg-white/58 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#B45A22]">{item.label}</p>
              <p className="mt-2 text-sm leading-7 text-[#68452E]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <VisualSlot slot={point.visual} isZh={isZh} />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {point.callouts.map((callout, index) => (
            <div key={pick(callout, isZh)} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-[14px] border border-[#E1C49A] bg-white/58 p-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#D94C27] text-xs font-bold text-white">{index + 1}</span>
              <p className="text-xs leading-5 text-[#68452E]">{pick(callout, isZh)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FlowExplorer: React.FC<{ isZh: boolean }> = ({ isZh }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = useMemo(() => flowSteps[activeIndex], [activeIndex]);
  const ActiveIcon = activeStep.icon;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
      <div className="rounded-[18px] border border-[#E1C49A] bg-white/64 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B45A22]">{isZh ? '点击查看流程节点' : 'Click through the flow'}</p>
        <div className="mt-5 space-y-2">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const active = activeIndex === index;
            return (
              <button
                key={pick(step.title, isZh)}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex min-h-[56px] w-full items-center gap-3 rounded-[14px] px-4 py-3 text-left transition ${
                  active ? 'bg-[#3B230E] text-[#FFF7EC]' : 'bg-[#FFF7EC] text-[#5A321D] hover:bg-[#F4D7AC]'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-semibold">{pick(step.title, isZh)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[18px] border border-[#8A3A1B]/18 bg-[#2F180F] p-6 text-[#FFF7EC] shadow-[0_24px_64px_rgba(87,38,14,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(255,179,92,0.38),transparent_30%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#FFB35C] text-[#3B230E]">
              <ActiveIcon size={26} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F8D7A3]/70">{String(activeIndex + 1).padStart(2, '0')}</p>
              <h3 className="mt-1 text-2xl font-semibold">{pick(activeStep.title, isZh)}</h3>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#F8D7A3]/76">{pick(activeStep.body, isZh)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {flowSteps.map((step, index) => (
              <React.Fragment key={`${pick(step.title, isZh)}-rail`}>
                <span className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${index <= activeIndex ? 'bg-[#FFB35C] text-[#3B230E]' : 'bg-white/10 text-white/45'}`}>
                  {pick(step.title, isZh)}
                </span>
                {index < flowSteps.length - 1 ? <ArrowRight size={14} className="text-white/25" /> : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LanternHomecomingCaseStudy: React.FC<LanternHomecomingCaseStudyProps> = ({ isZh }) => {
  return (
    <article className="bg-[#F7E7CF] text-[#3B230E]">
      <section className="relative overflow-hidden bg-[#2B170F] text-[#FFF7EC]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,179,92,0.45),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(217,76,39,0.24),transparent_34%)]" />
        <div className="mx-auto grid min-h-[720px] max-w-7xl gap-10 px-6 py-16 sm:px-8 md:px-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.26em] text-[#FFB35C]">Vibe Coding / Festival H5 / Theme Translation</span>
            <h1 className="mt-7 text-[2.45rem] font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
              {isZh ? '从春节回家路到元宵夜归人' : 'From Spring Festival Homecoming to Lantern Night Return'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F8D7A3]/82 sm:text-xl">
              {isZh
                ? '项目一开始是“春节回家路”的节日小游戏探索。春节上线窗口变紧后，我保留回家、归途、团圆这条情绪线，把它转译成元宵夜晚的灯会故事、问答闯关、结局收集和归途票根分享。'
                : 'The project began as a Spring Festival homecoming mini game. When the launch window shifted, I kept the emotional core of homecoming, journey, and reunion, then translated it into a Lantern Festival night story with quiz rounds, ending collection, and ticket sharing.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lantern-flow" className="inline-flex items-center gap-2 rounded-full bg-[#FFF7EC] px-5 py-3 text-sm font-semibold text-[#3B230E] transition hover:bg-[#FFDC9A]">
                <MousePointer2 size={16} />
                {isZh ? '看交互路径' : 'View flow'}
              </a>
              <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#F8D7A3]/28 px-5 py-3 text-sm font-semibold text-[#F8D7A3] transition hover:bg-white/10">
                <ExternalLink size={16} />
                {isZh ? '打开 Figma 源文件' : 'Open Figma source'}
              </a>
            </div>
          </div>
          <div className="relative z-10">
            <VisualSlot slot={assetSlots.mobile} isZh={isZh} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
        <SectionHeader
          eyebrow="Project overview"
          isZh={isZh}
          title={{
            zh: '这个项目不是单纯做一个元宵小游戏，而是一次主题转译。',
            en: 'This is not only a Lantern Festival mini game. It is a theme translation project.',
          }}
          body={{
            zh: '我用 Vibe Coding 先跑通基础原型，再把节日节点变化带来的问题拆开处理：保留春节方案里的“回家”母题，重写元宵语境下的故事入口、闯关节奏、结局反馈和分享物料。',
            en: 'I used Vibe Coding to validate the basic prototype, then redesigned the experience around the timing change: keep the homecoming theme from the Spring Festival direction, and rebuild story entry, quiz pacing, ending feedback, and share material for Lantern Festival.',
          }}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: isZh ? '初始方向' : 'Initial direction', value: isZh ? '春节回家路' : 'Spring Festival homecoming' },
            { label: isZh ? '最终方向' : 'Final direction', value: isZh ? '元宵夜归人' : 'Lantern Night Return' },
            { label: isZh ? '我的职责' : 'My role', value: isZh ? '主题转译 / UI 优化 / 流程梳理 / 组件整理' : 'Theme translation / UI refinement / Flow structure / Component cleanup' },
          ].map((item) => (
            <div key={item.label} className="rounded-[18px] border border-[#E1C49A] bg-white/58 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B45A22]">{item.label}</p>
              <p className="mt-3 text-lg font-semibold leading-7 text-[#3B230E]">{item.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-16 rounded-[22px] border border-[#E1C49A] bg-[#FFF7EC]/72 p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <Sparkles className="text-[#D94C27]" size={22} />
            <h3 className="text-xl font-semibold text-[#3B230E]">{isZh ? '主题转译表' : 'Theme translation map'}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E1C49A] text-[#9B3F1E]">
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em]">{isZh ? '维度' : 'Dimension'}</th>
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em]">{isZh ? '春节回家路' : 'Spring Festival Homecoming'}</th>
                  <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em]">{isZh ? '元宵夜归人' : 'Lantern Night Return'}</th>
                </tr>
              </thead>
              <tbody>
                {translationRows.map((row) => (
                  <tr key={pick(row.dimension, isZh)} className="border-b border-[#E1C49A]/62">
                    <td className="py-4 pr-4 font-semibold text-[#3B230E]">{pick(row.dimension, isZh)}</td>
                    <td className="py-4 pr-4 text-[#6F4B32]">{pick(row.before, isZh)}</td>
                    <td className="py-4 pr-4 text-[#6F4B32]">{pick(row.after, isZh)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="lantern-flow" className="py-16 sm:py-24">
          <SectionHeader
            eyebrow="Interaction flow"
            isZh={isZh}
            title={{
              zh: '用户不是做完一道题就结束，而是走完一段归途。',
              en: 'The user does not just finish a quiz. They complete a return journey.',
            }}
            body={{
              zh: '最终流程按“故事选择、问答、结局、收集、分享”组织。每一步都有对应的动机和反馈，避免小游戏变成一次性页面浏览。',
              en: 'The final flow is organized around story selection, quiz, ending, collection, and sharing. Each step has a reason and a feedback moment.',
            }}
          />
          <FlowExplorer isZh={isZh} />
        </section>

        <section className="rounded-[22px] border border-[#E1C49A] bg-white/54 p-5 sm:p-7">
          <SectionHeader
            eyebrow="Asset plan"
            isZh={isZh}
            title={{
              zh: '截图怎么放：每张图都要证明一个设计判断。',
              en: 'How screenshots should work: each image needs to prove a design decision.',
            }}
            body={{
              zh: 'Figma 工具当前因为额度限制无法直接下载截图，所以我先把页面里的截图位做成真实素材占位。这里不是装饰图位，而是明确告诉之后要放什么图、证明什么交互。',
              en: 'The Figma tool is currently blocked by the plan limit, so I built the page with explicit real asset slots. These are not decorative blanks. Each slot says what image should be placed there and what design decision it should prove.',
            }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[assetSlots.sectionOne, assetSlots.mobile, assetSlots.desktop].map((slot) => (
              <VisualSlot key={slot.fileName} slot={slot} isZh={isZh} compact />
            ))}
          </div>
        </section>

        {evidencePoints.map((point) => (
          <EvidenceSection key={pick(point.title, isZh)} point={point} isZh={isZh} />
        ))}

        <section className="border-t border-[#E2C9A9] py-14 sm:py-20">
          <SectionHeader
            eyebrow="Desktop adaptation"
            isZh={isZh}
            title={{
              zh: '桌面端不是放大移动端，而是保持同一套体验语言。',
              en: 'The desktop view is not a stretched mobile screen. It keeps the same experience language.',
            }}
            body={{
              zh: '桌面端保留故事选择、问答闯关和结局分享这条路径，但用横向空间展示卡片组和阅读区。设计重点是保持同一套色彩、卡片、反馈和票根逻辑。',
              en: 'The desktop version keeps story selection, quiz rounds, and ending sharing, while using horizontal space for card groups and reading. The design goal is consistency in color, cards, feedback, and ticket logic.',
            }}
          />
          <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
            <div className="space-y-4">
              {[
                { title: { zh: 'Home / 故事选择', en: 'Home / story selection' }, body: { zh: '横向故事卡让桌面端更像活动落地页，但仍然保留“选择剧情”的游戏入口。', en: 'Horizontal story cards make the desktop view feel like a campaign page while keeping the game entry.' } },
                { title: { zh: 'Quiz / 问答闯关', en: 'Quiz / challenge rounds' }, body: { zh: '居中卡片避免大屏信息发散，灯笼进度继续承担反馈。', en: 'A centered card keeps focus on wide screens, while lantern progress still carries feedback.' } },
                { title: { zh: 'Ending / 结局与分享', en: 'Ending / result and sharing' }, body: { zh: '桌面端更适合展示完整故事文本，再用票根弹窗沉淀结果。', en: 'Desktop gives the ending text more room before the ticket modal packages the result.' } },
              ].map((item) => (
                <div key={pick(item.title, isZh)} className="rounded-[16px] border border-[#E1C49A] bg-white/58 p-4">
                  <h3 className="text-base font-semibold text-[#3B230E]">{pick(item.title, isZh)}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#68452E]">{pick(item.body, isZh)}</p>
                </div>
              ))}
            </div>
            <VisualSlot slot={assetSlots.desktop} isZh={isZh} />
          </div>
        </section>

        <section className="border-t border-[#E2C9A9] py-14 sm:py-20">
          <SectionHeader
            eyebrow="Vibe Coding workflow"
            isZh={isZh}
            title={{
              zh: 'Vibe Coding 负责快速跑通，设计判断负责让它值得玩。',
              en: 'Vibe Coding made it run fast. Design judgment made it worth playing.',
            }}
            body={{
              zh: '这个项目里，AI 协作解决的是“先把基础结构搭起来”。后面的主题转译、视觉秩序、反馈机制和分享结果，仍然需要设计师判断。',
              en: 'In this project, AI collaboration helped build the basic structure quickly. Theme translation, visual order, feedback, and share result still needed design judgment.',
            }}
          />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { icon: RotateCcw, title: { zh: '生成基础原型', en: 'Build prototype' }, body: { zh: '先跑通首页、问答和结局。', en: 'Run home, quiz, and ending first.' } },
              { icon: ArrowRight, title: { zh: '重构路径', en: 'Restructure flow' }, body: { zh: '改成故事选择到票根分享的闭环。', en: 'Move to a loop from story selection to ticket sharing.' } },
              { icon: Sparkles, title: { zh: '视觉精修', en: 'Refine visuals' }, body: { zh: '统一灯会氛围、卡片、按钮和弹窗。', en: 'Unify lantern mood, cards, buttons, and modals.' } },
              { icon: Share2, title: { zh: '结果传播', en: 'Share result' }, body: { zh: '把结局包装成可保存票根。', en: 'Package the ending as a saved ticket.' } },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={pick(step.title, isZh)} className="rounded-[18px] border border-[#E1C49A] bg-white/58 p-5">
                  <Icon className="text-[#D94C27]" size={22} />
                  <h3 className="mt-4 text-base font-semibold text-[#3B230E]">{pick(step.title, isZh)}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68452E]">{pick(step.body, isZh)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[24px] bg-[#2B170F] p-6 text-[#FFF7EC] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#FFB35C]">Reflection</span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                {isZh ? '这个项目最重要的不是节日装饰，而是判断什么该留下。' : 'The important part was not holiday decoration. It was knowing what to keep.'}
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[#F8D7A3]/78">
              <p>
                {isZh
                  ? '春节和元宵都和团圆有关，但它们不是同一种情绪。春节更热闹，更像返乡和祝福；元宵更适合夜晚、灯会和归途中的回望。这个项目让我把时间节点变化当成设计问题处理，而不是简单换一套节日素材。'
                  : 'Spring Festival and Lantern Festival both relate to reunion, but they do not feel the same. Spring Festival is louder, closer to returning home and giving blessings. Lantern Festival is better for night, lantern fairs, and looking back on the way home. I treated the timing change as a design problem, not as a skin swap.'}
              </p>
              <p>
                {isZh
                  ? 'Vibe Coding 帮我快速验证结构，但它不会自动解决用户为什么开始、为什么继续、为什么愿意分享。我的工作是把这些问题落到具体界面：故事卡、灯笼进度、结局收集、票根弹窗和分享按钮。'
                  : 'Vibe Coding helped me validate the structure quickly, but it did not answer why users start, why they continue, or why they share. My work was to answer those questions in the interface: story cards, lantern progress, ending collection, ticket modal, and share button.'}
              </p>
            </div>
          </div>
        </section>
      </section>
    </article>
  );
};

export default LanternHomecomingCaseStudy;
