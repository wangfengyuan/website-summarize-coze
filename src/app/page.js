"use client";

import { useState } from "react";
import { Spotlight } from "@/app/components/Spotlight";
import { LineMdGithubLoop } from "@/app/components/github-icon";

export default function Home() {
  const [websiteInfo, setWebsiteInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get("url");
    if (!url) {
      return;
    }

    setDuration(0);
    setTime(0);
    const timePoint = Date.now();
    const intervalTimer = startDuration();
    try {
      setLoading(true);
      const response = await fetch(`/summarize?url=${url}`);
      const res = await response.json();
      setWebsiteInfo(res)
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      // 秒
      setTime((Date.now() - timePoint) / 1000);
      intervalTimer && clearInterval(intervalTimer);
      setLoading(false);
    }
  };

  function startDuration() {
    return setInterval(() => {
      setDuration((prev) => Number((prev + 0.2).toFixed(1)));
    }, 200);
  }

  return (
    <div className="relative w-screen bg-grid-white/[0.2] bg-black">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="w-full h-full relative min-h-screen z-20 flex flex-col items-center text-white pb-12 pt-20">
        <div className="mb-16 text-center">
          <h3 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Try url summarize
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3">
            <label htmlFor="url" className="text-2xl">
              Site url{" "}
              <span>{time ? `${time}s` : duration ? `${duration}s` : ""}</span>
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                name="url"
                id="url"
                placeholder="https://example.com"
                className="border border-neutral-800 rounded-xl px-4 py-2.5 transition-colors duration-200 bg-transparent text-neutral-300 text-lg min-w-[366px] bg-black"
              />
              <button
                type="submit"
                className="group relative grid overflow-hidden rounded-xl px-5 py-2.5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200"
                disabled={loading}
              >
                <span>
                  <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                </span>
                <span className="backdrop absolute inset-px rounded-[11px] bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
                <span className="z-10 text-neutral-300 text-lg flex items-center space-x-2">
                  {loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#000"
                      viewBox="0 0 256 256"
                      className="animate-spin"
                    >
                      <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
                    </svg>
                  )}
                  {loading ? "Loading..." : "Summarize"}
                </span>
              </button>
            </div>
          </div>
        </form>
        {websiteInfo.screenshot_url && (
          <div class="relative shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2)] border w-full max-w-[360px] rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="flex flex-col px-8 py-8">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-blue-600">{websiteInfo.title}</h1>
                <p className="text-lg text-gray-500 text-ellipsis overflow-hidden line-clamp-5 my-4">{websiteInfo.description}</p>
              </div>
              <div className="w-full">
                <img src={websiteInfo.screenshot_url} className="w-full rounded-lg block flex-1 bg-cover min-h-[294px] min-w-[294px]" />
              </div>
            </div>
            <img className="absolute inset-0 w-full h-full -z-10" src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        )}
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_-40%,black)]"></div>
      <div className="fixed z-30 right-4 top-4 flex items-center space-x-3">
        <a href="https://github.com/hehehai/headless-try" target="_blank" className="relative inline-flex overflow-hidden rounded-xl p-px">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[11px] bg-neutral-950 px-4 py-2 text-sm font-medium text-gray-50 backdrop-blur-3xl">
            <LineMdGithubLoop />
            <span className="ml-2">Github</span>
          </span>
        </a>
      </div>
    </div>
  );
}
