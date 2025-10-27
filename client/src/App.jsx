import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [img, setImg] = useState(null);

  const handleSnap = async () => {
    try {
      const res = await axios.post(
        "https://ehc-snap.onrender.com/snap",
        { url },
        { responseType: "blob" } // 👈 খুবই গুরুত্বপূর্ণ
      );

      const blob = new Blob([res.data], { type: "image/png" });
      setImg(URL.createObjectURL(blob));
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>EHC Snap 📸</h1>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSnap}>Take Screenshot</button>
      {img && <img src={img} alt="screenshot" />}
    </div>
  );
}
