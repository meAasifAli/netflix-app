import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface SliderProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function Slider<T>({ title, items, renderItem }: SliderProps<T>) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-16 mt-4 md:mt-8 relative">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-black/40 p-2 rounded-full shadow-md hidden md:block"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>
        {/* Item List */}
        <div
          ref={rowRef}
          className="flex overflow-x-auto scroll-smooth gap-4 md:gap-8 no-scrollbar"
        >
          {items.map(renderItem)}
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-black/40 p-2 rounded-full shadow-md hidden md:block"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
