import React, { useState, useContext } from 'react'
import '../assets/styles/components/Header.css'
import ThemeContext from '../context/ThemeContext'

// Funcion que permite estblecer el light mode y el dark mode

// el estado inicial de darkmode es false

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)

  const { theme, setTheme } = useContext(ThemeContext)

  // const darkmode = (isdarkMode) => {
  //   if (!isdarkMode) {
  //     document.querySelector('#App').style.background = 'black'
  //     // document.querySelector('h1').style.color = 'white'
  //   }
  //   if (isdarkMode) {
  //     document.querySelector('#App').style.background = 'white'
  //     // document.querySelector('h1').style.color = 'black'
  //   }
  // }

  const handleClick = () => {
    setDarkMode(!darkMode)
    darkMode ? setTheme(false) : setTheme(true)
  }
  return (
    <div className={`Header ${theme ? 'lightmode' : 'darkmode'}`}>
      <h1>ReactHooks</h1>
      <button type="button" onClick={handleClick}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </div>
  )
}

export default Header
