/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { Disposable } from 'vscode-jsonrpc';
export class DisposableCollection {
    disposables = [];
    dispose() {
        while (this.disposables.length !== 0) {
            this.disposables.pop().dispose();
        }
    }
    push(disposable) {
        const disposables = this.disposables;
        disposables.push(disposable);
        return {
            dispose() {
                const index = disposables.indexOf(disposable);
                if (index !== -1) {
                    disposables.splice(index, 1);
                }
            }
        };
    }
}
export { Disposable };
//# sourceMappingURL=disposable.js.map