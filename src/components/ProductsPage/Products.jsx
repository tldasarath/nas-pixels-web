import Link from "next/link";
import Container from "../common/layout/Container";
import { products } from "@/data/Products";



export default function ProductPipeline() {
  const top = products.slice(0, 6);
const centerLeft = products[6];
const centerRight = products[7];
const middle = products.slice(8, 14);

  return (
    <section className=" py-24">
      <Container>
        <div className="flex flex-col items-center space-y-24">

          {/* Top 6 */}
          <Grid items={top} />

          {/* Center Image */}
          <div className="flex justify-center flex-col md:flex-row items-center gap-8 md:gap-0 w-full">

  <div className="w-full max-w-[380px]">
    <Card {...centerLeft} />
  </div>

  <img
    src="/assets/images/shapes/connectedCircuit.png"
    className="hidden md:block w-[320px] lg:w-[420px] h-[200px] drop-shadow-[0_0_40px_rgba(0,255,120,0.6)]"
  />

  <div className="w-full max-w-[380px]">
    <Card {...centerRight} />
  </div>

</div>


          {/* Middle 6 */}
          <Grid items={middle} />

          {/* Bottom 2 centered */}


        </div>
      </Container>
    </section>
  );
}

function Grid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
      {items.map((p, i) => (
        <Card key={i} {...p} />
      ))}
    </div>
  );
}

function Card({ title, desc, thumbnail,slug }) {
  return (
        <Link href={`/products/${slug}`} className="block w-full h-[450px] group">
    <div className="relative group w-full h-[450px]">

      {/* Gradient border */}
   <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-green-400 via-emerald-500 to-lime-400">
  
  {/* This layer creates the inner border spacing */}
  <div className="h-full w-full  rounded-xl bg-[linear-gradient(0deg,rgba(112,200,121,0.95)_0%,rgba(112,200,121,0.8)_30%,rgba(112,200,121,0.45)_60%,rgba(112,200,121,0.12)_100%)] blur-md">
    
    {/* This is the actual card */}
    <div className="h-full w-full rounded-xl bg-[#06140b]"></div>
  
  </div>

</div>


      {/* Glow */}
      <div className="absolute inset-0 bg-green-500/30 blur-xl opacity-0   transition" />

      {/* Actual card */}
      <div className="relative rounded-xl overflow-hidden h-full flex flex-col z-10">

        {/* Image (75%) */}
        <div className="h-[75%] p-8">
          <img
            src={thumbnail}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Content (25%) */}
        <div className="h-[25%] p-4 bg-[#16572D] flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-semibold mb-1">
            {title}
          </h3>
          <p className="text-xs leading-tight">
            {desc}
          </p>
        </div>

      </div>
    </div>
    </Link>

  );
}



