import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [files, setFiles] = useState([]);
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("jsbook_token");
      if (token) {
        const { data } = await axios.get("/shells", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(
          // @ts-ignore
          data.shells.map((file) => {
            return file.name;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container is-fluid">
      <div>
        {files.map((filename) => {
          return (
            <h3 key={filename}>
              <Link to={`/editor/${filename}`}>{filename}</Link>
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
