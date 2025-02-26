import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation, Route, Link, Switch } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Download from "./components/Download";
import Seo from "./components/Seo";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  app: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    margin: "0 auto",
  },
  title: {
    color: "red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  Button: {
    marginTop: "8px",
    backgroundColor: "#2E5C84",
    color: "#fff",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#2E5C84",
    },
  },
  affliate: {
    cursor: "pointer",
    padding: "7px",
    color: "blue",
    marginTop: "14px",
    border: "1px solid #eee",
    textDecoration: "none",
  },
}));
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function App() {
  const classes = useStyles();
  let history = useHistory();
  const parsedUrl = new URL(window.location);
  let query = useQuery();
  // states
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // effect
  useEffect(() => {
    if (parsedUrl.searchParams.get("text") != null) {
      setUrl(parsedUrl.searchParams.get("text"));
    }
    if (window.location.pathname === "/") {
      setUrl("");
    } else {
      setUrl(query.get("url"));
      if (parsedUrl.searchParams.get("text") != null) {
        setUrl(parsedUrl.searchParams.get("text"));
      }
    }
  }, [window.location.pathname]);
  // function
  const handleSubmit = () => {
    if (url === "" || !url.includes("https") || !url.includes("yout")) {
      alert("Please enter a Youtube URL...");
    } else {
      if (url.includes("www")) {
        history.push(`/download?url=${url.replace("www.", "")}`);
      } else {
        history.push(`/download?url=${url}`);
      }
      setLoading(true);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className={classes.app} noValidate>
      <div className={classes.title} onClick={() => history.push("/")}>
        {/* <YouTubeIcon style={{ fontSize: "128px" }} /> */}
        <h1
          style={{ marginTop: "50px", marginBottom: "10px", color: "#2E5C84" }}
        >
          Youtube Video and Audio Downloader
        </h1>
        <p style={{ color: "#2E5C84" }}>
          The best Youtube Downloader - Video Downloader and Audio Downloader.
          It’s fast, free, and secure!
        </p>
      </div>
      <form className={classes.form}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Enter YouTube URL..."
          type="url"
          required
          onChange={handleUrlChange}
          value={url}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          className={classes.Button}
        >
          Download
        </Button>
      </form>
      <Switch>
        <Route path="/download">
          <Download
            setInputUrl={setUrl}
            loading={loading}
            setLoading={setLoading}
          />
        </Route>
      </Switch>
      <div id="container-a9cbbe6b52a925032cfb7d550d9f0b03"></div>
      <Seo />
    </div>
  );
}

export default App;
