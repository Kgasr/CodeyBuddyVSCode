import * as vscode from 'vscode';
import { suggestCode } from './Commands/suggestCode';
import { optimizeCode } from './Commands/optimizeCode';
import { explainCode } from './Commands/explainCode';
import { addTests } from './Commands/addTests';
import { askAnything } from './Commands/askAnything';

async function activate(context: vscode.ExtensionContext) {
  let suggest = vscode.commands.registerCommand('CodeyBuddy.SuggestCode', suggestCode);
  context.subscriptions.push(suggest);

  let optimize = vscode.commands.registerCommand('CodeyBuddy.OptimizeCode', optimizeCode);
  context.subscriptions.push(optimize);

  let explain = vscode.commands.registerCommand('CodeyBuddy.ExplainCode', explainCode)
  context.subscriptions.push(explain);

  let tests = vscode.commands.registerCommand('CodeyBuddy.AddTests', addTests);
  context.subscriptions.push(tests);

  let ask = vscode.commands.registerCommand('CodeyBuddy.AskAnything', askAnything);
  context.subscriptions.push(ask);
}

export function deactivate() {}
module.exports = {
	activate,
	deactivate
}