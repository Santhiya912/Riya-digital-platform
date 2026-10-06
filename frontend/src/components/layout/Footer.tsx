import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold text-gold">Riyadvi</h3>
          <p className="mt-3 text-sm text-muted">
            Technology & Digital Solutions Partner. Custom software, design and
            growth, since 2021.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/portfolio" className="hover:text-gold">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-gold">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Get Started</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link href="/business-health-checkup" className="hover:text-gold">Business Health Checkup</Link></li>
            <li><Link href="/software-project-planning-guide" className="hover:text-gold">Project Planning Guide</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Riyadvi Software Technologies. All rights reserved.
      </div>
    </footer>
  );
}