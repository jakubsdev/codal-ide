/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import React, { useEffect, useState } from "react";

import * as monaco from "monaco-editor";
import Editor, { loader } from "@monaco-editor/react";

import initialCode from "./defaultCode.js";
import darkTheme from "./theme.json";
import "./MonacoEditor.css";

// import "monaco-editor/esm/vs/editor/editor.all.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/quickInput/standaloneQuickInputService.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js";
// import "monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js";

import {
  CloseAction,
  ErrorAction,
  MonacoLanguageClient,
  MonacoServices,
} from "monaco-languageclient";
import normalizeUrl from "normalize-url";
import {
  WebSocketMessageReader,
  WebSocketMessageWriter,
  toSocket,
} from "vscode-ws-jsonrpc";
import { buildWorkerDefinition } from "monaco-editor-workers";

buildWorkerDefinition("dist", new URL("", window.location.href).href, false);

loader.config({ monaco });

export function createUrl(hostname, port, path) {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return normalizeUrl(`${protocol}://${hostname}:${port}${path}`);
}

function createLanguageClient(transports) {
  return new MonacoLanguageClient({
    name: "CODAL Language Client",
    clientOptions: {
      // Use a language ID as a document selector
      documentSelector: ["cpp"],
      // Disable default error handler
      errorHandler: {
        error: () => ({ action: ErrorAction.Continue }),
        closed: () => ({ action: CloseAction.DoNotRestart }),
      },
    },
    // Create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: () => {
        return Promise.resolve(transports);
      },
    },
  });
}

function createWebSocket(url) {
  const webSocket = new WebSocket(url);
  webSocket.onopen = () => {
    const socket = toSocket(webSocket);
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);
    const languageClient = createLanguageClient({
      reader,
      writer,
    });
    languageClient.start();
    reader.onClose(() => languageClient.stop());
  };
}

const MonacoEditor = ({ filePath, sendCode, fetchCode }) => {
  const hostname = "localhost";
  const urlPath = "/codalServer";
  const port = "4000";
  const [code, setCode] = useState("");
  const editorCustomOptions = {
    glyphMargin: false,
    lightbulb: {
      enabled: true,
    },
    contextmenu: false,
    automaticLayout: true,
    "semanticHighlighting.enabled": true,
    links: {
      validate: false,
    },
  };

  const onMount = (editor, monacoInstance) => {
    monacoInstance.languages.register({
      id: "cpp",
      extensions: [".cpp"],
      aliases: ["CPP", "cpp", "C++"],
      mimetypes: ["text/x-c++src"],
    });

    monacoInstance.editor.defineTheme("onedark", darkTheme);
    monacoInstance.editor.setTheme("onedark");

    editor.updateOptions(editorCustomOptions);
    MonacoServices.install();
  };

  useEffect(() => {
    const url = createUrl(hostname, port, urlPath);
    createWebSocket(url);
  }, []);

  useEffect(() => {
    setCode(fetchCode.code);
  }, [fetchCode]);

  return (
    <div className="editor">
      <Editor
        path={filePath}
        value={code}
        onChange={(newCode) => {
          if (newCode) {
            sendCode(newCode);
            setCode(newCode);
          }
        }}
        keepCurrentModel={true}
        defaultLanguage="cpp"
        onMount={onMount}
      />
    </div>
  );
};

export default MonacoEditor;
