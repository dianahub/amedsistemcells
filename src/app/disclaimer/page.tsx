import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Site disclaimer for Amedsi Peptides.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <h1 className="text-3xl font-bold text-stone-900 mb-6">Disclaimer</h1>
      <div className="prose prose-stone max-w-none space-y-4 text-stone-700 leading-relaxed">
        <p>
          The content on this website — including text, videos, and all other
          materials — is provided for <strong>educational and informational
          purposes only</strong>. It does not constitute medical advice, and it
          is not intended to diagnose, treat, cure, or prevent any disease,
          condition, or health problem.
        </p>
        <p>
          Peptides and other compounds discussed on this site may be
          investigational, may lack FDA approval for the uses described, and
          their safety and efficacy may not be established. Research is ongoing
          and findings can change.
        </p>
        <p>
          Always consult a qualified, licensed healthcare professional before
          making any decisions about your health, medications, supplements, or
          treatment. Do not disregard professional medical advice or delay
          seeking it because of something you have read or watched on this site.
        </p>
        <p>
          This site is not a medical practice, clinic, or pharmacy. No
          products are sold here.
        </p>
        <p>
          The operators of this site make no representations or warranties of
          any kind, express or implied, about the completeness, accuracy,
          reliability, or suitability of the information provided.
        </p>
        <p className="text-sm text-stone-500">Last updated: October 2026</p>
      </div>
    </div>
  );
}
