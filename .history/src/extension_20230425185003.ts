// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "juge-bling" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('juge-bling.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from juge-Bling!');
	});
	context.subscriptions.push(disposable);
	// const editor = vscode.window.activeTextEditor;
	context.subscriptions.push(vscode.commands.registerCommand('demo'),()=>{
		const editor:any = vscode.window.activeTextEditor;
	const document = editor.document;
    const selection = editor.selection; 
    //获取选中单词文本
    const word = document.getText(selection);
	vscode.window.showInformationMessage(word);
	console.log('1231313123');
	console.log(word);
	});
}
// This method is called when your extension is deactivated
export function deactivate() {}
