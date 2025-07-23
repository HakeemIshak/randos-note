import * as vscode from 'vscode';
import { homedir as osHomeDir } from 'os';
import { join as pJoin } from 'path'
import { existsSync } from 'fs';

const ACTION = {
	CREATE: "Create note",
	PICK: "Choose new path",
	CANCEL: 'Cancel'
} as const

const CONFIG_KEY = {
	FILEPATH: 'filePath'
}

type Action = typeof ACTION[keyof typeof ACTION];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// This line of code will only be executed once when your extension is activated
	console.log('RandosNote extension loaded & activated!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('randosNote.open', async () => {
		const config = vscode.workspace.getConfiguration('randosNote');
		const rawPath = config.get<string>(CONFIG_KEY.FILEPATH) ?? 'Documents/randos.txt';
		const absPath = expandTitle(rawPath);
		const uri = vscode.Uri.file(absPath)

		// Ensure file exists or prompt for creation
		if (!(existsSync(uri.path))) {
			const action = await vscode.window.showInformationMessage<Action>(
				`Randos note file not found at :\n ${absPath}`,
				'Create note',
				'Choose new path',
				'Cancel'
			);

			switch (action) {
				case ACTION.CREATE:
					await createNote(uri);
					await openNote(uri);
					break;

				case ACTION.PICK:
					const picked = await vscode.window.showSaveDialog({
						defaultUri: vscode.Uri.file(pJoin(osHomeDir(), 'Documents', 'randos.txt')),
						filters: {
							Text: ['txt', 'md']
						}
					});
					if (!picked) return

					await createNote(picked)
					await config.update(CONFIG_KEY.FILEPATH, picked.fsPath, vscode.ConfigurationTarget.Global)
					await openNote(picked)
					break;

				case ACTION.CANCEL:
				case undefined:
					// user dimissed or cancelled
					return;
				default: {
					const _exhaustive: never = action
					return _exhaustive;
				}
			}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

/* ---------------- helpers ---------------- */
function headerText(): string {
	return `# Randos Note\n\nCreated At: ${new Date().toISOString()}\n\n----------------------------------------\n`
}

function expandTitle(p: string): string {
	return p.startsWith('~') ? pJoin(osHomeDir(), p.slice()) : p;
}

async function createNote(uri: vscode.Uri): Promise<void> {
	const initial = new TextEncoder().encode(headerText());
	await vscode.workspace.fs.writeFile(uri, initial)
}

async function openNote(uri: vscode.Uri): Promise<void> {
	const doc = await vscode.workspace.openTextDocument(uri);
	await vscode.window.showTextDocument(doc, { preview: false })
}