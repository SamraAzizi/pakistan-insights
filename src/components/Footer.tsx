import { BarChart3, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Pakistan Data Atlas</h3>
                <p className="text-xs text-secondary-foreground/60">پاکستان ڈیٹا اٹلس</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/70 max-w-md mb-4">
              An open-source initiative to make Pakistan's socio-economic data accessible, 
              understandable, and actionable for researchers, policymakers, and citizens.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/50 hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-foreground/50 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-foreground/50 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Data Domains */}
          <div>
            <h4 className="font-display font-bold mb-4">Data Domains</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/education" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Education Dashboard
                </Link>
              </li>
              <li>
                <Link to="/elections" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Electoral Analytics
                </Link>
              </li>
              <li>
                <Link to="/population" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Census Explorer
                </Link>
              </li>
              <li>
                <Link to="/economy" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Economic Indicators
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Data Sources
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/70 hover:text-accent transition-colors">
                  Download Data
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary-foreground/50">
            © 2024 Pakistan Data Atlas. Open source under MIT License.
          </p>
          <p className="text-xs text-secondary-foreground/50">
            Data sources: Pakistan Bureau of Statistics, World Bank, UNESCO
          </p>
        </div>
      </div>
    </footer>
  );
};
