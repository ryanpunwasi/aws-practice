"use client";
import { useState } from "react";

export const Request = () => {
  const [data, setData] = useState(null);
  const [numbers, setNumbers] = useState([0, 0]);
  const [status, setStatus] = useState<"idle" | "pending" | "failed">("idle");

  const sendRequest = async () => {
    setStatus("pending");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch(
        `https://7208wvavp5.execute-api.us-east-1.amazonaws.com/Test?x=${numbers[0]}&y=${numbers[1]}`
      );
      const {
        body: { sum },
      } = await response.json();
      setData(sum);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    setNumbers(prev => {
      const newNumbers = [...prev];
      newNumbers[key] = Number(event.target.value);
      return newNumbers;
    });
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      <form className="max-w-sm mx-auto flex flex-col gap-2">
        <label
          htmlFor="number-input"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          X
        </label>
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="Enter a number"
          onChange={e => handleChange(e, 0)}
        />
        <label
          htmlFor="number-input2"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Y
        </label>
        <input
          type="number"
          id="number-input2"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="Enter a number"
          onChange={e => handleChange(e, 1)}
        />
      </form>
      {status === "idle" && (
        <button
          onClick={sendRequest}
          className="w-48 rounded-lg dark:bg-indigo-600 text-white text-sm filter saturate-200 px-3 py-2 dark:hover:bg-indigo-500 dark:active:bg-indigo-700"
        >
          Send Request
        </button>
      )}
      {status === "pending" && (
        <button className="w-48 rounded-lg dark:bg-indigo-600 text-white text-sm filter saturate-200 px-3 py-2 dark:hover:bg-indigo-500 dark:active:bg-indigo-700 flex gap-2 items-center justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-200 animate-spin dark:text-white-600 fill-indigo-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          Fetching...
        </button>
      )}
      {status === "failed" && (
        <button
          onClick={sendRequest}
          className="w-3/4 flex items-center justify-center rounded-lg dark:bg-red-600 text-white text-sm filter saturate-200 px-3 py-2 dark:hover:bg-red-400 dark:active:bg-red-700"
        >
          Error. Try again?
        </button>
      )}
      {data === null && status !== "pending" && (
        <section className="w-96 flex items-center justify-center dark:bg-gray-800 rounded-lg p-10 text-sm font-semibold border-4 border-dashed border-gray-700 dark:text-gray-400">
          Data will show up here.
        </section>
      )}
      {status === "pending" && (
        <section className="w-96 animate-pulse flex items-center justify-center dark:bg-gray-800 rounded-lg p-10 text-sm font-semibold border-4 border-dashed border-gray-700 dark:text-gray-400">
          Data will show up here.
        </section>
      )}
      {data != null && status !== "pending" && (
        <section className="w-96 dark:bg-gray-800 flex items-center justify-center rounded-lg p-10 text-sm font-semibold dark:text-gray-400">
          {JSON.stringify(data, null, 2)}
        </section>
      )}
    </div>
  );
};
