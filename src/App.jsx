import { useCallback, useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";

function App() {
  const [length, setLength] = useState(6)
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,5)      // Select the Range of password from 0 to 5
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col">
        <h1 className="text-white pt-4 text-xl">Password Generator</h1>
        <div className='w-96 h-48 mt-10 bg-slate-200 rounded-lg shadow-xl flex flex-col items-center p-3'>

          {/* Input Container */}

          <div className="input_container">
            <input
              type="text"
              className='w-64 p-2 rounded-md bg-slate-400 text-white shadow-lg  mr-3'
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='p-3 bg-blue-600 rounded-md mt-1 cursor-pointer' onClick={copyPassword}>
              <FaCopy />
            </button>
          </div>

          {/* Length Measuring Range */}

          <div className="length_measuring flex mt-3">
            <input type="range"
              min={6} max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="ml-2">Length ({length})</label>
          </div>

          {/* Numbers and Special Characters Allowed */}

          <div className='num_allowed mt-2'>
            <div className='flex'>
              <input type="checkbox"
                value={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev)
                }}
              />
              <p className="ml-2">Numbers</p>
            </div>
            <div className='flex'>
              <input type="checkbox"
                value={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <p className="ml-2">Special Characters</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
