// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { marked } from 'marked';

const getWebviewContent = (markdownMsg: any): string => {
	// return `<!DOCTYPE html>
	// <html>
	//   <head>
	// 	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css" />
	 
	
	// 	<script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0"></script>
	//   </body>
	// </html>`;
	return ` <!DOCTYPE html>
	<html>
	<head>
	<link rel="stylesheet" href="https://blog.al2p.xyz/upload/monokai-sublime.min.css" />
	<style>
    html {
		width:100vw;
		height:100vh;
        background: url('https://blog.al2p.xyz/upload/original-d65b37185f7849deeb249555b5514e7f.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .msg {
        width: 78vw;
        height: 85vh;
        border-radius: 15px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: rgba(252, 252, 252, 0.103);
        backdrop-filter: blur(10px);
        color: rgb(245, 245, 245);
        overflow: auto;
    }

    .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 22px;
        color: rgb(245, 245, 245);
    }
	.release{
		display: flex;
		justify-content: end;
		font-size: 14px;
		color: #A9AEB8;
		padding:2px;
	}

    pre {
        width: 70vw;
        background-color: rgb(31, 41, 55);
        overflow-x: auto;
        border-radius: 10px;
		padding:15px;
    }
</style>
</head>
<body>
    <div class="logo">
        <img style="width:70px;height: 60px;" src="https://blog.al2p.xyz/upload/laclogo.png" alt="">
        <div>F.R.I.D.A.Y. 原型机1-el.ser</div>
    </div>
    <div class="msg">
       ${markdownMsg}
    </div>
	<div class="release">版本号: el.ser 1.0.01</div>
	<div id="app"></div>
	<script src="https://blog.al2p.xyz/upload/highlight.min.js"></script>
</body>

</html>
	`;
};
const collectCode = () => {
	const editor: any = vscode.window.activeTextEditor;
	const document = editor.document;
	const selection = editor.selection;
	//获取选中单词文本
	const question = document.getText(selection);
	console.log(question);
	let panel: any;
	panel = vscode.window.createWebviewPanel('webview', 'juge Bling', vscode.ViewColumn.Two, {});
	axios.get('http://129.226.201.240:3000/chat', { params: { msg: `${question}` } }).then(res => {
		console.log(res);
		const markdown = marked(res.data.content);
		// 设置 Webview HTML 内容 
		console.log(markdown);
		panel.webview.html = getWebviewContent(markdown);
	}, err => {
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

	let collect = vscode.commands.registerCommand('extension.collectCode', collectCode);
	context.subscriptions.push(collect);
	
	
}
// This method is called when your extension is deactivated
export function deactivate() { }
