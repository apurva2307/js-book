import "./styles/home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
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
    <div style={{margin: "0rem 0.25rem"}}>
      <div className="my-files">
        {files.length > 0 && 
        <article className="panel is-primary">
        <p className="panel-heading" style={{opacity: "0.75"}}>
          My Files
        </p>
        {files.map((filename) => {
          return (
                  <Link to={`/editor/${filename}`} className="panel-block">
                    <span className="panel-icon">
                      <FaBook/>
                    </span>
                    {filename}
                  </Link>
          );
        })}
        </article>
        }
      </div>
    </div>
  );
};

export default Home;
