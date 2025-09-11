import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">School Age Calculator</h3>
            <p className="text-sm text-gray-300">
              Helping parents determine school eligibility and timelines across different countries.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#calculator" className="hover:text-white">Calculator</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="#education" className="hover:text-white">Education Systems</Link></li>
              <li><Link href="#faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Countries</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <span>United States</span>
              <span>Canada</span>
              <span>Australia</span>
              <span>India</span>
              <span>Pakistan</span>
              <span>China</span>
              <span>United Arab Emirates</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} School Age Calculator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}