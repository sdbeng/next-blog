import React from 'react'
import '../styles.css'
// import '../styles/global.css'

const App = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
    )
}

export default App