import { Link } from "react-router-dom";
import {useState} from "react";
import jslogo from  "../../src/js.png"
import "./styles/navbar.css"
import { useHistory } from "react-router-dom";
import axios from "axios";
interface NavbarProps {
    logoutUser: () => void;
    user: { email: string; userId: string } | null;
  }
const Navbar: React.FC<NavbarProps> = ({logoutUser, user}) => {
    const [newfile, setNewfile] = useState(false);
    const [filename, setFilename] = useState("");
    const history = useHistory()
    const createNewFile = async() => {
        try {
            const token = localStorage.getItem("jsbook_token");
            await axios.post("/shells",{shells: [], name: filename},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setNewfile(false)
            history.push(`/editor/${filename}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
        <Link className="navbar-item" to="/">
        <img src={jslogo} alt="logo" width="70" height="140" />
        <span style={{ fontSize:"17px", fontWeight: "bold"}}>Book</span>
        </Link>
        
    </div>
    <div className="navbar-start">
        <div className="navbar-item">
            {user && (
            <div className="buttons">
                {!newfile &&
                <button className="button is-primary is-small is-rounded" onClick={() => setNewfile(true)}>
                    New File
                </button>}
                {newfile && <>
                <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)}/>
                <button className="button is-primary is-small is-rounded" onClick={() => createNewFile()}>
                    Create
                </button>
                </>}
            </div>
            )}
        </div>
    </div>
    <div className="navbar-end">
        {user &&    (
            <div className="navbar-item">
                <div className="user">{user.email}</div>
                <div className="buttons">
                    <button className="button is-primary is-small is-rounded" onClick={() => logoutUser()}>
                    Log Out
                    </button>
                </div>
            </div>
        )}
    </div>
    </nav>
    )
}

export default Navbar;
