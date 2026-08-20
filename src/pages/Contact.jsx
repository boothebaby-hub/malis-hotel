import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" }); 
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    function validate(values) {
    const errs = {};
    if (!values.name.trim()) errs.name = "Enter your name";
    if (!values.email.trim()) {
      errs.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Enter a valid email";
    }
    if (!values.message.trim()) errs.message = "Enter a message";
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="font-display text-3xl text-ink mb-3">Message sent</p>
        <p className="text-ink/70">We'll get back to you within a day.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-20">
      <p className="text-brass-600 text-sm uppercase tracking-[0.2em] mb-4">Get in touch</p>
      <h1 className="font-display text-4xl text-ink mb-10">Contact</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label className="text-sm text-ink/70 block mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500"
          />
          {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors"
        >
          Send message
        </button>
      </form>
    </div>
  );
}