import React, {useEffect, useState} from 'react';

import {FaSearch} from "react-icons/fa"
import "./CustomSelect.css"
import {findAllByDisplayValue} from "@testing-library/react";

const optionList = ["red", "green", "yellow", "blue", "white"];

const CustomSelect = () => {

    const [options, setOptions] = useState(optionList);

    const [input, setInput] = useState("");

    const [queryList, setQueryList] = useState([]);

    useEffect(() => {
        console.log(options)    // https://www.youtube.com/watch?v=GNrdg3PzpJQ&ab_channel=UlbiTV 2:07 про оптимизацию путём асинхронного вызова функций
    }, [options])

    const handleOptionCheck = (item) => {
        setInput("")
        delOption(item)
        setQueryList(queryList.concat(item))
    };

    const handleChange = (value) => {
        setInput(value)
    };

    const delOption = (value) => {
        setOptions(options.filter(option => {
            return option !== value
        }))
    };

    const delQueryItem = (value) => {
        setOptions([...options, value])
        setQueryList(queryList.filter(item => {
            return item !== value
        }))
    };


    return (
        <div>

            <div className="query-list">
                {
                    queryList.map((item) => (
                        <div className="query-item-container">
                            <div>
                                {item}
                            </div>
                            <button onClick={() => delQueryItem(item)}>
                                <p className="str675"></p>
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    placeholder="Type to search.."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>

            <div className="options-list">
                {
                    options.filter(option => {
                        const searchValue = input.toLowerCase()
                        const optionValue = option.toLowerCase()

                        return optionValue.startsWith(searchValue) && optionValue !== searchValue
                    })
                        .map((option, id) => (
                            <div className="search-result"
                                 onClick={() => handleOptionCheck(option)}>

                            {option}

                            </div>
                        )
                    )
                }
            </div>

        </div>
    );
};

export default CustomSelect;