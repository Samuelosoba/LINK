import React from "react";

export default function RecentActivities() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-6 max-h-72 overflow-auto">
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {/* Example placeholder activities, replace with real data if you want */}
          <li>Link shortened: example.com/abc123</li>
          <li>New user registered: johndoe</li>
          <li>Link clicked 30 times: example.com/xyz789</li>
          <li>Settings updated</li>
        </ul>
      </div>
    </section>
  );
}
