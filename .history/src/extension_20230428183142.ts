// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { marked } from 'marked';

const getWebviewContent = (markdownMsg: any): string => {
	return `<html>
				<body>
				<div>${markdownMsg}</div> 
				<div class="chat">
  <div class="chat-title">
    <h1>Fabio Ottaviani</h1>
    <h2>Supah</h2>
    <figure class="avatar">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>
  </div>
  <div class="messages">
    <div class="messages-content"></div>
  </div>
  <div class="message-box">
    <textarea type="text" class="message-input" placeholder="Type message..."></textarea>
    <button type="submit" class="message-submit">Send</button>
  </div>

</div>
<div class="bg"></div>s
				</body>
			</html>`;
};
const collectCode = () => {
	const editor: any = vscode.window.activeTextEditor;
	const document = editor.document;
	const selection = editor.selection;
	//获取选中单词文本
	const word = document.getText(selection);
	console.log(word);
	let panel: any;
	panel = vscode.window.createWebviewPanel('webview', 'juge Bling', vscode.ViewColumn.Two, {});
	axios.get('http://129.226.201.240:3000/chat', { params: { msg: `${word}` } }).then(res => {
		console.log(res);
		const markdown = marked(res.data.content);
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
