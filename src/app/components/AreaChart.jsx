'use client';
import { AreaChart, Area } from "recharts";

const dummyData = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
    { name: "Page C", uv: 2000, pv: 9800 },
    { name: "Page D", uv: 2780, pv: 908 },
    { name: "Page E", uv: 0, pv: 0 },
];

const AreaChartComponent = () => {
    
    return (
        <AreaChart width={400} height={300} data={dummyData}>
            <Area 
                type="monotone"
                dataKey="uv" 
                stroke="rgba(220, 38, 38)" 
                fill="rgba(220, 38, 38)" 
            />
        </AreaChart>
    );
};

export default AreaChartComponent;
