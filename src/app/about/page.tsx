import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Amedsi Peptides.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">About</h1>

      {/* Placeholder paragraph */}
      <div className="bg-stone-100 border border-stone-300 rounded-md px-4 py-3 text-sm text-stone-500 mb-6">
        <strong>Placeholder:</strong> Replace this section with your personal
        bio and why you got interested in longevity and peptide education.
      </div>
      <p className="text-stone-600 mb-8 leading-relaxed">
        [Your personal story and background go here. Describe who you are, why
        you care about longevity research, and what drew you to sharing this
        educational content. Keep it personal, warm, and honest.]
      </p>

    </div>
  );
}
