import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const knowledgePath = resolve(rootDir, 'src/data/portfolio-agent-knowledge.json');
const envPath = resolve(rootDir, '.env.local');

loadEnvFile(envPath);

const PORT = Number(process.env.PORTFOLIO_AGENT_PORT || process.env.PORT || 8787);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GITHUB_MODELS_TOKEN || getGitHubCliToken();
const REQUESTED_PROVIDER = process.env.PORTFOLIO_AGENT_PROVIDER;
const MODEL_PROVIDER = REQUESTED_PROVIDER || (GITHUB_TOKEN ? 'github' : OPENAI_API_KEY ? 'openai' : 'local');
const GITHUB_MODELS_ORG = process.env.GITHUB_MODELS_ORG;
const DEFAULT_MODEL = process.env.PORTFOLIO_AGENT_MODEL || (MODEL_PROVIDER === 'github' ? 'openai/gpt-4.1' : 'gpt-5.4-mini');
const DEEP_MODEL = process.env.PORTFOLIO_AGENT_DEEP_MODEL || (MODEL_PROVIDER === 'github' ? 'openai/gpt-4.1' : 'gpt-5.5');
const EMBEDDING_MODEL = process.env.PORTFOLIO_AGENT_EMBEDDING_MODEL || (MODEL_PROVIDER === 'github' ? 'openai/text-embedding-3-small' : 'text-embedding-3-small');

const knowledge = JSON.parse(readFileSync(knowledgePath, 'utf8'));
const documents = knowledge.documents || [];
const embeddingCache = new Map();
let documentEmbeddingPromise = null;
let documentEmbeddings = null;

function getGitHubCliToken() {
  if (process.env.PORTFOLIO_AGENT_USE_GH_CLI === 'false') return '';

  try {
    return execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).trim();
  } catch {
    return '';
  }
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separator = trimmed.indexOf('=');
    if (separator === -1) return;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  });
}

