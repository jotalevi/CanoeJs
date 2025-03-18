#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
var args = process.argv.slice(2);
if (args[0] === "new" && args[1]) {
    var projectName = args[1];
    var currentDir = process.cwd();
    var templateDir = path.join(__dirname, "template");
    var projectPath = path.join(currentDir, projectName);
    if (!fs.existsSync(templateDir)) {
        console.error("❌ Error: Template folder not found!");
        process.exit(1);
    }
    console.log("\uD83D\uDE80 Creating CanoeJs project '".concat(projectName, "'..."));
    copyFolderRecursiveSync(templateDir, projectPath);
    var jsonProjectName = projectName
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .replace(/-+/g, '-')
        .toLowerCase()
        .replace(/^-|-$/g, '');
    var packagejson = JSON.parse(fs.readFileSync(path.join(projectPath, "package.json"), "utf8"));
    packagejson.name = jsonProjectName;
    fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(packagejson, null, 2));
    console.log("📂 Project files copied successfully!");
    // Create .gitignore
    var gitignoreContent = "node_modules\ndist\n.env\npackage-lock.json\n";
    fs.writeFileSync(path.join(projectPath, ".gitignore"), gitignoreContent);
    console.log("🙈 .gitignore file created!");
    // Navigate to project directory and install dependencies
    try {
        console.log("📦 Installing dependencies...");
        (0, child_process_1.execSync)("cd ".concat(projectPath, " && npm install"), { stdio: "inherit" });
        console.log("✅ Dependencies installed!");
        console.log("\uD83C\uDF89 CanoeJs project '".concat(projectName, "' is ready to go!"));
        console.log("\uD83D\uDC49 Run the following to start:");
        console.log("   cd ".concat(projectName, " && npm run watch"));
    }
    catch (error) {
        console.error("❌ Error installing dependencies:", error);
    }
}
else {
    console.log("🔖 Usage: canoejs new [projectName]");
}
/**
 * Recursively copies a folder and its contents
 */
function copyFolderRecursiveSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }
    var files = fs.readdirSync(source);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var sourcePath = path.join(source, file);
        var targetPath = path.join(target, file);
        if (fs.statSync(sourcePath).isDirectory()) {
            copyFolderRecursiveSync(sourcePath, targetPath);
        }
        else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}
