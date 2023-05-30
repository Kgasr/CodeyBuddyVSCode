"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizeCodeView = void 0;
const vscode = require("vscode");
class OptimizeCodeView {
    constructor(userInput, optimizedInput) {
        this.panel = vscode.window.createWebviewPanel('optimizeCodeView', 'Optimize Code View', vscode.ViewColumn.One, {
            enableScripts: true,
        });
        this.onApplyChanges = undefined;
        this.panel.webview.html = `
          <html>
              <body>
                  <h1>CodeyBuddy View</h1>
                  <table>
                      <tr><label>User Input:</label></tr></br></br>
                      <tr><textarea style="width: 90%; height: 150px; overflow: auto;" id="userInput" name="userInput">${userInput}</textarea></tr></br></br>
                      <tr><label>Optimized Input:</label></tr></br></br>
                      <tr><textarea style="width: 90%; height: 150px; overflow: auto;" id="optimizedInput" name="optimizedInput">${optimizedInput}</textarea></tr></br></br>
                      <tr>
                        <td>
                            <button id="btnApply">Apply</button>
                        </td>
                        <td>
                            <button id="btnReevaluate">Reevaluate</button>
                        </td>
                      </tr>
                  </table>
                  <script>
                      const vscode = acquireVsCodeApi();
                      const btnApply = document.getElementById('btnApply');
                      const btnReevaluate = document.getElementById('btnReevaluate');
                      const userInput = document.getElementById('userInput');
                      const optimizedInput = document.getElementById('optimizedInput');
                      btnApply.addEventListener('click', () => {
                          vscode.postMessage({
                              command: 'applyChanges',
                              text: optimizedInput.value
                          });
                      });
                      btnReevaluate.addEventListener('click', () => {
                        vscode.postMessage({
                            command: 'askPrompt',
                            text: userInput.value
                        });
                    });
                  </script>
              </body>
          </html>
      `;
        this.panel.webview.onDidReceiveMessage((message) => {
            /*if (message.command === 'applyChanges') {
                if (this.onApplyChanges) {
                    this.onApplyChanges(message.text);
                }
            }*/
            if (message.command === 'askPrompt') {
                //if (this.onApplyChanges) {
                vscode.commands.executeCommand('CodeyBuddy.OptimizeCode', true, message.text, 'reeval');
                //this.onApplyChanges();
                //}
            }
            if (message.command === 'applyChanges') {
                //if (this.onApplyChanges) {
                vscode.commands.executeCommand('CodeyBuddy.OptimizeCode', true, message.text, 'apply');
                //this.onApplyChanges();
                //}
            }
        });
    }
    show() {
        this.panel.reveal();
    }
    close() {
        this.panel.dispose();
    }
}
exports.OptimizeCodeView = OptimizeCodeView;
//# sourceMappingURL=optimizecodeview.js.map