import { spawn } from 'node:child_process';

const viteArgs = process.argv.slice(2);
const commands = [
  {
    name: 'agent',
    command: process.execPath,
    args: ['scripts/portfolio-agent-server.mjs'],
  },
  {
    name: 'site',
    command: 'npm',
    args: ['run', 'dev:site', '--', ...viteArgs],
  },
];

const children = commands.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  child.on('exit', (code, signal) => {
    if (signal) return;
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
      shutdown(code);
    }
  });

  return child;
});

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  children.forEach((child) => {
    if (!child.killed) child.kill('SIGTERM');
  });

  setTimeout(() => process.exit(code), 120);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
