"use client";
import { Shield, Users, AlertTriangle, Settings, BarChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Sidebar() {
  const path = usePathname();
  const [navigation] = useState([
    { name: "Dashboard", icon: BarChart, to: "/" },
    {
      name: "Security Threats",
      icon: Shield,
      to: "/securitythreats",
    },
  ]);
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">
                SentinelAdmin
              </span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item, i) => (
                <Link
                  key={item.name}
                  href={item.to}
                  className={`${
                    path === item.to
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      path === item.to
                        ? "text-blue-500"
                        : "text-gray-400 group-hover:text-gray-300"
                    } mr-3 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
