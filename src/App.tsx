import React, { FC, useState } from "react";
import Select, { SelectOption } from "./components/Select";

const options = [
  { label: "one", value: 1 },
  { label: "two", value: 2 },
  { label: "three", value: 3 },
  { label: "four", value: 4 },
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  const [values, setValues] = useState<SelectOption[]>([]);
  return (
    <>
      <Select options={options} value={value} onChange={(o) => setValue(o)} />
      <Select
        multiple={true}
        options={options}
        value={values}
        onChange={(o) => setValues(o)}
      />
    </>
  );
}

export default App;
