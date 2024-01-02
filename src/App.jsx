import { useCallback, useEffect, useState, useRef } from "react";
// import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordReference = useRef(null);

  const generatePasssword = useCallback(() => {
    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllowed) letters += "0123456789"; // Adding numbers
    if (specialChar) letters += "@&$^$$^^@##!*@"; // Adding special Characters

    for (let i = 0; i < length; i++) {
      pass += letters[Math.floor(Math.random() * letters.length)];
    }
    setPassword(pass);
  }, [length, numAllowed, specialChar, setPassword]);

  const showPassword = useEffect(() => {
    generatePasssword();
  }, [numAllowed, specialChar, length]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordReference.current?.select();
  };

  return (
    <>
      <div className="text-white overflow-hidden">
        <h1 className="text-2xl my-5 text-center">Random Password Generator</h1>
        <div className="flex justify-around ">
          <div className="flex items-center justify-center gap-10 my-44 bg-slate-400 p-3 rounded-3xl">
            <input
              type="text"
              readOnly
              value={password}
              ref={passwordReference}
              placeholder="Your Password"
              className="text-orange-700 p-1 rounded-lg h-10 w-72 shadow-xl"
            />
            <button
              className="mx-5 bg-gray-300 text-orange-700 p-2 rounded-3xl cursor-pointer h-10 shadow-xl"
              onClick={copyPassword}
            >
              Copy Password
            </button>
          </div>
          <div className="my-40 flex-col">
            <h2 className="text-xl">Features</h2>
            <div className="my-7">
              <input
                type="checkBox"
                className="mx-4"
                defaultChecked={numAllowed}
                onChange={() => {
                  setnumAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>

              <input
                type="checkBox"
                className="mx-4"
                defaultChecked={specialChar}
                onChange={() => {
                  setSpecialChar((prev) => !prev);
                }}
              />
              <label>Special Characters</label>
            </div>
            <label>Length : </label>
            <input
              type="number"
              min={5}
              max={50}
              className="mx-1 text-orange-700 p-1 rounded-sm"
              onChange={(e) => setLength(e.target.value)}
              defaultValue={length}
            />
            <br />
            <p className="my-7">
              Note - To try another option uncheck and again check the desired
              features.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
