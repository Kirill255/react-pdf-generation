import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const App = () => {
  const [bill, setBill] = useState({
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0
  });
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // const handleChange = (e) => {
  //   e.persist();
  //   setBill((prevBill) => ({
  //     ...prevBill,
  //     [e.target.name]: e.target.value
  //   }));
  // };

  const handleChange = ({ target: { name, value } }) => {
    setBill((prevBill) => ({
      ...prevBill,
      [name]: value
    }));
  };

  const createAndDownloadPdf = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("/create-pdf", bill)
      .then((res) => {
        setLoading(false);
        setDownloading(true);
        axios
          .get("/fetch-pdf", { responseType: "blob" })
          .then((resp) => {
            const pdfBlob = new Blob([resp.data], { type: "application/pdf" });
            saveAs(pdfBlob, "bill.pdf");
            setDownloading(false);
          })
          .catch((err) => {
            setDownloading(false);
            console.log(err.response);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="App">
      <form onSubmit={createAndDownloadPdf}>
        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
        <button type="submit">Download PDF</button>
      </form>
      {loading && <div>Loading...</div>}
      {downloading && <div>Downloading...</div>}
    </div>
  );
};

export default App;
