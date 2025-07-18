import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Gallery } from "../types";
import { getGalleries } from "../api/galleries.ts";

const TestimonialCard = ({ gallery }: { gallery: Gallery }) => (
  <div className="bg-white rounded-3xl p-12 text-text-gray max-w-5xl mx-auto shadow-xl lg:h-[360px] ">
    <div className="flex items-start gap-8">
      <img
        src={gallery.imageUrl}
        alt="avatar"
        className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-4 ring-gray-100"
      />
      <div className="flex-1 text-left">
        <h3 className="text-2xl font-bold mb-2 text-text-gray">nvd</h3>
        <p className="text-text-family mb-6 font-medium">abc@gmail.com</p>
        <p className="text-text-gray leading-relaxed text-lg">
          {gallery.desctiption}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await getGalleries();
        setGalleries(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch galleries:", error);
      }
    };
    fetchGalleries().then();
  }, []);

  if (galleries.length === 0) {
    return (
      <section className="py-24 bg-gradient-to-br bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-20 text-left">Testimonials</h2>
          <div className="bg-white rounded-3xl p-12 max-w-5xl mx-auto">
            <p className="text-text-primary text-lg">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const change = (step: number) =>
    setCurrent((prev) => (prev + step + galleries.length) % galleries.length);

  return (
    <section className="py-20 rounded-4xl bg-primary text-white relative overflow-hidden border-b">
      {/* Background decoration */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold mb-20 lg:text-left pl-18 text-center">Testimonials</h2>

        <div className="relative">
          <TestimonialCard gallery={galleries[current]} />
          {galleries.length > 1 && (
            <>
              <button
                onClick={() => change(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={() => change(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
        </div>

        {galleries.length > 1 && (
          <div className="flex justify-center mt-12 gap-3">
            {galleries.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
