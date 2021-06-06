import React, { ChangeEvent } from 'react'
import styles from './styles.module.scss'

interface RoundedButtonProps{
    img: string
    handleChange: (value:ChangeEvent<HTMLInputElement>) => void
    textAlt:string
    search:string
    placeholder:string
}
const RoundedSearch = ({ img, handleChange, textAlt,search,placeholder }: RoundedButtonProps) => {
    return (
        <div className={styles.search}>
            <input type="text" onChange={(e)=>handleChange(e)} value={search} placeholder={placeholder}/>
            <img src={img} alt={textAlt}  />
        </div>
    )
}

export default RoundedSearch
