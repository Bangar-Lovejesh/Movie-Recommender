import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Test() {
  const location = useLocation();
  const nav = useNavigate();
  const post = location.state;
  const [stuff, setStuff] = useState([]);

  useEffect(() => {
    fetch("/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: post }),
    }).then((res) => res.json().then((data) => setStuff(data)));
  }, []);

  // useEffect(()=>{
  //     fetch("/test").then((res)=> {
  //         return res.json().then((data) => {
  //             setStuff(data);
  //             // console.log(data);
  //         });
  //     })
  // },[]);

  const listItems = stuff.map((i) => <li key={i.id}>{i.name}</li>);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <ul>{listItems}</ul>
          <button type="submit" onClick={() => nav("/")}>
            Go back
          </button>
        </header>
      </div>
    </>
  );
}

export default Test;
