import { BarChart3, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t, isUrdu } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className={`container mx-auto px-4 py-12 ${isUrdu ? 'text-right' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className={`flex items-center gap-2 mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className={`font-display text-lg font-bold ${isUrdu ? 'font-urdu' : ''}`}>
                  {isUrdu ? "پاکستان ڈیٹا اٹلس" : "Pakistan Data Atlas"}
                </h3>
                <p className="text-xs text-secondary-foreground/60">
                  {isUrdu ? "Pakistan Data Atlas" : "پاکستان ڈیٹا اٹلس"}
                </p>
              </div>
            </div>
            <p className={`text-sm text-secondary-foreground/70 max-w-md mb-4 ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
              {t("footer.tagline")}
            </p>
            <div className={`flex gap-4 ${isUrdu ? 'justify-end' : ''}`}>
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
            <h4 className={`font-display font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
              {t("footer.dataDomains")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/education" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("nav.education")}
                </Link>
              </li>
              <li>
                <Link to="/elections" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("nav.elections")}
                </Link>
              </li>
              <li>
                <Link to="/population" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("nav.census")}
                </Link>
              </li>
              <li>
                <Link to="/economy" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("nav.economy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`font-display font-bold mb-4 ${isUrdu ? 'font-urdu' : ''}`}>
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("footer.dataSources")}
                </a>
              </li>
              <li>
                <a href="#" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("footer.methodology")}
                </a>
              </li>
              <li>
                <a href="#" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("footer.api")}
                </a>
              </li>
              <li>
                <a href="#" className={`text-secondary-foreground/70 hover:text-accent transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                  {t("footer.download")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
          <p className={`text-xs text-secondary-foreground/50 ${isUrdu ? 'font-urdu' : ''}`}>
            {t("footer.copyright")}
          </p>
          <p className={`text-xs text-secondary-foreground/50 ${isUrdu ? 'font-urdu' : ''}`}>
            {t("footer.sourcesNote")}
          </p>
        </div>
      </div>
    </footer>
  );
};
