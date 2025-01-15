/* eslint-disable react/prop-types */
import styles from './ButtonIcon.module.css'

export function ButtonIcon({ type, ...rest }) {
  let svg

  if (type !== "check" && type !== "clear") console.log("Invalid type prop. Valid types: check /n clear")

  if (type === "check") {
    svg = <svg className={styles.button}
      fill="none"
      strokeWidth={2}
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  }


  if (type === "clear") {
    svg = <svg
      className={styles.button}
      fill="none" viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  }

  return (
    <div>
      {svg}
    </div>
  )

}
