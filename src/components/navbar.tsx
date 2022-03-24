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
    <nav className="navbar is-transparent" role="navigation" aria-label="dropdown navigation">
    <div className="navbar-brand">
        <Link className="navbar-item" to="/">
        <img src={jslogo} alt="logo" width="70" height="140" />
        <span style={{ fontSize:"17px", fontWeight: "bold"}}>Book</span>
        </Link>
        
    </div>
    <div className="navbar-start">
        <div className="navbar-item">
            {user && (
            <div className="buttons is-flex-direction-row is-align-items-center">
                {!newfile &&
                <button className="button is-primary is-small is-rounded" onClick={() => setNewfile(true)}>
                    New File
                </button>}
                {newfile && <>
                <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)}/>
                <button className="button is-primary is-small is-rounded" style={{marginTop: "0.5rem", marginLeft: "0.5rem"}} onClick={() => createNewFile()}>
                    {filename ? "Create" : "Cancel"}
                </button>
                </>}
            </div>
            )}
        </div>
    </div>
        {user &&    (
        <div className="navbar-end">
                <div className="navbar-item has-dropdown is-hoverable is-right">
                    <div className="user navbar-link">{user.email}</div>
                    <div className="navbar-dropdown">
                        <div className="navbar-item">
                            <button className="button is-primary is-small is-rounded" onClick={() => logoutUser()}>
                            Log Out
                            </button>
                        </div>
                    </div>
                </div>
        </div>
        )}
    </nav>
    )
}

export default Navbar;
