// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
const marked = require('marked');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
const collectCode = ()=>{
	const editor:any = vscode.window.activeTextEditor;
	const document = editor.document;
    const selection = editor.selection; 
    //获取选中单词文本
    const word = document.getText(selection);
	console.log(word);
	let panel:any;
	// vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://www.baidu.com'));
	axios.get('http://129.226.201.240:3000/chat',{params:{msg:`${word}`}}).then(res=>{
		console.log(res);
		// vscode.window.showInformationMessage(res.data.content);
		panel = vscode.window.createWebviewPanel( 'webview', 'My Webview', vscode.ViewColumn.One, { enableScripts: true } ); 
	// 设置 Webview HTML 内容 
	panel.webview.html = ` <html> <body> <div>${res.data.content}</div> </body> </html> `;
	},err=>{
		console.log(err);
	});
};
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
		vscode.window.showInformationMessage('H!');
		console.log('run there');
	});
	context.subscriptions.push(disposable);

	let collect = vscode.commands.registerCommand('extension.collectCode',collectCode);
	context.subscriptions.push(collect);
}
// This method is called when your extension is deactivated
export function deactivate() {}
