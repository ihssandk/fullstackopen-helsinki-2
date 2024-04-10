import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {type,value,onChange}
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const countries = await axios.get(
          'https://studies.cs.helsinki.fi/restcountries/api/all')
          .then(res=>res.data)

        if (countries.length > 0) {
          const locateCountry = countries.filter(country => 
            country.name.common.toLowerCase().includes(name.toLowerCase()))
          setCountry(locateCountry)
          console.log(locateCountry)
        } else {
          setCountry({ found: false })
        }
      } catch (error) {
        console.error('Error fetching country:', error)
      }
    }
    if (name) {
      fetchCountry()
    }
  }, [name])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.length===0) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country[0]?.name.common} </h3>
      <div>capital {country[0]?.capital} </div>
      <div>population {country[0]?.population}</div>
      <img src={country[0]?.flags.png} height='100' alt={`flag of ${country[0]?.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App
