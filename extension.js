const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.cycleThemes', function () {
        vscode.workspace.getConfiguration('workbench').get('colorTheme').then(currentTheme => {
            vscode.extensions.all.filter(extension => extension.extensionKind === vscode.ExtensionKind.UI).forEach(extension => {
                if (extension.packageJSON.contributes && extension.packageJSON.contributes.themes) {
                    extension.packageJSON.contributes.themes.forEach(theme => {
                        if (theme.label === currentTheme) {
                            let nextThemeIndex = (extension.packageJSON.contributes.themes.indexOf(theme) + 1) % extension.packageJSON.contributes.themes.length;
                            let nextTheme = extension.packageJSON.contributes.themes[nextThemeIndex];
                            vscode.workspace.getConfiguration('workbench').update('colorTheme', nextTheme.label, true);
                        }
                    });
                }
            });
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}
