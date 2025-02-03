/* eslint-disable react/prop-types */
import styles from './ButtonIcon.module.css'

export function ButtonIcon({ type, height = "1.5em", disabled=false, ...rest }) {
  let svg

  if (type === "check") {
    svg = <svg 
      fill="none"
      strokeWidth={3}
      stroke="currentColor"
      viewBox="0 0 24 24"
      height={height}
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  }


  if (type === "clear") {
    svg = <svg
      fill="none" viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      height={height}
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  }

  if (type === "edit") {
    svg = <svg
      fill="none" viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor" xmlns="http://www.w3.org/2000/svg" 
      height={height}
      {...rest}> 
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  }

  return (
    <button className={`${styles["invisible"]} ${disabled ? "" : styles["enabled"]}`} disabled={disabled} >
      {svg}
    </button>
  )

}
