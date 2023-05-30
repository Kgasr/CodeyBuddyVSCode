"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainCode = void 0;
const vscode = require("vscode");
const utility_1 = require("../utility");
const codeybuddyview_1 = require("../Forms/codeybuddyview");
let myWindow;
async function explainCode(flag = false, userInput = '') {
    let selectedText = "";
    if (flag == true) {
        selectedText = userInput;
    }
    else {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            selectedText = editor.document.getText(selection);
        }
    }
    const api = new utility_1.Utility();
    let output = '';
    //output = await api.InvokeAPI(selectedText,'suggest')
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Loading...Please wait!!!!!!'
    }, async (progress) => {
        progress.report({ increment: 0 });
        output = await api.invokeAPI(selectedText, 'explain');
        if (userInput && myWindow) {
            myWindow.close();
        }
        myWindow = new codeybuddyview_1.CodeyBuddyView(selectedText, output, 'CodeyBuddy.ExplainCode');
        myWindow.show();
        userInput = "";
        progress.report({ increment: 100 });
    });
}
exports.explainCode = explainCode;
//# sourceMappingURL=explainCode.js.map