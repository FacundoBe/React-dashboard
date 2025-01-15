/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import styles from './selectsearch.module.css'
export default function Select({ selectedOption, onChange, options, id = "" }) {

    const [searchValue, setSearchValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [highligtedIndex, setHighligtedIndex] = useState(0)
    const containerRef = useRef()
    const inputRef = useRef()

    const placeholder = selectedOption?.label    // If there is a previously selected value of "selectedOption" state 
    //                                              it is shown in the input using the placeholder    

    function clearOptions(e) {
        e.stopPropagation()
        onChange(undefined)
        setSearchValue("")
        inputRef.current.focus()
    }


    function handleInputChange(e) {
        setSearchValue(e.target.value)
    }

    // resets higlighted position to the first element when the options menu is opened 
    useEffect(() => {
        if (isOpen) { setHighligtedIndex(0) }
    }
        , [isOpen])


    const filteredOptions = searchValue === "" ? options
        : options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()))


    // sets event handlers for keyword support
    useEffect(() => {
        const handler = (e) => {
            if (e.target != containerRef.current && e.target != inputRef.current) return

            if (!isOpen) setIsOpen(true)
            switch (e.code) {
                case "ArrowUp":
                    e.preventDefault()
                    if (highligtedIndex > 0) setHighligtedIndex(prev => prev - 1)
                    break
                case "ArrowDown":
                    console.log(filteredOptions.length)
                    if (highligtedIndex < filteredOptions.length - 1) setHighligtedIndex(prev => prev + 1)
                    break
                case "Escape":
                    setIsOpen(false)
                    break
                case "Enter":
                    e.preventDefault()
                    if (!isOpen) return
                    onChange(filteredOptions[highligtedIndex])
                    setSearchValue("")
                    setIsOpen(false)
                    break
                case "Space":
                    e.preventDefault()
                    break
            }
        }
        containerRef.current?.addEventListener("keydown", handler)

        return () => { containerRef.current?.removeEventListener("keydown", handler) }

    }, [isOpen, highligtedIndex, filteredOptions])



    return (
        <>
            <div
                className={styles.container}
                ref={containerRef}
                tabIndex={0}
                onBlur={() => setIsOpen(false)}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className={styles["img-input-container"]}>
                    <div className={styles["img-container"]}>
                        {searchValue==="" && 
                        <img src={selectedOption?.value?.image} className={styles["coin-img"]} />
                        }
                    </div>
                    <input
                        className={styles.selectedOption}
                        id={id}
                        value={searchValue}
                        onChange={(e) => handleInputChange(e)}
                        ref={inputRef}
                        placeholder={placeholder}
                    >
                    </input>
                </div>
                <button
                    type='button'
                    className={styles["clear-btn"]}
                    onClick={(e) => { clearOptions(e) }}
                >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className={styles.divider}></div>
                <div className={styles.caret}>

                </div>

                <ul
                    className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                    {filteredOptions.map((option, index) => (
                        <li key={option.label}
                            className={`${styles.option} ${index === highligtedIndex ? styles.highlighted : ""}`}
                            onMouseEnter={() => setHighligtedIndex(index)}
                            onMouseDown={(e) => {
                                e.stopPropagation()
                                if (option !== selectedOption) onChange(option)
                                setSearchValue("")
                                setIsOpen(false)
                            }}
                        >
                            <div className={styles["img-input-container"]}>
                                <img src={option?.value?.image} className={styles["coin-img"]} />
                                <div className={styles["option-label"]} >{option.label}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}