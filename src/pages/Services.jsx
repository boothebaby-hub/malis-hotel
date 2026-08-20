import { services } from "../services/mockData";

export default function Services() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-brass-600 text-sm uppercase tracking-[0.2em] mb-4">On site</p>
      <h1 className="font-display text-4xl text-ink mb-10">Services</h1>
      <div className="grid sm:grid-cols-2 gap-8">
        {services.map((s) => (
          <div key={s.id} className="border-l-2 border-brass-500 pl-5">
            <p className="font-display text-xl text-ink">{s.name}</p>
            <p className="text-ink/70 mt-2 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
