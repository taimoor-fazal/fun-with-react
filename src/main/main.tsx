import React, { ReactNode, useContext, useEffect, useState } from "react";

import CSS from "./main.module.css";

const initialState = {
  count: 0,
  tempCount: 10,
  setCount: (count: number) => {},
};

const AppContext = React.createContext(initialState);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);
  const [tempCount] = useState(10);

  return (
    <AppContext.Provider value={{ count, setCount, tempCount }}>
      {children}
    </AppContext.Provider>
  );
};

export const Main: React.FC = () => {
  return (
    <AppProvider>
      <Wrapper>
        <ExpensiveComponent />
      </Wrapper>
    </AppProvider>
  );
};

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { count, setCount } = useContext(AppContext);
  return (
    <div className={CSS.body}>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      {children}
      {/* <ExpensiveComponent count={count} /> */}
    </div>
  );
};
const ExpensiveComponent: React.FC = () => {
  useEffect(() => {
    console.log("ExpensiveComponent mounted");
  }, []);

  useEffect(() => {
    console.log("ExpensiveComponent rendered");
  });

  // for (let i = 0; i < 1000; i++) {
  //   console.log(i);
  // }

  return (
    <div>
      {"ExpensiveComponent"}
      <SecondExpensiveComponent />
    </div>
  );
};

const SecondExpensiveComponent: React.FC = () => {
  const { setCount } = useContext(AppContext);
  useEffect(() => {
    console.log("SecondExpensiveComponent mounted");
  }, []);

  useEffect(() => {
    console.log("SecondExpensiveComponent rendered");
  });

  // for (let i = 0; i < 1000; i++) {
  //   console.log("Second: " + i);
  // }

  return <div>{"SecondExpensiveComponent"}</div>;
};
