import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    //hook responsible to change state // means to propogate this change in the UI(DOM)
    let [counter, setCounter] = useState(15);
    //let counter = 15;

    const addValue = () => {
        //counter += 1;

        // the variable is being updated here but simply this will not show changes on the webpage
        // the issue is with UI updation that's why it does not show up on the webpage
        // here is when react comes into play // react will be reactive to the changes in variables and it will handle it
        // react was basically made to handle changes in the variables at multiple places
        // lets suppose this couner variable was being used at 5 different places in the html/jsx code
        // so we if wanted to update the UI we would end up with a lot of references and would have had to update each html manually
        // Hence concept of HOOKS came to deal with all the UI changes
        if (counter < 20) {
            counter = counter + 1;
            setCounter(counter);
        }
    };

    const subValue = () => {
        if (counter != 0) {
            counter = counter - 1;
            setCounter(counter);
        }
    };
    return (
        <>
            <h1>Counter Program</h1>
            <h3>Counter Value : {counter}</h3>

            <button onClick={addValue}>Increase Value</button>
            <hr />
            <button onClick={subValue}>Decrease Value</button>
            <p>Counter count : {counter}</p>
        </>
    );
}

export default App;
