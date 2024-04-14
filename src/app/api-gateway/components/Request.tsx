"use client";
import { useState } from "react";

export const Request = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState<"idle" | "pending" | "failed">("idle");

  const sendRequest = async () => {
    setStatus("pending");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch("/api/data");
      const json = await response.json();
      setData(json);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      {status === "idle" && (
        <button
          onClick={sendRequest}
          className="w-3/4 rounded-lg dark:bg-indigo-600 text-white text-sm filter saturate-200 px-3 py-2 dark:hover:bg-indigo-500 dark:active:bg-indigo-700"
        >
          Send Request
        </button>
      )}
      {status === "pending" && (
        <button className="w-3/4 rounded-lg dark:bg-indigo-600 text-white text-sm filter saturate-200 px-3 py-2 dark:hover:bg-indigo-500 dark:active:bg-indigo-700">
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
        <section className="dark:bg-gray-800 rounded-lg p-10 text-sm font-semibold border-4 border-dashed border-gray-700 dark:text-gray-400">
          Data will show up here.
        </section>
      )}
      {status === "pending" && (
        <section className="animate-pulse dark:bg-gray-800 rounded-lg p-10 text-sm font-semibold border-4 border-dashed border-gray-700 dark:text-gray-400">
          Data will show up here.
        </section>
      )}
    </div>
  );
};
