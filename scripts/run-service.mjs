import { spawn } from 'node:child_process';
import killPort from 'kill-port';

/**
 * Run a workspace service ensuring the desired port is free and cleaned up on exit.
 * @param {object} opts
 * @param {string} opts.pkgDir - Workspace dir (e.g. 'd_i_client' or 'd_i_admin').
 * @param {number} opts.port - Port to bind via PORT env.
 * @param {string} [opts.script='dev'] - NPM script to run (e.g. 'dev' or 'start').
 */
export async function runService({ pkgDir, port, script = 'dev' }) {
  // Try to free the port before starting
  try {
    await killPort(port);
  } catch {
    // Ignore if nothing was listening
  }

  const child = spawn('pnpm', ['-C', pkgDir, 'run', script], {
    env: { ...process.env, PORT: String(port) },
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  const shutdown = () => {
    if (!child.killed) {
      try { child.kill('SIGINT'); } catch {}
    }
  };

  // Ensure child is terminated when parent exits
  process.on('SIGINT', () => { shutdown(); process.exit(130); });
  process.on('SIGTERM', () => { shutdown(); process.exit(143); });
  process.on('exit', () => { shutdown(); });

  child.on('exit', async () => {
    // Best effort: free the port after exit
    try { await killPort(port); } catch {}
  });

  return child;
}

// Allow running via CLI: node scripts/run-service.mjs --pkgDir d_i_client --port 3000 --script dev
// Robust main-module detection for Windows paths
const isMain = (() => {
  try {
    const argv1 = process.argv[1] || '';
    return /run-service\.mjs$/i.test(argv1.replace(/\\/g, '/'));
  } catch {
    return false;
  }
})();

if (isMain) {
  const args = process.argv.slice(2);
  const get = (name, fallback) => {
    const idx = args.findIndex(a => a === `--${name}`);
    if (idx !== -1 && args[idx + 1]) return args[idx + 1];
    return fallback;
  };

  const pkgDir = get('pkgDir');
  const portStr = get('port');
  const script = get('script', 'dev');

  if (!pkgDir || !portStr) {
    console.error('Usage: node scripts/run-service.mjs --pkgDir <dir> --port <number> [--script <dev|start>]');
    process.exit(1);
  }
  const port = Number(portStr);
  if (!Number.isInteger(port) || port <= 0) {
    console.error('Invalid port:', portStr);
    process.exit(1);
  }

  (async () => {
    try {
      const child = await runService({ pkgDir, port, script });
      await new Promise((resolve) => child.on('exit', resolve));
      // Child exit will trigger our cleanup; propagate its code if needed
      process.exit(child.exitCode ?? 0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
