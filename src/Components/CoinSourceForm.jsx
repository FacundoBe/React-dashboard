import { useState } from "react";
import Select from "./Select";

const options = [
    { value:1, label: "Poroto f" },
    { value:2, label: "Lororoto" },
    { value:3,label: "FRoto" },
]

export default function CoinSourceForm() {
    
    const [value, setValue] = useState(options[2])
   

    return (
        <div className="coin-form-container">
            <form >
                <Select options={options} value={value} onChange={val => setValue(val)} />
            </form>

        </div>
    )
}