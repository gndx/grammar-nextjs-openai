import { useState } from "react";

export default function Home() {
  const [phraseInput, setPhraseInput] = useState("");
  const [result, setResult] = useState(() => []);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/grammar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phrase: phraseInput }),
      });
      const data = await response.json();
      console.log(data);
      setResult(data.result);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg("Error PANIC");
    }
  }

  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit
            </h2>

            <p className="hidden text-gray-500 dark:text-gray-400 sm:mt-4 sm:block">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              dolor officia blanditiis repellat in, vero, aperiam porro ipsum
              laboriosam consequuntur exercitationem incidunt tempora nisi?
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <form action="#" className="sm:flex sm:gap-4" onSubmit={onSubmit}>
              <div className="sm:flex-1">
                <label htmlFor="text" className="sr-only">
                  Text
                </label>

                <input
                  type="text"
                  placeholder=""
                  className="w-full rounded-md border-gray-200 bg-white p-3 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  value={phraseInput}
                  onChange={(e) => setPhraseInput(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
              >
                <span className="text-sm font-medium"> Grammar Check </span>
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-gray-900 p-4">
        {isLoading ? (
          <p className="text-center text-3xl font-bold">checking...</p>
        ) : result ? (
          <p className="text-center text-2xl font-bold ">{result}</p>
        ) : null}
      </section>
    </main>
  );
}
