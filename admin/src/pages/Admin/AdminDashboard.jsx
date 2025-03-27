import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer, PieChart, Pie, Legend, LineChart, Line } from "recharts";

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState({
        doctorCount: 0,
        patientCount: 0,
        appointmentCount: 0,
        doctorGrowth: 0,
        patientGrowth: 0,
        appointmentGrowth: 0,
    });

    const [timeframe, setTimeframe] = useState("monthly");
    const [selectedMetric, setSelectedMetric] = useState("doctors");
    const [trendData, setTrendData] = useState({
        doctors: [],
        patients: [],
        appointments: [],
    });

    useEffect(() => {
        axios.get(`/api/apis/admin/analytics?timeframe=${timeframe}`)
            .then((res) => {
                setAnalytics(res.data);
                setTrendData({
                    doctors: generateTrendData(res.data.doctorCount, timeframe),
                    patients: generateTrendData(res.data.patientCount, timeframe),
                    appointments: generateTrendData(res.data.appointmentCount, timeframe),
                });
            })
            .catch((err) => console.error(err));
    }, [timeframe]);

    const generateTrendData = (value, timeframe) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        return months.map((month, i) => ({
            month,
            value: value * (1 + i * 0.05),
        }));
    };

    // Updated Bar chart data (Removed Revenue)
    const barData = [
        { name: "Doctors", value: analytics.doctorCount, growth: analytics.doctorGrowth },
        { name: "Registered Patients", value: analytics.patientCount, growth: analytics.patientGrowth },
        { name: "Appointments", value: analytics.appointmentCount, growth: analytics.appointmentGrowth },
    ];

    // Updated Pie chart data (Removed Revenue)
    const pieData = [
        { name: "Doctors", value: analytics.doctorCount, fill: "#8b5cf6" },
        { name: "Registered Patients", value: analytics.patientCount, fill: "#f97316" },
        { name: "Appointments", value: analytics.appointmentCount, fill: "#22c55e" },
    ];

    const COLORS = ["#8b5cf6", "#f97316", "#22c55e"];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                    <p className="font-medium text-gray-700">{`${label}: ${payload[0].value.toLocaleString()}`}</p>
                    <p className="text-sm">
                        Growth: <span className={barData.find(item => item.name === label).growth > 0 ? "text-green-500" : "text-red-500"}>
                            {barData.find(item => item.name === label).growth}%
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white min-h-screen rounded-xl ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Healthcare Analytics Dashboard
                    </h1>
                    <div className="inline-flex rounded-md shadow-sm bg-white p-1">
                        {["weekly", "monthly", "yearly"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                    timeframe === t ? "bg-cyan-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Updated Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {barData.map((item, index) => (
                        <div
                            key={item.name}
                            onClick={() => setSelectedMetric(item.name.toLowerCase().replace(" ", ""))}
                            className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border-l-4`}
                            style={{ borderLeftColor: COLORS[index] }}
                        >
                            <div className="p-6">
                                <p className="text-sm text-gray-500 font-medium">{item.name}</p>
                                <p className="text-2xl font-bold mt-1 text-gray-800">{item.value.toLocaleString()}</p>
                                <div className="mt-4 flex items-center">
                                    <span className={`inline-flex items-center text-sm font-medium ${item.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                                        {item.growth}%
                                    </span>
                                    <span className="ml-2 text-xs text-gray-500">vs last {timeframe}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trend Line Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{selectedMetric.replace(/([A-Z])/g, ' $1').trim()} Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData[selectedMetric]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke={COLORS[barData.findIndex(i => i.name.toLowerCase().replace(" ", "") === selectedMetric)]} strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Updated Pie Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Metrics Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Updated Bar Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparative Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value">
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
