import React, {useState} from 'react';

import {FaSearch} from "react-icons/fa"
import "./CustomSelect.css"
import {findAllByDisplayValue} from "@testing-library/react";

const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
    { value: "white", label: "White" },
  ];

const CustomSelect = () => {

    const [options, setOptions] = useState(optionList)

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (value) => {
        // setInput(searchQuery.concat(value))}
        setSearchQuery(value)
    };

    return (
        <div>

            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    placeholder="Type to search.."
                    value={searchQuery}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>

            <div className="results-list">
                {
                    options.filter(option => {
                        const searchValue = searchQuery.toLowerCase()
                        const optionValue = option.value.toLowerCase()

                        return optionValue.startsWith(searchValue) && optionValue !== searchValue
                    })
                        .map((option, id) => (
                            <div className="search-result"
                                 onClick={(e) => handleChange(option.value)}>

                            {option.value}

                            </div>
                        )
                    )
                }
            </div>

        </div>
    );
};

export default CustomSelect;