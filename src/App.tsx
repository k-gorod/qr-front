import React, { useState } from 'react';
import './App.css';

function App() {
  const [ inputValue, setInputValue ] = useState('');
  const [ imgUrl, setImgUrl ] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement>  = (event) => {
    setInputValue(event.target.value)
  }

  const onOkButtonClick = async () => {
    if(!inputValue) {
      setImgUrl(null);

      return;
    }

    setIsLoading(true);

    const response = await fetch(`https://qr-generation-5kyy.onrender.com/generate?link=${inputValue}`);

    const blob = await response.blob();

    const imgUrl = URL.createObjectURL(blob);

    setImgUrl(imgUrl)

    setIsLoading(false);
  }

  return (
    <div className="main_wrapper">
      <input onChange={onInputChange} value={inputValue}/>
      <button onClick={onOkButtonClick}>Ok</button>
      {
        isLoading && <div>Loading</div> 
      }
      {
        imgUrl ? (
          <>
            <img src={imgUrl} />
            <a href={imgUrl} download={`${inputValue}.png`}>Download</a>
          </>
        ) : null
      }

    </div>
  );
}

export default App;
