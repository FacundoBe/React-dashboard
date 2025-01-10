/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'
export default function Select({ value, onChange, options }) {

    const [isOpen, setIsOpen] = useState(false)
    const [highligtedIndex, setHighligtedIndex] = useState(0)
    const containerRef = useRef()

    
    function clearOptions(e) {
        e.stopPropagation()
        onChange(undefined)
    }

    function isOptionSelected(option) {
        return option === value
    }

    useEffect(() => {  // resets higlighted position to the first element when the options menu is opened  
        if (isOpen) { setHighligtedIndex(0) }
    }
        , [isOpen])

    
    // sets event handlers for keyword support
    useEffect(() => {
        const handler = (e) => {
     
            if (e.target != containerRef.current) return
            
            if (e.code != "Escape" && !isOpen) setIsOpen(true)           
            switch (e.code) {
                case "ArrowUp":
                    if (highligtedIndex > 0) setHighligtedIndex(prev => prev - 1)
                    break
                case "ArrowDown":
                    if (highligtedIndex < options.length - 1) setHighligtedIndex(prev => prev + 1) 
                    break
                case "Escape":
                    setIsOpen(false)
                    break
                case "Enter":
                    if(isOpen){
                    onChange(options[highligtedIndex])
                    setIsOpen(false)
                }
                break
            }
        }
        containerRef.current?.addEventListener("keydown", handler)

        return () => { containerRef.current?.removeEventListener("keydown", handler) }

    }, [isOpen, highligtedIndex, options])
    





    return (
        <>
            <div
                className={styles.container}
                ref={containerRef}
                tabIndex={0}
               onBlur={() => setIsOpen(false)}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span className={styles.value}> {value?.label}</span>
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
                    {options.map((option, index) => (
                        <li key={option.label}
                            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highligtedIndex ? styles.highlighted : ""}`}
                            onMouseEnter={() => setHighligtedIndex(index)}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (option !== value) onChange(option)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}