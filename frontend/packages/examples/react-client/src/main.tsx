/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "profile",
        element: <ProtectedRoute />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    //<GoogleOAuthProvider clientId="249250011565-gk7mdn2j4n1pv0c2ccgam7r0dbvl8usd.apps.googleusercontent.com">
    <RouterProvider router={router} />

    //</GoogleOAuthProvider>
);
