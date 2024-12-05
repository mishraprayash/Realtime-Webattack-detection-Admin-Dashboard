import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-white rounded-full cursor-pointer">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center justify-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-medium text-white">Prayash</span>
          </div>
        </div>
      </div>
    </header>
  );
}