function normalize(value = '') {
  return value
    .toLowerCase()
    .replace(/[|/_,.;:()[\]{}"'!?，。；：、（）【】]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function keywordScore(doc, message, candidateProjectIds = []) {
  const normalizedMessage = normalize(message);
  const text = normalize(`${doc.title} ${doc.content} ${(doc.projectIds || []).join(' ')}`);
  const terms = normalizedMessage.split(' ').filter((term) => term.length > 1);

  let score = 0;
  terms.forEach((term) => {
    if (text.includes(term)) score += term.length > 3 ? 2 : 1;
  });

  candidateProjectIds.forEach((projectId, index) => {
    if ((doc.projectIds || []).includes(projectId)) {
      score += 8 - Math.min(index, 6);
    }
  });

  if (text.includes(normalizedMessage)) score += 10;
  return score;
}

async function openai(path, payload) {
  const response = await fetch(`https://api.openai.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message = data?.error?.message || `OpenAI request failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

async function githubModels(path, payload) {
  const baseUrl = GITHUB_MODELS_ORG
    ? `https://models.github.ai/orgs/${encodeURIComponent(GITHUB_MODELS_ORG)}/inference`
    : 'https://models.github.ai/inference';
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2026-03-10',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message = data?.error?.message || data?.message || `GitHub Models request failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

function isModelProviderReady() {
  if (MODEL_PROVIDER === 'github') return Boolean(GITHUB_TOKEN);
  if (MODEL_PROVIDER === 'openai') return Boolean(OPENAI_API_KEY);
  return false;
}

async function embed(text) {
  const key = `${EMBEDDING_MODEL}:${text}`;
  if (embeddingCache.has(key)) return embeddingCache.get(key);

  const payload = {
    model: EMBEDDING_MODEL,
    input: text,
    encoding_format: 'float',
  };
  const result = MODEL_PROVIDER === 'github'
    ? await githubModels('/embeddings', payload)
    : await openai('/embeddings', payload);

  const vector = result?.data?.[0]?.embedding;
  if (!Array.isArray(vector)) {
    throw new Error('Embedding response did not include a vector.');
  }

  embeddingCache.set(key, vector);
  return vector;
}

async function ensureDocumentEmbeddings() {
  if (!isModelProviderReady()) return null;
  if (!documentEmbeddingPromise) {
    documentEmbeddingPromise = Promise.all(
      documents.map(async (doc) => ({
        doc,
        embedding: await embed(`${doc.title}\n${doc.content}`),
      }))
    ).then((items) => {
      documentEmbeddings = items;
      return items;
    });
  }

  return documentEmbeddings || documentEmbeddingPromise;
}

async function retrieveDocuments(message, candidateProjectIds) {
  const keywordRanked = documents
    .map((doc) => ({ doc, score: keywordScore(doc, message, candidateProjectIds) }))
    .sort((a, b) => b.score - a.score);

  if (!isModelProviderReady()) {
    return {
      embeddingUsed: false,
      docs: keywordRanked.slice(0, 6).map((item) => item.doc),
    };
  }

  try {
    const [docVectors, queryVector] = await Promise.all([
      ensureDocumentEmbeddings(),
      embed(message),
    ]);

    const semanticRanked = docVectors
      .map(({ doc, embedding }) => ({
        doc,
        score: cosineSimilarity(embedding, queryVector) + keywordScore(doc, message, candidateProjectIds) * 0.025,
      }))
      .sort((a, b) => b.score - a.score);

    return {
      embeddingUsed: true,
      docs: semanticRanked.slice(0, 6).map((item) => item.doc),
    };
  } catch (error) {
    console.warn(`[portfolio-agent] Embedding fallback: ${error.message}`);
    return {
      embeddingUsed: false,
      docs: keywordRanked.slice(0, 6).map((item) => item.doc),
    };
  }
}

function isDeepQuestion(message) {
  return (
    message.length > 140 ||
    /(compare|strategy|tradeoff|decision|architecture|workflow|agent|system|interview|challenge|why|how|差异|比较|策略|取舍|决策|系统|工作流|智能体|面试|挑战|为什么|如何|怎么)/i.test(message)
  );
}

function collectProjectIds(docs, candidateProjectIds = []) {
  const ordered = [];
  [...candidateProjectIds, ...docs.flatMap((doc) => doc.projectIds || [])].forEach((projectId) => {
    if (projectId && !ordered.includes(projectId)) ordered.push(projectId);
  });
  return ordered.slice(0, 5);
}

function extractOutputText(response) {
  if (typeof response.output_text === 'string') return response.output_text;

  const parts = [];
  (response.output || []).forEach((item) => {
    (item.content || []).forEach((content) => {
      if (content.type === 'output_text' && typeof content.text === 'string') {
        parts.push(content.text);
      }
    });
  });
  return parts.join('\n').trim();
}

function parseAgentJson(text, fallbackProjectIds) {
  const trimmed = text.trim();
  const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      answer: trimmed,
      projectIds: fallbackProjectIds,
      followUps: [],
      confidence: 'medium',
    };
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      answer: String(parsed.answer || trimmed),
      projectIds: Array.isArray(parsed.projectIds) ? parsed.projectIds.filter(Boolean).slice(0, 5) : fallbackProjectIds,
      followUps: Array.isArray(parsed.followUps) ? parsed.followUps.map(String).slice(0, 3) : [],
      confidence: parsed.confidence || 'medium',
    };
  } catch {
    return {
      answer: trimmed,
      projectIds: fallbackProjectIds,
      followUps: [],
      confidence: 'medium',
    };
  }
}

function buildInstructions(locale) {
  const isZh = locale === 'zh';
  return [
    'You are Geli Guo portfolio agent for interviewers and recruiters.',
    'Answer only from the provided portfolio context. If the context is insufficient, say what is not covered and suggest which project to open.',
    'Make the interviewer understand Geli as an AI product experience designer, not just list projects.',
    'Prioritize concrete project evidence, design decisions, tradeoffs, and role clarity.',
    'Do not invent metrics, employers, confidential project details, or implementation facts.',
    'Return ONLY valid JSON with this shape: {"answer":"...", "projectIds":["p1"], "followUps":["..."], "confidence":"high|medium|low"}.',
    isZh
      ? 'Use concise, natural Simplified Chinese unless the user asks for English. Keep the answer interview-ready and specific.'
      : 'Use concise, natural English unless the user asks for Chinese. Keep the answer interview-ready and specific.',
  ].join('\n');
}

function buildInput({ message, history, docs, locale }) {
  const isZh = locale === 'zh';
  const context = docs
    .map((doc, index) => `#${index + 1} ${doc.title}\nProject IDs: ${(doc.projectIds || []).join(', ')}\n${doc.content}`)
    .join('\n\n');
  const priorTurns = (history || [])
    .slice(-6)
    .map((turn) => `${turn.role}: ${turn.content}`)
    .join('\n');

  return [
    isZh ? '用户正在浏览 Geli 的作品集网站。' : "The user is browsing Geli's portfolio website.",
    priorTurns ? `Recent conversation:\n${priorTurns}` : '',
    `Portfolio context:\n${context}`,
    `User question:\n${message}`,
  ].filter(Boolean).join('\n\n');
}

async function generateOpenAIReply({ message, locale, history, candidateProjectIds, docs }) {
  const fallbackProjectIds = collectProjectIds(docs, candidateProjectIds);
  const model = isDeepQuestion(message) ? DEEP_MODEL : DEFAULT_MODEL;
  const response = await openai('/responses', {
    model,
    instructions: buildInstructions(locale),
    input: buildInput({ message, history, docs, locale }),
    max_output_tokens: 900,
    reasoning: {
      effort: isDeepQuestion(message) ? 'medium' : 'low',
    },
    text: {
      verbosity: 'medium',
    },
  });

  const outputText = extractOutputText(response);
  const parsed = parseAgentJson(outputText, fallbackProjectIds);
  return {
    ...parsed,
    mode: 'openai',
    model,
  };
}

async function generateGitHubModelsReply({ message, locale, history, candidateProjectIds, docs }) {
  const fallbackProjectIds = collectProjectIds(docs, candidateProjectIds);
  const model = isDeepQuestion(message) ? DEEP_MODEL : DEFAULT_MODEL;
  const response = await githubModels('/chat/completions', {
    model,
    messages: [
      {
        role: 'system',
        content: buildInstructions(locale),
      },
      {
        role: 'user',
        content: buildInput({ message, history, docs, locale }),
      },
    ],
    temperature: 0.25,
    max_tokens: 900,
    response_format: {
      type: 'json_object',
    },
  });

  const outputText = response?.choices?.[0]?.message?.content || '';
  const parsed = parseAgentJson(outputText, fallbackProjectIds);
  return {
    ...parsed,
    mode: 'github',
    model,
  };
}

async function generateProviderReply(args) {
  if (MODEL_PROVIDER === 'github') return generateGitHubModelsReply(args);
  return generateOpenAIReply(args);
}

function generateLocalReply({ message, locale, candidateProjectIds, docs }) {
  const isZh = locale === 'zh';
  const projectIds = collectProjectIds(docs, candidateProjectIds);
  const topDocs = docs.slice(0, 3).map((doc) => doc.title);

  return {
    mode: 'local',
    model: null,
    projectIds,
    followUps: isZh
      ? ['你在 Agent 工作流里承担了什么角色？', '哪些项目最能证明 AI UX 能力？', '你怎样处理 AI 输出不确定性？']
      : ['What was your role in agent workflow design?', 'Which projects best prove AI UX capability?', 'How do you design around AI uncertainty?'],
    confidence: 'medium',
    answer: isZh
      ? `我现在还没有连接可用的模型 API，所以先用本地作品知识库回答。这个问题和 ${topDocs.join('、')} 最相关。你的核心叙事可以是：Geli 的优势不是只做视觉包装，而是把复杂 AI 能力翻译成用户能理解、能控制、也能和团队讨论的界面动作。`
      : `I am not connected to a usable model API yet, so this is a local portfolio-knowledge answer. This question maps most closely to ${topDocs.join(', ')}. The core story is that Geli does more than visual packaging: she translates complex AI capabilities into interface actions users can understand, control, and discuss with teams.`,
  };
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function readRequestBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        rejectBody(new Error('Request body is too large.'));
        req.destroy();
      }
    });
    req.on('end', () => resolveBody(body));
    req.on('error', rejectBody);
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/portfolio-agent/health') {
    sendJson(res, 200, {
      ok: true,
      provider: MODEL_PROVIDER,
      keyConfigured: isModelProviderReady(),
      openAIConfigured: Boolean(OPENAI_API_KEY),
      githubModelsConfigured: Boolean(GITHUB_TOKEN),
      githubModelsOrg: GITHUB_MODELS_ORG || null,
      defaultModel: DEFAULT_MODEL,
      deepModel: DEEP_MODEL,
      embeddingModel: EMBEDDING_MODEL,
      documents: documents.length,
    });
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/portfolio-agent') {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  try {
    const body = JSON.parse(await readRequestBody(req));
    const message = String(body.message || '').trim();
    const locale = body.locale === 'zh' ? 'zh' : 'en';
    const history = Array.isArray(body.history) ? body.history : [];
    const candidateProjectIds = Array.isArray(body.candidateProjectIds) ? body.candidateProjectIds.filter(Boolean) : [];

    if (!message) {
      sendJson(res, 400, { error: 'Message is required.' });
      return;
    }

    const retrieval = await retrieveDocuments(message, candidateProjectIds);
    const localReply = generateLocalReply({
      message,
      locale,
      candidateProjectIds,
      docs: retrieval.docs,
    });

    if (!isModelProviderReady()) {
      sendJson(res, 200, {
        ...localReply,
        embeddingUsed: false,
        keyConfigured: false,
      });
      return;
    }

    try {
      const reply = await generateProviderReply({
        message,
        locale,
        history,
        candidateProjectIds,
        docs: retrieval.docs,
      });

      sendJson(res, 200, {
        ...reply,
        embeddingUsed: retrieval.embeddingUsed,
        keyConfigured: true,
      });
    } catch (error) {
      console.warn(`[portfolio-agent] ${MODEL_PROVIDER} fallback: ${error.message}`);
      sendJson(res, 200, {
        ...localReply,
        embeddingUsed: retrieval.embeddingUsed,
        keyConfigured: true,
        error: `${MODEL_PROVIDER}_fallback`,
      });
    }
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Portfolio agent failed.' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[portfolio-agent] API ready at http://127.0.0.1:${PORT}/api/portfolio-agent`);
  console.log(`[portfolio-agent] Provider: ${MODEL_PROVIDER}`);
  console.log(`[portfolio-agent] Model provider key: ${isModelProviderReady() ? 'configured' : 'missing, using local fallback'}`);
});
