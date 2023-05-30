"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeCode = void 0;
const vscode = require("vscode");
const utility_1 = require("../utility");
const optimizecodeview_1 = require("../Forms/optimizecodeview");
let win;
let selectedText;
let selection;
let output;
let range;
let editor;
// Declare a variable to store the editor for later use
let storedEditor;
async function optimizeCode(flag = false, message = "", btnCommand = "") {
    editor = vscode.window.activeTextEditor;
    if (editor) {
        selection = editor.selection;
        const startPosition = selection.start;
        const endPosition = selection.end;
        selectedText = editor.document.getText(selection);
        range = new vscode.Range(startPosition.line, startPosition.character, endPosition.line, endPosition.character);
        // Store the current editor for later use
        storedEditor = editor;
    }
    // selectedText = editor?.document.getText(editor?.selection).toString() || "";
    if (flag == true && message != "") {
        if (btnCommand == "reeval") {
            selectedText = message;
            output = '';
        }
        else if (btnCommand == "apply") {
            output = message;
            selectedText = '';
        }
    }
    if (selectedText && btnCommand != "apply") {
        const api = new utility_1.Utility();
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: "Loading...Please wait!!!!!!",
        }, async (progress) => {
            progress.report({ increment: 0 });
            output = await api.invokeAPI(selectedText, "optimize") || "";
            if (message && win) {
                win.close();
            }
            win = new optimizecodeview_1.OptimizeCodeView(selectedText, output);
            win.show();
            message = "";
            /*
          const editPromise = editor.edit(editBuilder => {
            editBuilder.replace(selection, output);
          });
          return editPromise;*/
            progress.report({ increment: 100 });
            //myWindow.show();
        });
    }
    else if (selectedText == '' && btnCommand == "apply" && storedEditor) {
        const document = storedEditor.document;
        await vscode.window.showTextDocument(document);
        const editPromise = vscode.window.activeTextEditor?.edit((editBuilder) => {
            editBuilder.replace(range, output);
        });
        if (win) {
            win.close();
        }
        if (editPromise) {
            await editPromise;
            await vscode.commands.executeCommand("editor.action.formatDocument");
        }
        return editPromise;
    }
}
exports.optimizeCode = optimizeCode;
//# sourceMappingURL=optimizeCode.js.map