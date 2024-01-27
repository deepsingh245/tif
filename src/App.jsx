import { Snowflake } from "@theinternetfolks/snowflake";

import React from 'react'

function App() {
  const snowflake = Snowflake.generate()
  return (
    <div>
      {snowflake}
    </div>
  )
}

export default App
