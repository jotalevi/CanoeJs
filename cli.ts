#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const args = process.argv.slice(2);

if (args[0] === "new" && args[1]) {
    const projectName = args[1];
    const currentDir = process.cwd();
    const templateDir = path.join(__dirname, "template");
    const projectPath = path.join(currentDir, projectName);

    if (!fs.existsSync(templateDir)) {
        console.error("❌ Error: Template folder not found!");
        process.exit(1);
    }

    // Copy template directory
    copyFolderRecursiveSync(templateDir, projectPath);
    fs.writeFileSync(path.join(projectPath, ".gitignore"), "node_modules\ndist\n.env\npackage-lock.json\n");
    console.log(`✅ CanoeJs project '${projectName}' created successfully!`);
    console.log(`👉 Run the following to start:`);
    console.log(`   cd ${projectName} && npm install && npm run start`);
} else {
    console.log("Usage: canoeJs new [projectName]");
}

/**
 * Recursively copies a folder and its contents
 */
function copyFolderRecursiveSync(source: string, target: string) {
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
