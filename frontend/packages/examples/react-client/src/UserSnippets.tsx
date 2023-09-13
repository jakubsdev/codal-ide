import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UserSnippets.css";
import { useNavigate } from "react-router-dom";

const UserSnippets = (props: { user: any }) => {
  const [user, setUser] = useState(props.user);
  const [codeSnippets, setCodeSnippets] = useState([]);

  const navigate = useNavigate();

  const fetchSnippets = async () => {
    try {
      const { data }: any = await axios.get(
        `http://localhost:5000/codesnippets?googleId=${user.googleId}`
      );
      setCodeSnippets(data.codeSnippets);
    } catch (error) {
      // Handle error
      console.error("Error when fetching");
    }
  };

  useEffect(() => {
    // Fetch code snippets when the component mounts
    fetchSnippets();
  }, []);

  const deleteSnippet = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/codesnippets/${id}`
      );
      console.log(response);
      fetchSnippets();
      return response.data;
    } catch (error) {
      console.error("Error deleting code snippet:", error);
      throw error;
    }
  };

  const editSnippet = async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/codesnippets/${id}`
      );
      console.log(response.data);
      navigate("/", { state: response.data });
    } catch (error) {
      console.error("Error editing a snippet");
    }
  };

  return (
    <div className="snippet-list">
      <p>Total number of snippets: {codeSnippets.length}</p>
      <ul>
        {codeSnippets.map((snippet: any) => (
          <li className="snippet" key={snippet._id}>
            <div>
              <span>
                <p>Title:</p>
                {snippet.fileName}
              </span>
            </div>
            <div>
              <span>
                <p>Last Edited:</p>{" "}
                {new Date(snippet.lastEdited).toLocaleString("en-GB", {
                  timeZone: "Europe/London",
                })}
              </span>
            </div>
            <div>
              <button
                className="delete btn"
                onClick={() => deleteSnippet(snippet._id)}
              >
                Delete
              </button>
              <button
                className="edit btn"
                onClick={() => editSnippet(snippet._id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSnippets;
