import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainFont = JetBrains_Mono({
  subsets: ["vietnamese"],
  weight: ["500"],
});

function NotFound() {
  return (
    <>
      <main className="flex-1">
        <section className="grid h-screen place-content-center">
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            <span className="mr-2 gap-3 text-4xl hover:cursor-pointer hover:text-red-700">
              &#10683;
            </span>{" "}
            <span className={cn("gap-2 text-4xl", jetbrainFont.className)}>
              404
            </span>{" "}
            - Page Not Found
          </h1>
          <p className="mb-4">This page you are looking for does not exist.</p>
        </section>
      </main>
    </>
  );
}

export default NotFound;
