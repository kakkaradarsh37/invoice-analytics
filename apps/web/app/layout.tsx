// export default function RootLayout({ children }: { children: React.ReactNode }) {
// return (
// <html lang="en" suppressHydrationWarning>
// <body className="min-h-screen">
// <div className="flex">
// <aside className="hidden md:block w-64 bg-white border-r border-neutral-200 min-h-screen">
// <div className="p-4 text-lg font-semibold">Buchhaltung</div>
// <nav className="px-2 space-y-1">
// {['Dashboard','Invoice','Other files','Departments','Users','Settings'].map((t)=> (
// <a key={t} className={`block rounded-md px-3 py-2 text-sm hover:bg-neutral-100 ${t==='Dashboard'?'bg-neutral-100 font-medium':''}`}>{t}</a>
// ))}
// </nav>
// <div className="absolute bottom-4 left-4 text-sm text-neutral-500">Flowbit AI</div>
// </aside>
// <main className="flex-1">
// <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-200">
// <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between">
// <div className="text-sm text-neutral-500">Dashboard</div>
// <div className="flex items-center gap-3 text-sm"><span className="text-neutral-600">Amit Jadhav</span><span className="rounded bg-neutral-200 px-2 py-0.5 text-neutral-700">Admin</span></div>
// </div>
// </header>
// <div className="mx-auto max-w-[1200px] px-6 py-6">{children}</div>
// </main>
// </div>
// </body>
// </html>
// );
// }


// apps/web/app/layout.tsx

// import "../globals.css";
// import { ReactNode } from "react";

// export const metadata = {
//   title: "Invoice Analytics Dashboard",
//   description: "Interactive, pixel-perfect analytics dashboard",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Load Inter font for matching Figma UI */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="min-h-screen bg-[#F8F9FB] text-neutral-900 antialiased">
//         {/* Wrap page content */}
//         <div className="mx-auto max-w-[1200px] p-6">{children}</div>
//       </body>
//     </html>
//   );
// }

import "../globals.css";
import { ReactNode } from "react";
import { Home, FileText, Folder, Users, Settings } from "lucide-react";

