import "./styles.css";

import Home from "./components/Home";

export default function App() {
  const endpoint =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  return (
    <div className="App">
      <Home endpoint={endpoint} />
    </div>
  );
}
