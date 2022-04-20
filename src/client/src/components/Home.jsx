import React, { Component, useState } from "react";


export default function App() {
    const [inputValues, setInputValues] = useState({
      'componentTwo': 'val1',
      'componentThree': 'val2',
      'componentFour': 'val3',
    });

    const addNewInputvalue = (name, value) => {
        setInputValues((prev) => {
            return {
              ...prev,
              [name]: value,
            }
        });
    };

    const removeInput = (name) => {
        setInputValues((prev) => {
            const copy = {...prev};
            delete copy[name];

            return copy;
        });
    };

    const handleInputChange = (name, value) => {
        setInputValues((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
    };

    const consoleAllValues = () => {
        console.log(inputValues);
    };

    return (
        <div className="App">
            <button onClick={addNewInputvalue}>New Input</button>
            {Object.keys(inputValues).map((name, i) => {
                return (<div>
                    <ComponentTwo
                        key={name}
                        index={i}
                        value={inputValues[name]}
                        onChange={(value) => handleInputChange(name, value)}
                        removeInput={() => removeInput(name)}
                    />
                   
                </div>
                    
        );
            })}
            <button onClick={consoleAllValues}>console log all values</button>
        </div>
    );
}

const ComponentTwo = (props) => {
    return (
        <div>
            <p>Input: {props.index}</p>
            <input
                name={"right_value"}
                onChange={(e) => props.onChange(e.target.value)}
                type="text"
                value={props.value}
            />
            <button onClick={props.removeInput}>Remove Input</button>
        </div>
    );
};
