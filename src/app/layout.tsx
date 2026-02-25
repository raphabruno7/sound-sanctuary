import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sound Sanctuary",
    template: "%s | Sound Sanctuary",
  },
  description:
    "Sound healing, contemplative practices, and grounded sessions to support calm and nervous system regulation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-background text-foreground antialiased"
        style={{ backgroundColor: "var(--sh-semantic-bg-primary, #F8F6F1)" }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var stored = localStorage.getItem('theme');
                var isDark = stored === 'dark' || (!stored) || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) document.documentElement.classList.add('dark');
              } catch(e) {
                document.documentElement.classList.add('dark');
              }
            })();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