export const metadata = {
  title: "Invoice Analytics Dashboard",
  description: "Interactive, pixel-perfect analytics dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#F8F9FB] text-neutral-900 font-[Inter]">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 flex-col justify-between bg-white border-r border-neutral-200">
            <div>
              <div className="flex items-center gap-3 p-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Lidl-Logo.svg" className="h-7 w-7" />
                <div>
                  <div className="font-semibold">Buchhaltung</div>
                  <div className="text-xs text-neutral-500">12 members</div>
                </div>
              </div>

              <div className="px-5 pb-2 text-[11px] tracking-wide text-neutral-500">GENERAL</div>
              <nav className="px-3 space-y-1">
                <NavItem active icon={<Home size={18} />} label="Dashboard" />
                <NavItem icon={<FileText size={18} />} label="Invoice" />
                <NavItem icon={<Folder size={18} />} label="Other files" />
                <NavItem icon={<Users size={18} />} label="Departments" />
                <NavItem icon={<Users size={18} />} label="Users" />
                <NavItem icon={<Settings size={18} />} label="Settings" />
              </nav>
            </div>

            <div className="absolute bottom-5 left-6 flex items-center gap-2">
      <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
      <span className="text-sm font-medium text-neutral-700">Flowbit AI</span>
    </div>
  </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col">
            <Topbar />
            <div className="mx-auto w-full max-w-[1200px] p-6">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

function NavItem({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer ${
        active ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-[#F8F9FB] text-neutral-900 font-[Inter]">
//         <div className="flex min-h-screen">
//           {/* Sidebar */}
//           <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-white border-r border-neutral-200">
//             <div>
//               <div className="flex items-center justify-between p-5">
//                 {/* Left logo section */}
//                 <div className="flex items-center gap-3">
//                   <img
//                     src="/logo.png"
//                     alt="Company Logo"
//                     className="h-8 w-8 rounded-md object-contain"
//                   />
//                   <div>
//                     <div className="font-semibold">Buchhaltung</div>
//                     <div className="text-xs text-neutral-500">12 members</div>
//                   </div>
//                 </div>
//                 {/* ▼ Dropdown */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="h-4 w-4 text-neutral-400"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
//                 </svg>
//               </div>

//               {/* Sidebar navigation */}
//               <div className="px-5 pb-2 text-[11px] tracking-wide text-neutral-500">
//                 GENERAL
//               </div>
//               <nav className="px-3 space-y-1">
//                 <NavItem active icon={<Home size={18} />} label="Dashboard" />
//                 <NavItem icon={<FileText size={18} />} label="Invoice" />
//                 <NavItem icon={<Folder size={18} />} label="Other files" />
//                 <NavItem icon={<Users size={18} />} label="Departments" />
//                 <NavItem icon={<Users size={18} />} label="Users" />
//                 <NavItem icon={<Settings size={18} />} label="Settings" />
//               </nav>
//             </div>
//           </aside>

//           {/* Main content area */}
//           <div className="flex-1 flex flex-col">
//             {/* Topbar */}
//             <Topbar />

//             {/* Dashboard content */}
//             <main className="mx-auto w-full max-w-[1200px] p-6">{children}</main>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }


function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-neutral-200">
      <div className="mx-auto flex h-12 w-full max-w-[1200px] items-center justify-between px-6">
        <div className="text-sm text-neutral-600">Dashboard</div>
        {/* <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-sm font-medium">Amit Jadhav</div>
            <div className="text-xs text-neutral-500">Admin</div>
          </div>
          <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/36" />
        </div> */}
        <div className="flex items-center gap-3">
  <div className="text-right leading-tight">
    <div className="text-sm font-medium">Amit Jadhav</div>
    <div className="text-xs text-neutral-500">Admin</div>
  </div>

  <img
    className="h-9 w-9 rounded-full object-cover"
    src="https://i.pravatar.cc/36"
    alt="User Avatar"
  />

  {/* 3 vertical dots icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="h-5 w-5 text-neutral-600 cursor-pointer hover:text-neutral-800"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75h.008v.008H12V6.75Zm0 5.25h.008v.008H12V12Zm0 5.25h.008v.008H12v-.008Z" />
  </svg>
</div>

      </div>
    </header>
  );
}
// function Topbar() {
//   return (
//     <header className="sticky top-0 z-10 bg-white border-b border-neutral-200">
//       <div className="mx-auto flex h-12 w-full max-w-[1200px] items-center justify-between px-6">

//         {/* LEFT SECTION */}
//         <div className="flex items-center gap-6">

//           {/* Company section (Buchhaltung + dropdown) */}
//           <div className="flex items-center gap-2">
//             <img
//               src="/logo.png"
//               alt="Company Logo"
//               className="h-7 w-7 rounded-md object-contain"
//             />
//             <div>
//               <div className="font-semibold text-sm">Buchhaltung</div>
//               <div className="text-xs text-neutral-500">12 members</div>
//             </div>
//             {/* ▼ Dropdown icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="h-4 w-4 text-neutral-400 ml-1"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
//             </svg>
//           </div>

//           {/* Dashboard section */}
//           <div className="flex items-center gap-2">
//             {/* Dashboard icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="h-4 w-4 text-neutral-500"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
//               />
//             </svg>
//             <span className="text-sm font-medium text-neutral-800">Dashboard</span>
//           </div>
//         </div>

//         {/* RIGHT SECTION (User Info) */}
//         <div className="flex items-center gap-3">
//           <div className="text-right leading-tight">
//             <div className="text-sm font-medium">Amit Jadhav</div>
//             <div className="text-xs text-neutral-500">Admin</div>
//           </div>
//           <img
//             className="h-9 w-9 rounded-full object-cover"
//             src="https://i.pravatar.cc/36"
//             alt="User Avatar"
//           />
//           {/* 3-dot menu */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.8}
//             stroke="currentColor"
//             className="h-5 w-5 text-neutral-600 cursor-pointer hover:text-neutral-800"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 6.75h.008v.008H12V6.75Zm0 5.25h.008v.008H12V12Zm0 5.25h.008v.008H12v-.008Z"
//             />
//           </svg>
//         </div>
//       </div>
//     </header>
//   );
// }


