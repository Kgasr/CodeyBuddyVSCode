"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainCode = void 0;
const vscode = require("vscode");
const utility_1 = require("../utility");
const codeybuddyview_1 = require("../Forms/codeybuddyview");
let myWindow;
async function explainCode(userInput) {
    let selectedText = "";
    if (userInput === "" || !userInput) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const endPosition = selection.end;
            selectedText = editor.document.getText(selection);
        }
    }
    else {
        selectedText = userInput;
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
        myWindow = new codeybuddyview_1.CodeyBuddyView(selectedText, output);
        myWindow.show();
        userInput = "";
        progress.report({ increment: 100 });
    });
}
exports.explainCode = explainCode;
//# sourceMappingURL=explainCode%20copy.js.map