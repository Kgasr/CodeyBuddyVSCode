import * as vscode from 'vscode';
import { Utility } from '../utility';
import { CodeyBuddyView } from '../Forms/codeybuddyview';

let myWindow: CodeyBuddyView | undefined;

export async function explainCode(flag:boolean = false, userInput: string = ''){
    let selectedText = "";
    if (flag == true)
    {
        selectedText = userInput;     
    }
    else
    {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            selectedText = editor.document.getText(selection);
        }
    } 
        const api = new Utility();
        let output: string = '';
        //output = await api.InvokeAPI(selectedText,'suggest')

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: 'Loading...Please wait!!!!!!'
        }, async (progress) => {          
            progress.report({  increment: 0 });
            output = await api.invokeAPI(selectedText,'explain');
            if (userInput && myWindow){
                myWindow.close();
            }
            myWindow = new CodeyBuddyView(selectedText,output, 'CodeyBuddy.ExplainCode');
            myWindow.show();
            userInput = "";
        
            progress.report({ increment: 100 });
        });          
      }
