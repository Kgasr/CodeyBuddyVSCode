import * as vscode from 'vscode';
import { Utility } from '../utility';

export async function addTests(){
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const selection = editor.selection;
        const endPosition = selection.end;
        const selectedText = editor.document.getText(selection);
        const api = new Utility();

        let output: string = '';

        //output = await api.InvokeAPI(selectedText,'suggest')

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: 'Loading...Please wait!!!!!!'
        }, async (progress) => {          
            progress.report({  increment: 0 });
            output = await api.invokeAPI(selectedText,'tests');
            const edit = new vscode.TextEdit(
                        new vscode.Range(endPosition.line, endPosition.character, endPosition.line, endPosition.character),
                        output
                );
            const editPromise = editor.edit(editBuilder => {
                        editBuilder.insert(editor.document.positionAt(editor.document.offsetAt(endPosition)), edit.newText);
                });
            return editPromise;
            progress.report({ increment: 100 });
        });          
      }
}

