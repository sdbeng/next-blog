import React from 'react'
import styles from './layout.module.css'

const name = "Serg Barrera"
export const siteTitle = 'Serg - Profile Website'

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Layout
