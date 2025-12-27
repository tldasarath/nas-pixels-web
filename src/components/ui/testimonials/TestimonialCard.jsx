export default function TestimonialCard() {
  return (
    <div
      className="
        relative
        w-full
        max-w-[822px]
        md:max-w-[638px]
        h-auto
        border
        border-dotted
        border-[#70C879]
        rounded-xl
        px-6
        py-8
        text-center
      "
    >
      {/* Name */}
      <h3 className="text-[#E9C46A] font-semibold text-lg">
        Stella
      </h3>

      {/* Role */}
      <p className="text-xs text-gray-400 mb-3">
        Business Owner
      </p>

      {/* Testimonial */}
      <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-[520px] mx-auto">
        Morem ipsum dolor sit amet, consectetur adipiscing elit.
        Etiam euest turpis turpis molestie, dictum est.
        Etiam euest
      </p>

      {/* Stars */}
      <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-[#70C879] text-sm">
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
