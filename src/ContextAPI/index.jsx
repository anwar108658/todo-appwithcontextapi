import {createContext} from "react"

const DataContext = createContext();

const ManageContext = ({children}) => {
    const Data = {
        myName:"anwar",
        fName:"AQ"
    }
    return <DataContext.Provider value={Data}>
        {children}
    </DataContext.Provider>
}

export {ManageContext,DataContext}