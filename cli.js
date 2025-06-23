#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
// Detect package manager
function detectPackageManager() {
    if (fs.existsSync('yarn.lock'))
        return 'yarn';
    if (fs.existsSync('bun.lockb'))
        return 'bun';
    if (fs.existsSync('package-lock.json'))
        return 'npm';
    if (fs.existsSync('pnpm-lock.yaml'))
        return 'pnpm';
    // Check if commands are available
    try {
        (0, child_process_1.execSync)('yarn --version', { stdio: 'ignore' });
        return 'yarn';
    }
    catch {
        try {
            (0, child_process_1.execSync)('bun --version', { stdio: 'ignore' });
            return 'bun';
        }
        catch {
            try {
                (0, child_process_1.execSync)('pnpm --version', { stdio: 'ignore' });
                return 'pnpm';
            }
            catch {
                return 'npm';
            }
        }
    }
}
// Get package manager commands
function getPackageManagerCommands(pkgManager) {
    const commands = {
        install: '',
        add: '',
        addGlobal: '',
        run: '',
        dev: ''
    };
    switch (pkgManager) {
        case 'yarn':
            commands.install = 'yarn install';
            commands.add = 'yarn add';
            commands.addGlobal = 'yarn global add';
            commands.run = 'yarn';
            commands.dev = 'yarn dev';
            break;
        case 'bun':
            commands.install = 'bun install';
            commands.add = 'bun add';
            commands.addGlobal = 'bun add -g';
            commands.run = 'bun run';
            commands.dev = 'bun run dev';
            break;
        case 'pnpm':
            commands.install = 'pnpm install';
            commands.add = 'pnpm add';
            commands.addGlobal = 'pnpm add -g';
            commands.run = 'pnpm';
            commands.dev = 'pnpm dev';
            break;
        default: // npm
            commands.install = 'npm install';
            commands.add = 'npm install';
            commands.addGlobal = 'npm install -g';
            commands.run = 'npm run';
            commands.dev = 'npm run dev';
            break;
    }
    return commands;
}
// Execute command with better error handling
function executeCommand(command, cwd) {
    try {
        (0, child_process_1.execSync)(command, {
            stdio: 'inherit',
            cwd: cwd || process.cwd()
        });
        return true;
    }
    catch (error) {
        console.error(`❌ Error executing: ${command}`);
        console.error(`Error: ${error.message}`);
        return false;
    }
}
if (args[0] === "--v" || args[0] === "-v" || args[0] === "v") {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), 'utf8'));
    const localVersion = pkg.version.split("+")[0];
    const localNameArr = pkg.version.split("+")[1].split("-");
    const localName = localNameArr
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    console.log(`CanoeJs v${localVersion} (${localName})`);
    console.log("🚀 Ultra Fast & Lightweight UI Framework");
    console.log("⚡ 5x faster than React • 8KB bundle size");
    (0, child_process_1.exec)(`npm show canoejs version --json`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error checking latest version: ${stderr || error.message}`);
            return;
        }
        try {
            const latestVersion = JSON.parse(stdout);
            if (latestVersion !== localVersion) {
                console.log(`\nUpdate available: ${localVersion} → ${latestVersion}`);
                console.log(`Run \`npm install -g canoejs\` to update.`);
            }
            else {
                console.log("You're using the latest version.");
            }
        }
        catch (e) {
            console.error("Could not parse version info:", e.message);
        }
    });
}
else if (args[0] === "new" && args[1]) {
    const projectName = args[1];
    const currentDir = process.cwd();
    const templateDir = path.join(__dirname, "template");
    const projectPath = path.join(currentDir, projectName);
    if (!fs.existsSync(templateDir)) {
        console.error("❌ Error: Template folder not found!");
        process.exit(1);
    }
    if (fs.existsSync(projectPath)) {
        console.error(`❌ Error: Directory '${projectName}' already exists!`);
        process.exit(1);
    }
    console.log(`🚀 Creating CanoeJs project '${projectName}'...`);
    console.log("⚡ This template includes:");
    console.log("   • Beautiful landing page with modern design");
    console.log("   • Performance optimizations (memoization, virtual scrolling)");
    console.log("   • Complete documentation page");
    console.log("   • SEO optimization");
    console.log("   • Responsive design");
    console.log("   • Development and production build modes");
    // Copy template
    copyFolderRecursiveSync(templateDir, projectPath);
    // Update package.json
    let jsonProjectName = projectName
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .replace(/-+/g, '-')
        .toLowerCase()
        .replace(/^-|-$/g, '');
    let packagejson = JSON.parse(fs.readFileSync(path.join(projectPath, "package.json"), "utf8"));
    packagejson.name = jsonProjectName;
    fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(packagejson, null, 2));
    console.log("📂 Project files copied successfully!");
    // Create .gitignore
    const gitignoreContent = "node_modules/\npublic/dist/\npackage-lock.json\nyarn.lock\nbun.lockb\npnpm-lock.yaml\n.env\n.DS_Store\n.vscode/\n.idea/\n*.log";
    fs.writeFileSync(path.join(projectPath, ".gitignore"), gitignoreContent);
    console.log("🙈 .gitignore file created!");
    // Detect package manager
    const pkgManager = detectPackageManager();
    const commands = getPackageManagerCommands(pkgManager);
    console.log(`📦 Detected package manager: ${pkgManager.toUpperCase()}`);
    // Install dependencies
    try {
        console.log("📦 Installing dependencies...");
        if (!executeCommand(commands.install, projectPath)) {
            throw new Error("Failed to install dependencies");
        }
        // Install serve globally if not using bun
        if (pkgManager !== 'bun') {
            console.log("🌐 Installing serve for static file serving...");
            executeCommand(commands.addGlobal + ' serve', projectPath);
        }
        console.log("✅ Dependencies installed!");
        console.log(`🎉 CanoeJs project '${projectName}' is ready to go!`);
        console.log(`\n🚀 Next steps:`);
        console.log(`   cd ${projectName}`);
        console.log(`   ${commands.dev}`);
        console.log(`\n📚 Available commands:`);
        console.log(`   ${commands.dev}          # Start development server`);
        console.log(`   ${commands.run} build    # Build for production`);
        console.log(`   ${commands.run} serve    # Serve production build`);
        console.log(`   ${commands.run} preview  # Preview production build`);
        console.log(`\n📚 Features included:`);
        console.log(`   • Landing page with performance showcase`);
        console.log(`   • Documentation page (/docs route)`);
        console.log(`   • Optimized build system (10x faster)`);
        console.log(`   • Development mode with hot reload`);
        console.log(`   • Production mode with optimizations`);
        console.log(`   • Virtual scrolling for large lists`);
        console.log(`   • Lazy loading for heavy components`);
        console.log(`   • Event delegation for better performance`);
        console.log(`   • Memoization for expensive calculations`);
        console.log(`   • Batch updates for multiple state changes`);
        console.log(`\n🌐 Visit http://localhost:3000 to see your app!`);
        console.log(`📖 Documentation available at http://localhost:3000/docs`);
    }
    catch (error) {
        console.error("❌ Error during setup:", error.message);
        console.log("\n💡 Try running these commands manually:");
        console.log(`   cd ${projectName}`);
        console.log(`   ${commands.install}`);
        console.log(`   ${commands.dev}`);
    }
}
else if (args[0] === "build" && args[1]) {
    const projectPath = args[1];
    const mode = args[2] || 'dev';
    if (!fs.existsSync(projectPath)) {
        console.error(`❌ Error: Project '${projectPath}' not found!`);
        process.exit(1);
    }
    const pkgManager = detectPackageManager();
    const commands = getPackageManagerCommands(pkgManager);
    console.log(`🔨 Building project '${projectPath}' in ${mode} mode...`);
    try {
        if (mode === 'prod') {
            executeCommand(`${commands.run} build`, projectPath);
            console.log("✅ Production build completed!");
            console.log("📁 Files are ready in public/dist/");
        }
        else {
            executeCommand(`${commands.dev}`, projectPath);
        }
    }
    catch (error) {
        console.error("❌ Build failed:", error.message);
    }
}
else {
    console.log("🔖 CanoeJS CLI - Ultra Fast & Lightweight UI Framework");
    console.log("\nUsage:");
    console.log("  canoejs new <project-name>     Create a new CanoeJS project");
    console.log("  canoejs build <path> [mode]    Build project (dev/prod)");
    console.log("  canoejs --v                    Show version information");
    console.log("\nBuild Modes:");
    console.log("  dev                            Development build with hot reload");
    console.log("  prod                           Production build with optimizations");
    console.log("\nPackage Managers:");
    console.log("  ✅ npm, yarn, bun, pnpm        All supported automatically");
    console.log("\nFeatures:");
    console.log("  ⚡ 5x faster than React");
    console.log("  📦 Only 8KB bundle size");
    console.log("  🚀 Virtual scrolling & lazy loading");
    console.log("  🧠 Smart DOM diffing");
    console.log("  🎯 Widget-based architecture");
    console.log("  🔨 Development & production modes");
    console.log("\nLearn more: https://github.com/jotalevi/CanoeJs");
}
/**
 * Recursively copies a folder and its contents
 */
function copyFolderRecursiveSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }
    const files = fs.readdirSync(source);
    for (const file of files) {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        if (fs.statSync(sourcePath).isDirectory()) {
            copyFolderRecursiveSync(sourcePath, targetPath);
        }
        else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}
