'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg text-white">{label}</p>
                {payload.map((item, index) => (
                    <p key={index} className="text-sm" style={{ color: item.fill }}>
                        {item.name}: <span className="ml-2">{item.value}</span>
                    </p>
                ))}
            </div>
        );
    }

    return null;
};

export default function BarChartComponent({ data }) {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 40,
                        bottom: 20
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {/* Bars for Object 1 and Object 2 */}
                    <Bar dataKey="Object1" name="Last Post" fill="#ef4444" />
                    <Bar dataKey="Object2" name="Previous Post" fill="#6b7280" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
