import { useState } from 'react'
import styles from './select.module.css'
export default function Select({ value, onChange, options }) {

    const [isOpen, setIsOpen] = useState(false)

    function clearOptions(e){
        e.stopPropagation()
        onChange(undefined)

    }

    return (
        <>
            <div tabIndex={0} className={styles.container} 
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            >
                <span className={styles.value}> {value?.label}</span>
                <button 
                type='button'
                className={styles["clear-btn"] }
                onClick={(e)=> {clearOptions(e)}} 
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
                    {options.map(option => (
                        <li key={option.label}
                            className={styles.option}
                            onClick={(e) => {
                                e.stopPropagation()
                                onChange(option)
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