import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class SidebarProvider {

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content=" img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource
      }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
			</head>
      <body>
        <h1>Please provide an auth token to continue</h1>
        <br>
				<input id="token" type="text" placeholder="X-Auth-Token">
        <br>
        <button type="button">Continue</button>
			</body>
			</html>`;
  }
}
