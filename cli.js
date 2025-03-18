#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
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
    // Copy template directory
    copyFolderRecursiveSync(templateDir, projectPath);
    console.log("\u2705 CanoeJs project '".concat(projectName, "' created successfully!"));
    console.log("\uD83D\uDC49 Run the following to start:");
    console.log("   cd ".concat(projectName, " && npm install && npm run start"));
}
else {
    console.log("Usage: canoeJs new [projectName]");
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
