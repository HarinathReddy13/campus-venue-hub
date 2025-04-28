
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BookMyVenue</h3>
            <p className="text-muted-foreground">
              The easiest way to book campus venues for your events, meetings, and activities.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition">Dashboard</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>University Campus</p>
              <p>123 College Avenue</p>
              <p>Email: support@bookmyvenue.edu</p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BookMyVenue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
