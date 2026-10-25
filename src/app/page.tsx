import Link from "next/link";
import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/config";
import videosData from "@/data/videos.json";
import type { VideoEntry } from "@/types/videos";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

const featuredVideos = (videosData as VideoEntry[]).filter((v) => v.featured);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="border-b border-[rgba(20,48,77,0.12)]"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f3 42%, #eef1f6 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <p className="text-gold-dark text-xs font-medium uppercase tracking-[0.16em] mb-4">
            Peptide &amp; Longevity Education
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink leading-tight mb-4 max-w-3xl">
            Amedsi Peptides: Peptide and Longevity Education
          </h1>
          <p className="text-lg text-navy-soft max-w-2xl mb-8">
            {SITE_DESCRIPTION}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/consultation"
              className="inline-block text-white font-medium rounded px-7 py-3 text-center text-sm transition-all hover:brightness-110 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #9c6f16 0%, #7c540c 100%)",
                boxShadow: "0 12px 24px -10px rgba(143,100,16,0.6)",
              }}
            >
              Request a free consultation
            </Link>
            <Link
              href="/topics"
              className="inline-block text-navy border border-[rgba(20,48,77,0.3)] font-medium rounded px-7 py-3 text-sm hover:border-navy-soft hover:-translate-y-0.5 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Explore education topics
            </Link>
          </div>
        </div>
      </section>

      {/* Featured videos */}
      {featuredVideos.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* TODO: Add introductory context for these videos here.
              Note: health-outcomes testimonials (e.g., recovery claims) are not
              permitted under the site's compliance policy. Consult a healthcare
              attorney before adding any personal health story. */}
          <h2 className="text-2xl font-bold text-stone-800 mb-6">
            Featured Videos
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="bg-white border-y border-[rgba(20,48,77,0.1)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-serif text-2xl text-ink mb-8 text-center">
            How it works
          </h2>
          <ol className="grid sm:grid-cols-3 gap-8" role="list">
            {[
              {
                step: "1",
                title: "Watch or read",
                body: "Explore the educational videos and topic information to learn about peptide research areas.",
              },
              {
                step: "2",
                title: "Request a consultation",
                body: "Fill out a short form to request a free consultation. No obligation and no cost.",
              },
              {
                step: "3",
                title: "Get connected",
                body: "A consultant will reach out to answer your questions and discuss your interests.",
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex flex-col items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-lg">
                  {step}
                </span>
                <h3 className="font-medium text-ink">{title}</h3>
                <p className="text-navy-soft text-sm">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="font-serif text-2xl text-ink mb-3">
          Ready to learn more?
        </h2>
        <p className="text-navy-soft mb-6 max-w-xl mx-auto">
          Request a free consultation and get connected with an expert who can
          answer your questions.
        </p>
        <Link
          href="/consultation"
          className="inline-block text-white font-medium rounded px-8 py-3 text-sm transition-all hover:brightness-110 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          style={{ background: "linear-gradient(135deg, #9c6f16 0%, #7c540c 100%)" }}
        >
          Request a free consultation
        </Link>
      </section>
    </>
  );
}
