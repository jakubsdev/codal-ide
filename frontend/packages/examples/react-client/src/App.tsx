import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultCode from "./defaultCode.js";
import MonacoEditor from "./MonacoEditor.jsx";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";

const App = () => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [user, setUser] = useState<any>(null);
  const [codeSnippet, setCodeSnippet] = useState<any>({ code: defaultCode });

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/userdata", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (state) {
      setCodeSnippet(state);
      setCode(codeSnippet.code);
    }
  }, [state]);

  const onCodeSubmit = async () => {
    const payload = {
      language: "cpp",
      code,
    };
    try {
      setJobId("");
      setStatus("");
      setOutput("");

      const { data } = await axios.post(
        "http://localhost:5000/compile",
        payload
      );
      setJobId(data.jobId);
      console.log(jobId);
      let intervalId: number | undefined;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://localhost:5000/status",
          { params: { id: data.jobId } }
        );

        const { success, job, error } = dataRes;

        if (success) {
          const { status: jobStatus, output: jobOutput } = job;

          setStatus(jobStatus.toLowerCase());
          if (jobStatus === "Compilation in progress..") return;
          if (jobStatus === "Compilation failed") {
            const console = document.querySelector(".console");
            const consoleOutput = document.querySelector(".console-output");
            console!.classList.toggle("expanded");
            consoleOutput!.classList.toggle("hidden");
          }
          if (jobStatus === "Compilation successful") {
            try {
              const response = await axios.get(
                "http://localhost:5000/download",
                {
                  params: { path: job.filePath },
                  responseType: "blob",
                }
              );
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "MICROBIT.hex");
              document.body.appendChild(link);
              link.click();
            } catch (error) {
              console.error("Error downloading file:", error);
            }
          }

          setOutput(jobOutput);
          clearInterval(intervalId);
        } else {
          setStatus("Couldn't find job, try again");

          setOutput(error);
        }
      }, 1000);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onCodeSave = async () => {
    const newName =
      codeSnippet.fileName === undefined
        ? prompt("Filename: ")
        : codeSnippet.fileName;

    try {
      const { data } = await axios.post("http://localhost:5000/save", {
        ...codeSnippet,
        user: user.googleId,
        fileName: newName,
        code: code,
      });

      console.log(data);
      setCodeSnippet(data);
    } catch (error) {}
  };

  const onCodeCreate = () => {
    const updatedLocation = { ...location, state: null };
    navigate(updatedLocation);
    setCodeSnippet({ code: defaultCode, user: user.googleId });
    console.log(codeSnippet);
    setOutput("");
    setStatus("");
  };

  const onConsoleExpand = () => {
    const console = document.querySelector(".console");
    const consoleOutput = document.querySelector(".console-output");
    console!.classList.toggle("expanded");
    consoleOutput!.classList.toggle("hidden");
  };

  return (
    <div className="app">
      <Navbar user={user} />
      <Sidebar>
        <button className="btn margin-btn" onClick={onCodeSubmit}>
          Compile
        </button>
        {user ? (
          <>
            <button className="btn margin-btn" onClick={onCodeSave}>
              Save
            </button>
            <button className="btn margin-btn" onClick={onCodeCreate}>
              New
            </button>
            {codeSnippet.fileName != null && (
              <>
                <p className="editing-text">Now editing:</p>
                {codeSnippet.fileName}
              </>
            )}
          </>
        ) : null}
      </Sidebar>
      <MonacoEditor
        sendCode={setCode}
        fetchCode={codeSnippet}
        filePath="file:///app/codal/source/main.cpp"
      />
      <div className="console">
        <div className="console-bar" onClick={onConsoleExpand}>
          {status === "" ? <p>Console</p> : <p>Console: {status}</p>}
          <p>⇅</p>
        </div>
        <pre className="console-output hidden">{output}</pre>
      </div>
    </div>
  );
};

export default App;
