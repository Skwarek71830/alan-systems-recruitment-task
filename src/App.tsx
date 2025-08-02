import { useState } from "react";
import useSWR from "swr";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { wait } from "./helpers/utils";
import mockEvents from "./mock/events.json"; // Import mock data
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  const { data: events, isLoading } = useSWR("/events", async () => {
    await wait(1000); // Simulate API response delay
    //mock data from the mocks folder - normally it would be fetched from an API using "GET" method to the {API URL}/events endpoint - i would use the fetcher fn from utils.ts
    return mockEvents as unknown as Event[];
  });
  console.log(events);
  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
