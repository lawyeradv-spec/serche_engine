export function SiteFooter({ embed = false }: { embed?: boolean }) {
  if (embed) return null;
  return (
    <footer className="mt-auto border-t border-navy/10 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xl">עו״ד אברהם זיו כהן</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/70">
            ליווי בעלי דירות בהתחדשות עירונית, תמ״א 38, פינוי-בינוי ומיסוי מקרקעין.
            למעלה מ-20 שנות ניסיון.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-brass">יצירת קשר</p>
          <ul className="space-y-2 text-cream/80">
            <li>התדהר 5, קומה 8, רעננה</li>
            <li>
              <a href="tel:035664244" className="hover:text-brass">
                03-5664244
              </a>
            </li>
            <li>
              <a href="tel:0503682996" className="hover:text-brass">
                050-3682996
              </a>
            </li>
            <li>
              <a href="mailto:avraham@zivcohenlaw.com" className="hover:text-brass">
                avraham@zivcohenlaw.com
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-brass">קישורים</p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <a href="https://www.zivcohenlaw.com/" className="hover:text-brass">
                האתר המלא
              </a>
            </li>
            <li>
              <a href="https://www.zivcohenlaw.com/אודותינו" className="hover:text-brass">
                אודותינו
              </a>
            </li>
            <li>
              <a href="https://www.zivcohenlaw.com/general-9" className="hover:text-brass">
                מחשבון זכאות
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/972503682996"
                className="hover:text-brass"
                target="_blank"
                rel="noopener noreferrer"
              >
                וואטסאפ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-soft/50 py-4 text-center text-xs text-cream/45">
        © {new Date().getFullYear()} אברהם זיו כהן משרד עורך דין · חיפוש על בסיס תכני
        zivcohenlaw.com
      </div>
    </footer>
  );
}
