import React, {useEffect, useState} from 'react';

import {FaSearch} from "react-icons/fa"
import {ImCross} from "react-icons/im"
import {RxCross2, RxCross1, RxDividerVertical, RxChevronDown, RxChevronUp} from "react-icons/rx"

import styles from "./CustomSelect.module.css";


const optionList = [
    "Redddddddddddddddddddd", "Greennnnnnnnnnnnn", "Yellow", "Blue", "White",
    "Red", "Green", "Yellow", "Blue", "White",
    "Red", "Green", "Yellow", "Blue", "White",
    "Red", "Green", "Yellow", "Blue", "White",
    "Red", "Green", "Yellow", "Blue", "White",
];

const CustomSelect = () => {

    const [options, setOptions] = useState(optionList);

    const [input, setInput] = useState("");

    const [queryList, setQueryList] = useState([]);

    const [isOpen, setIsOpen] = useState(true);

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

    const delAllQuery = () => {
        setOptions([...options, ...queryList])
        setQueryList([])
    }


    return (
        <React.Fragment>

            <div className={styles.input_wrapper}>
                {/*<FaSearch id="search-icon" />*/}

                <div className={styles.query_list}>
                    {
                        queryList.map((item) => (
                            <div className={styles.query_item_container}>
                                <div>
                                    {item}
                                </div>
                                <div onClick={() => delQueryItem(item)}>
                                    <RxCross2 className={styles.rx_cross}/>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <input
                    placeholder="Type to search.."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />

                <div onClick={() => delAllQuery()}>
                    <RxCross1 className={styles.rx_big_cross}/>
                </div>

                <div className={styles.symbolfont}>
                    <RxDividerVertical className={styles.vertical_line}/>
                </div>

                <div onClick={() => setIsOpen(!isOpen)}>
                    {isOpen
                        ? <RxChevronDown className={styles.carets}  />
                        : <RxChevronUp className={styles.carets} />
                    }
                </div>
            </div>

            {(isOpen || input) && (
                <div className={styles.options_list}>
                    {
                        options.filter(option => {
                            const searchValue = input.toLowerCase()
                            const optionValue = option.toLowerCase()

                            return optionValue.includes(searchValue)
                        })
                            .map((option, index) => (
                                <div key = {index} className={styles.search_result}
                                     onClick={() => handleOptionCheck(option)}>

                                {option}

                                </div>
                            )
                        )
                    }
                </div>
                )}

        </React.Fragment>
    );
};

export default CustomSelect;