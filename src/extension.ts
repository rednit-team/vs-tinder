// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vstinder" is now active!');

	let disposable = vscode.commands.registerCommand('vstinder.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from VSTinder!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
