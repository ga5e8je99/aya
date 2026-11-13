export const metadata = {
  title: "Aya Adel Studio | Content Management Dashboard",
  description: "Administrative control center for managing all content, portfolio projects, services, skills, bookings, and messages for Aya Adel Graphic Design Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FDF8FA] text-[#2d1b30] antialiased selection:bg-pink-200 selection:text-pink-900">
      {children}
    </div>
  );
}

