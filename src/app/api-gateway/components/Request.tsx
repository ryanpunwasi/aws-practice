"use client";
export const Request = () => {
  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      <button className="w-fit rounded-lg dark:bg-indigo-600 text-white text-sm filter saturate-200 px-3 py-2 dark:hover:bg-indigo-500 dark:active:bg-indigo-700">
        Send Request
      </button>
      <section className="dark:bg-gray-800 rounded-lg p-10 text-sm font-semibold border-4 border-dashed border-gray-700 dark:text-gray-400">
        Data will show up here.
      </section>
    </div>
  );
};
