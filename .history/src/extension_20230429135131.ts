// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { marked } from 'marked';

const getWebviewContent = (markdownMsg: any): string => {
	return `
	<html>
<style>
    body {
        background: url('https://blog.al2p.xyz/upload/original-d65b37185f7849deeb249555b5514e7f.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .msg {
        width: 80vw;
        height: 85vh;
        border-radius: 15px;
        padding: 10px 20px;
        font-size: 18;
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

    pre {
        width: 75vw;
        background-color: rgb(31, 41, 55);
        overflow-x: auto;
        border-radius: 10px;
    }
</style>

<body>
    <div class="logo">
        <img style="width:70px;height: 60px;" src="https://blog.al2p.xyz/upload/laclogo.png" alt="">
        <div>F.R.I.D.A.Y. 原型机1-el.ser</div>
    </div>
    <div class="msg">
        <p>Uint8Array对象是一个8位无符号整型数组，它可以用来表示像素值数据（如图片、视频）的字节数据。通常情况下，将这些字节数据存储在Uint8Array数组中，然后使用Canvas API在页面上呈现图片或视频。
        </p>
        <p>对于图片，可以使用以下步骤处理Uint8Array对象：</p>
        <ol>
            <li>创建一个新的Image对象</li>
            <li>将Uint8Array对象作为data URI传递给Image对象的src属性</li>
            <li>等待Image对象加载完成后，在Canvas上绘制该图片</li>
        </ol>
        <p>以下是一个示例代码：</p>
        <pre><code class="language-javascript">const byteArray = new Uint8Array([...]); // 字节数组
        const dataURI = &#39;data:image/jpeg;base64,&#39; + btoa(String.fromCharCode(...byteArray)); // 转换为Data URI
        const img = new Image(); // 创建新的Image对象
        img.onload = () =&gt; {
          const canvas = document.createElement(&#39;canvas&#39;); // 创建一个新的Canvas元素
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext(&#39;2d&#39;); // 获取Canvas上下文
          ctx.drawImage(img, 0, 0); // 将图片绘制在Canvas上
          document.body.appendChild(canvas); // 添加Canvas元素到页面
        }
        img.src = dataURI; // 设置Image对象的src属性为Data URI
        </code></pre>
        <p>对于视频处理，可以使用以下步骤：</p>
        <ol>
            <li>创建一个新的Video元素</li>
            <li>将Uint8Array对象作为data URI传递给Video元素的src属性</li>
            <li>等待Video元素加载完成后，在Canvas上绘制该视频的当前帧</li>
        </ol>
        <p>以下是一个示例代码：</p>
        <pre><code class="language-javascript">const byteArray = new Uint8Array([...]); // 字节数组
        const dataURI = &#39;data:video/mp4;base64,&#39; + btoa(String.fromCharCode(...byteArray)); // 转换为Data URI
        const video = document.createElement(&#39;video&#39;); // 创建新的Video元素
        video.autoplay = true; // 设置自动播放
        video.src = dataURI; // 设置Video元素的src属性为Data URI
        video.addEventListener(&#39;play&#39;, () =&gt; {
          const canvas = document.createElement(&#39;canvas&#39;); // 创建一个新的Canvas元素
          canvas.width = video.videoWidth; // 设置Canvas的宽度和高度
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext(&#39;2d&#39;); // 获取Canvas上下文
          setInterval(() =&gt; { // 每隔一定时间绘制新帧
            ctx.drawImage(video, 0, 0);
          }, 1000 / 30);
          document.body.appendChild(canvas); // 添加Canvas元素到页面
        });
        </code></pre>
    </div>
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
