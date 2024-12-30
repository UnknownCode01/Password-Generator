import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [upperCaseAllowed, setupperCaseAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "`~!@#$%^&*_+=,";

    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ind);
    }
    setPassword(pass);
  }, [
    length,
    upperCaseAllowed,
    numberAllowed,
    specialCharAllowed,
    setPassword,
  ]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 35);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, upperCaseAllowed, numberAllowed, specialCharAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-fit mx-auto shadow-md rounded-lg px-4 py-1 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white">Password Generator</h1>
        <div className="flex shadow mb-4 my-2 rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none px-3 py-0.5 shrink-0 bg-blue-700 text-white clickable-button"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={35}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={upperCaseAllowed}
              id="upperCaseInput"
              onChange={() => {
                setupperCaseAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="upperCaseInput">Upper Case</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={specialCharAllowed}
              id="specialCharInput"
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="specialCharInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
