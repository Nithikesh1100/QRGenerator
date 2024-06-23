import React, { useState } from 'react';
import './App.css';
import QRCode from 'qrcode';
import { ReactComponent as Qricon } from './assets/Qricon.svg';
import { ReactComponent as Downloadicon } from './assets/Downloadicon.svg';
import { ReactComponent as Clearicon } from './assets/Clearicon.svg';
import { ReactComponent as Erroricon } from './assets/Erroricon.svg'; // Assuming you have an Erroricon.svg

function App() {
  const [url, setUrl] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('');
  const [clearNdownload, setClearNdownload] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url) {
      setErrorMsg('Enter The Url');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      return;
    }
    setErrorMsg('');
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url, { width: 128, height: 128 });
      setQrCodeSrc(qrCodeDataUrl);
      setClearNdownload(true);
    } catch (error) {
      console.error(error);
      setErrorMsg('Please Enter the Url');
    }
  };

  const clearQR = () => {
    setUrl('');
    setQrCodeSrc('');
    setClearNdownload(false);
  };

  return (
    <div className='container'>
      <div className="qrcontainer">
        {qrCodeSrc ? (
          <div>
            <h3>YOUR QR CODE IS HERE</h3>
            <img src={qrCodeSrc} alt="qr-code" />
          </div>
        ) : (
          <h2>QR CODE GENERATOR</h2>
        )}
      </div>
      <div className="App-container">

        <form className='form' onSubmit={handleSubmit}>
          <input
            type='url'
            className='input'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
          
          {!clearNdownload &&
            (<button type="submit" className="submit-button">
              <Qricon style={{ marginRight: '20px' }} />
              Generate</button>)}
          {errorMsg && (
            <div className='errormsg'>
              <Erroricon />
              {errorMsg}
            </div>
          )}
        </form>

        {clearNdownload && (
          <div className='clearNdownload'>
            <button className='clear' onClick={clearQR}>
              <Clearicon />
              Clear</button>
            <a href={qrCodeSrc} download="qrCode.png" className="download">
              <Downloadicon />
              Download</a>
          </div>)
        }

      </div>
    </div>
  );
}

export default App;
