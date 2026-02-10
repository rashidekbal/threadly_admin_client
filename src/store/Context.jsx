import React, { createContext } from 'react'
const data=createContext();
export default function Context({children}) {
  return (
    <data.Provider value={{name:"rashid"}}>
        {children}
    </data.Provider>

  )
}
export { data};
