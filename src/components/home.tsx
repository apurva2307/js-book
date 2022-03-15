import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../baseUrl";
interface HomeProps {
  user: { email: string; userId: string } | null;
}
const Home: React.FC<HomeProps> = ({ user }) => {
  const [files, setFiles] = useState([]);
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(`${baseUrl}/shells`, {
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
    <div>
      <div>
        {files.map((filename) => {
          return (
            <h3>
              <Link to={`/editor/${filename}`}>{filename}</Link>
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
