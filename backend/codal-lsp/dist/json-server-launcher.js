/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
// import { resolve } from "path";
import { WebSocketMessageReader, WebSocketMessageWriter, } from "vscode-ws-jsonrpc";
import { createConnection, createServerProcess, forward, } from "vscode-ws-jsonrpc/server";
// import { start } from "./json-server.js";
import { Message, InitializeRequest, } from "vscode-languageserver";
// import { getLocalDirectory } from "./fs-utils.js";
export function launch(socket) {
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);
    // const asExternalProccess =
    //     process.argv.findIndex((value) => value === "--external") !== -1;
    // start the language server as an external process
    // const extJsonServerPath = resolve(
    //     getLocalDirectory(),
    //     "../dist/ext-json-server.js"
    // );
    const socketConnection = createConnection(reader, writer, () => socket.dispose());
    const serverConnection = createServerProcess("CPP", "clangd", [
        "--query-driver=/usr/bin/arm-none-eabi-g*",
        "--background-index",
        "--enable-config",
    ]);
    if (serverConnection) {
        forward(socketConnection, serverConnection, (message) => {
            if (Message.isRequest(message)) {
                if (message.method === InitializeRequest.type.method) {
                    const initializeParams = message.params;
                    initializeParams.processId = process.pid;
                }
            }
            return message;
        });
    }
}
//# sourceMappingURL=json-server-launcher.js.map