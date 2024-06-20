import React, { createContext, useEffect, useState } from 'react'
import { initDb } from '../../util/database';
import AppLoading from 'expo-app-loading';
import { Text, View } from 'react-native';

export const DatabaseContext = createContext({
  database: null,
  setDatabase: (database) => {}
})

const DatabaseContextProvider = ({children}) => {
  const [database, setDatabase] = useState(null);
  useEffect(() => {
    (async function () {
      await initDb(dbInitSuccessHandler, dbInitFailureHandler);
    })();
  }, []);

  if(!database) {
    return <Text>Loading...</Text>
  }

  const value = {
    database,
    setDatabase
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )

  function dbInitFailureHandler(error) {
    console.log("db init error:", error);
  }

  function dbInitSuccessHandler(database) {
    console.log("db init success", database);
    setDatabase(database);
  }
}

export default DatabaseContextProvider