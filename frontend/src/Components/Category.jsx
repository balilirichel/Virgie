export default function Category() {
  const callouts = [
    {
      name: "Lipstick",
      description: "Elevate Your Beauty Game",
      imageSrc:
        "https://i.pinimg.com/1200x/d3/ab/35/d3ab35b682db99f0b1d8b653bc58dc14.jpg",
      imageAlt: "Mezmerizing color that will showcase your lips.",
      href: "/products/subcategory/Lipstick",
    },
    {
      name: "Pressed Powder",
      description: "Your Flawless Finish Solution",
      imageSrc:
        "https://lzd-img-global.slatic.net/g/ff/kf/S20e07153af8a41ce957ffec58b6a37d5i.jpg_720x720q80.jpg",
      imageAlt: "Avon Flawless True Matte Pressed Powder.",
      href: "/products/subcategory/Pressed Powder",
    },
    {
      name: "Brow Liner",
      description: "Frame Your Expression",
      imageSrc:
        "https://fierceandradiant.com/wp-content/uploads/2020/02/glimmersticks_best_of_beauty.png",
      imageAlt: "Avon True Brow Liner.",
      href: "/products/subcategory/Brow Liner",
    },
  ];

  return (
    <div className="bg-white z-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold text-gray-900">Our Bestseller</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative z-0">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className=" mt-6 text-sm text-gray-500 z-0">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
