import React, {useEffect, useMemo, useState} from 'react';

import {ClickAwayListener} from '@mui/base'
import {RxCross2, RxCross1, RxDividerVertical, RxChevronDown, RxChevronUp} from "react-icons/rx"

import styles from "./CustomSelect.module.css";


const optionList = [
    "Red", "Green", "Yellow", "Blue", "White",
    "Redd", "Grdeen", "Yelldow", "Bldue", "Whdite",
    "aRed", "Gareen", "Yelalow", "Balue", "Whiate",
    "Red", "Green", "Yellow", "Blue", "White",
    "Red", "Green", "Yellow", "Blue", "White",
];

const CustomSelect = () => {

    const [options, setOptions] = useState(optionList);

    const [dropdownOptions, setDropdownOptions] = useState(options)

    const [input, setInput] = useState("");

    const [queryList, setQueryList] = useState([]);

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setDropdownOptions(options.filter(option => {
            const searchValue = input.toLowerCase()
            const optionValue = option.toLowerCase()

            return optionValue.includes(searchValue) && !queryList.includes(option)
        }))
    }, [input, queryList])

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

    const handleBigCrossPress = () => {
        setInput("")
        setOptions([...options, ...queryList])
        setQueryList([])
    }


    return (
        <ClickAwayListener onClickAway={() => setIsOpen(!isOpen)}>
            <div>

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

                    <div onClick={() => handleBigCrossPress()}>
                        <RxCross1 className={styles.rx_big_cross}/>
                    </div>

                    <div>
                        <RxDividerVertical className={styles.vertical_line}/>
                    </div>

                    <div onClick={() => setIsOpen(!isOpen)}>
                        {
                            isOpen
                            ? <RxChevronDown className={styles.carets}/>
                            : <RxChevronUp className={styles.carets}/>
                        }
                    </div>
                </div>

                {(isOpen || input) && (
                    <div className={styles.dropdown_list}>
                        {
                            dropdownOptions.map((option, index) => (
                                <div key={index}
                                     className={styles.search_result}
                                     onClick={() => handleOptionCheck(option)}>
                                    {option}
                                </div>))
                        }
                    </div>
                )}

            </div>
        </ClickAwayListener>
    );
};

export default CustomSelect;