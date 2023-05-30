import * as vscode from 'vscode';


export class CodeyBuddyView {
  private readonly panel: vscode.WebviewPanel;
  //public onApplyChanges: ((updatedText: string) => void) | undefined;

  constructor(userInput: string, response: string, cmd: string) {
      this.panel = vscode.window.createWebviewPanel(
          'codeyBuddyView',
          'Codey Buddy View',
          vscode.ViewColumn.One,
          {
                enableScripts: true,
          }
      );
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
            vscode.commands.executeCommand(cmd,true, message.text);
            //this.onApplyChanges();
          //}
        } else if (message.command === 'closePanel') {
          this.close();
        }
        //else if (message.command === 'panelReady') {
        //this.update(userInput, response);
      //}
      });
    }
  public show(): void {
      this.panel.reveal();
  }
  public close(): void {
    this.panel.dispose();
}
/*
  public update(userInput: string, response: string): void {
    const script = `
      (function() {
        const userInputTextArea = document.getElementById('userInput');
        const responseTextArea = document.getElementById('response');
        if (userInputTextArea) {
          userInputTextArea.textContent = '${userInput}';
        }
        if (responseTextArea) {
          responseTextArea.textContent = '${response}';
        }
      })();
    `;
    this.panel.webview.postMessage({ command: 'update', script });
  }*/
}
