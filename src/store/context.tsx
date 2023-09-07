import React, { createContext, useReducer, useMemo, useContext } from 'react'
import { mainReducer, initialState } from './reducer'
import { MainState, MainAction, PopularTagType } from './types'

interface MainContextType {
  state: MainState<PopularTagType>
  dispatch: React.Dispatch<MainAction>
}

const MainContext = createContext<MainContextType | undefined>(undefined)

interface MainContextProviderProps {
  children: React.ReactNode
}

export default function MainContextProvider({
  children,
}: MainContextProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(MainContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within a MainContextProvider')
  }

  return context
}
