import React, { ReactNode, useContext, useEffect, useState } from "react";

import CSS from "./main.module.css";

const initialState = {
  count: 0,

  setCount: (count: number) => {},
};

const initialStateContext2 = {
  count2: 10,
  setCount2: (count: number) => {},
};

const AppContext = React.createContext(initialState);
const AppContext2 = React.createContext(initialStateContext2);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  return (
    <AppContext.Provider value={{ count, setCount }}>
      {children}
    </AppContext.Provider>
  );
};

export const AppProvider2: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count2, setCount2] = useState(10);

  return (
    <AppContext2.Provider value={{ count2, setCount2 }}>
      {children}
    </AppContext2.Provider>
  );
};

export const Main: React.FC = () => {
  return (
    <AppProvider2>
      <AppProvider>
        <Wrapper>
          <ExpensiveComponent />
        </Wrapper>
      </AppProvider>
    </AppProvider2>
  );
};

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  //const Wrapper: React.FC = () => {

  const { count, setCount } = useContext(AppContext);
  // const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Wrapper mounted");
  }, []);
  useEffect(() => {
    console.log("Wrapper rendered");
  });

  return (
    <div className={CSS.body}>
      <h1>Count: {count}</h1>
      <div className={CSS.buttonRow}>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        {children}
      </div>
    </div>
  );
};
const ExpensiveComponent = () => {
  const { count2, setCount2 } = useContext(AppContext2);

  useEffect(() => {
    console.log("ExpensiveComponent mounted");
  }, []);

  useEffect(() => {
    console.log("ExpensiveComponent rendered");
  });

  return (
    <div>
      <div className={CSS.buttonRow}>
        <button onClick={() => setCount2(count2 + 1)}>Increment</button>
        <button onClick={() => setCount2(count2 - 1)}>Decrement</button>
      </div>
      <SecondExpensiveComponent />
    </div>
  );

  // const { count2, setCount2 } = useContext(AppContext2);

  // return (
  //   <div className={CSS.body}>
  //     <h1>Count: {count2}</h1>
  //     <button onClick={() => setCount2(count2 + 1)}>Increment</button>
  //     <button onClick={() => setCount2(count2 - 1)}>Decrement</button>
  //     <SecondExpensiveComponent />
  //   </div>
  // );
};

const SecondExpensiveComponent = () => {
  useEffect(() => {
    console.log("SecondExpensiveComponent mounted");
  }, []);

  // for (let i = 0; i < 1000000; i++) {
  //   console.log("SecondExpensiveComponent");
  // }

  useEffect(() => {
    console.log("SecondExpensiveComponent rendered");
  });

  return <div>{"SecondExpensiveComponent"}</div>;
};
