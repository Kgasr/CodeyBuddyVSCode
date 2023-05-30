"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = void 0;
const vscode = require("vscode");
const suggestCode_1 = require("./Commands/suggestCode");
const optimizeCode_1 = require("./Commands/optimizeCode");
const explainCode_1 = require("./Commands/explainCode");
const addTests_1 = require("./Commands/addTests");
const askAnything_1 = require("./Commands/askAnything");
async function activate(context) {
    let suggest = vscode.commands.registerCommand('CodeyBuddy.SuggestCode', suggestCode_1.suggestCode);
    context.subscriptions.push(suggest);
    let optimize = vscode.commands.registerCommand('CodeyBuddy.OptimizeCode', optimizeCode_1.optimizeCode);
    context.subscriptions.push(optimize);
    let explain = vscode.commands.registerCommand('CodeyBuddy.ExplainCode', explainCode_1.explainCode);
    context.subscriptions.push(explain);
    let tests = vscode.commands.registerCommand('CodeyBuddy.AddTests', addTests_1.addTests);
    context.subscriptions.push(tests);
    let ask = vscode.commands.registerCommand('CodeyBuddy.AskAnything', askAnything_1.askAnything);
    context.subscriptions.push(ask);
}
function deactivate() { }
exports.deactivate = deactivate;
module.exports = {
    activate,
    deactivate
};
//# sourceMappingURL=extension.js.map