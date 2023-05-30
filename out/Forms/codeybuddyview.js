"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeyBuddyView = void 0;
const vscode = require("vscode");
class CodeyBuddyView {
    //public onApplyChanges: ((updatedText: string) => void) | undefined;
    constructor(userInput, response, cmd) {
        this.panel = vscode.window.createWebviewPanel('codeyBuddyView', 'Codey Buddy View', vscode.ViewColumn.One, {
            enableScripts: true,
        });
        //this.onApplyChanges = undefined;
        this.panel.webview.html = `
          <html>
              <body>
                  <h1>CodeyBuddy View</h1>
                  <table>
                      <tr><label>User Input:</label></tr></br></br>
                      <tr><textarea style="width: 90%; height: 150px; overflow: auto;" id="userInput" name="userInput">${userInput}</textarea></tr></br></br>
                      <tr><label>Response:</label></tr></br></br>
                      <tr><textarea style="width: 90%; height: 150px; overflow: auto;" id="response" name="response">${response}</textarea></tr></br></br>
                      <tr>
                        <td>
                            <button id="btnAsk">Ask</button>
                        </td>
                        <td>
                            <button id="btnClose">Close</button>
                        </td>
                      </tr>
                  </table>
                  <script>
                      const vscode = acquireVsCodeApi();
                      const btnAsk = document.getElementById('btnAsk');
                      const btnClose = document.getElementById('btnClose');
                      const userInput = document.getElementById('userInput');
                      const response = document.getElementById('response');
                      btnAsk.addEventListener('click', () => {
                          vscode.postMessage({
                              command: 'askPrompt',
                              text: userInput.value
                          });
                      });
                      btnClose.addEventListener('click', () => {
                        vscode.postMessage({
                          command: 'closePanel'
                        });
                      });
                      <!--vscode.postMessage({ command: 'panelReady' });-->
                  </script>
              </body>
          </html>
      `;
        this.panel.webview.onDidReceiveMessage((message) => {
            if (message.command === 'askPrompt') {
                //if (this.onApplyChanges) {
                vscode.commands.executeCommand(cmd, true, message.text);
                //this.onApplyChanges();
                //}
            }
            else if (message.command === 'closePanel') {
                this.close();
            }
            //else if (message.command === 'panelReady') {
            //this.update(userInput, response);
            //}
        });
    }
    show() {
        this.panel.reveal();
    }
    close() {
        this.panel.dispose();
    }
}
exports.CodeyBuddyView = CodeyBuddyView;
//# sourceMappingURL=codeybuddyview.js.map