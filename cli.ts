#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { execSync, exec } from "child_process";

const args = process.argv.slice(2);

if (args[0] === "--v" || args[0] === "-v" || args[0] === "v") {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), 'utf8'));
    const localVersion = pkg.version.split("+")[0];
    const localNameArr = pkg.version.split("+")[1].split("-");

    const localName = localNameArr
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    console.log(`CanoeJs v${localVersion} (${localName})`);

    exec(`npm show canoejs version --json`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error checking latest version: ${stderr || error.message}`);
            return;
        }

        try {
            const latestVersion = JSON.parse(stdout);
            if (latestVersion !== localVersion) {
                console.log(`\nUpdate available: ${localVersion} → ${latestVersion}`);
                console.log(`Run \`npm install -g canoejs\` to update.`);
            } else {
                console.log("You're using the latest version.");
            }
        } catch (e) {
            console.error("Could not parse version info:", e.message);
        }
    });


} else if (args[0] === "new" && args[1]) {
    const projectName = args[1];
    const currentDir = process.cwd();
    const templateDir = path.join(__dirname, "template");
    const projectPath = path.join(currentDir, projectName);

    if (!fs.existsSync(templateDir)) {
        console.error("❌ Error: Template folder not found!");
        process.exit(1);
    }

    console.log(`🚀 Creating CanoeJs project '${projectName}'...`);

    copyFolderRecursiveSync(templateDir, projectPath);

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
    const gitignoreContent = "node_modules/\npublic/dist/\npackage-lock.json\n.env";
    fs.writeFileSync(path.join(projectPath, ".gitignore"), gitignoreContent);
    console.log("🙈 .gitignore file created!");

    // Navigate to project directory and install dependencies
    try {
        console.log("📦 Installing dependencies...");
        execSync(`cd ${projectPath} && npm install && npm i -g serve`, { stdio: "inherit" });
        console.log("✅ Dependencies installed!");
        console.log(`🎉 CanoeJs project '${projectName}' is ready to go!`);
        console.log(`👉 Run the following to start:`);
        console.log(`   cd ${projectName} && npm run watch`);
    } catch (error) {
        console.error("❌ Error installing dependencies:", error);
    }
} else {
    console.log("🔖 Usage: canoejs new [projectName]");
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
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}
