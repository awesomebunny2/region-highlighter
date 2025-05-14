// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let regionStyle;
let endRegionStyle;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const config = vscode.workspace.getConfiguration('regionHighlighter');

	const regionBackground = config.get('regionBackground', '#80008059');
	const regionForeground = config.get('regionForeground', '#f0e6ff');
	const endRegionBackground = config.get('endRegionBackground', '#0080804C');
	const endRegionForeground = config.get('endRegionForeground', '#e6fffa');
	const wholeLineBool = config.get('wholeLine', true);
	const customFontWeight = config.get('fontWeight', 'bold');
	const customFontStyle = config.get('fontStyle', 'italic');

	// Define the decoration type for highlighting lines
	regionStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: regionBackground,
		color: regionForeground,
		// color: '#ffffcc',
		isWholeLine: wholeLineBool,
		fontWeight: customFontWeight,
		fontStyle: customFontStyle,
	});

	endRegionStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: endRegionBackground,
		// color: '#fff5e6',
		color: endRegionForeground,
		isWholeLine: wholeLineBool,
		fontWeight: customFontWeight,
		fontStyle: customFontStyle,
	});

	function updateRegionHighlights(editor) {
		if (!editor) return;

		const text = editor.document.getText();
		const regionRegEx = /^\s*(\/\/\s*)?#region\b.*$/i;
		const endRegionRegEx = /^\s*(\/\/\s*)?#endregion\b.*$/i;
		const lines = text.split('\n');
		const regionRanges = [];
		const endRegionRanges = [];


		lines.forEach((line, index) => {
			const startPos = new vscode.Position(index, 0);
			const endPos = new vscode.Position(index, 80);
			const range = new vscode.Range(startPos, endPos);
			if (regionRegEx.test(line)) {
				regionRanges.push({ range });
			} else if (endRegionRegEx.test(line)) {
				endRegionRanges.push({ range });
			};
		});

		editor.setDecorations(regionStyle, []);
		editor.setDecorations(endRegionStyle, []);
		editor.setDecorations(regionStyle, regionRanges);
		editor.setDecorations(endRegionStyle, endRegionRanges);
		
	}

	// Run once on startup
	if (vscode.window.activeTextEditor) {
		// vscode.window.showInformationMessage('Region Highlighter: Run on Startup')
		updateRegionHighlights(vscode.window.activeTextEditor);
	}

	// Trigger on editor change
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			// vscode.window.showInformationMessage('Region Highlighter: Active Text Editor Changed')
			if (editor) updateRegionHighlights(editor);
		})
	);

	// Trigger on text edit
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => {
			// vscode.window.showInformationMessage('Region Highlighter: Text Document Changed')
			const editor = vscode.window.activeTextEditor;
			if (editor && e.document === editor.document) {
				updateRegionHighlights(editor);
			}
		})
	);

	// Optional: when file is first opened (e.g. from tab history)
	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(doc => {
			// vscode.window.showInformationMessage('Region Highlighter: On Open Document')
			const editor = vscode.window.visibleTextEditors.find(e => e.document === doc);
			if (editor) updateRegionHighlights(editor);
		})
	);

};

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
