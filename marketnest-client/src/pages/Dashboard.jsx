import { useEffect, useState } from "react";
import api from "../services/api";
import { TrendingUp, Package, CheckCircle, Clock, Archive } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0
  });

  const [activities] = useState([
    { id: 1, action: "Product published", product: "Premium Leather Jacket", time: "2 hours ago", icon: "✓" },
    { id: 2, action: "Draft created", product: "Summer Collection", time: "5 hours ago", icon: "📝" },
    { id: 3, action: "Product updated", product: "Classic Watch", time: "1 day ago", icon: "🔄" },
    { id: 4, action: "Product archived", product: "Seasonal Items", time: "2 days ago", icon: "📦" },
  ]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/products/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className={`${color} backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{label}</p>
          <p className="text-4xl font-bold text-gray-900 mt-3">{value}</p>
        </div>
        <Icon className="w-12 h-12 text-gray-400 opacity-50" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 md:p-12">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-blue-600" />
          Brand Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Welcome back! Here's your product overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Products" value={stats.total} icon={Package} color="bg-white" />
        <StatCard label="Published" value={stats.published} icon={CheckCircle} color="bg-green-50" />
        <StatCard label="Drafts" value={stats.draft} icon={Clock} color="bg-amber-50" />
        <StatCard label="Archived" value={stats.archived} icon={Archive} color="bg-red-50" />
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 border border-transparent hover:border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.product}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}