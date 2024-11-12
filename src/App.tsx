import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface DataEntry {
  name: string;
  value: number;
  fill: string;
}

const data: DataEntry[] = [
  { name: "Vehicles", value: 143, fill: "#03055B" },
  { name: "Biodiesel", value: 49, fill: "#4682B4" },
  { name: "Other paper and cardboard", value: 40, fill: "#ADD8E6" },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
      <g>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
      </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
        <div className="bg-white border p-2">{payload[0].value} US$ Millions</div>
    );
  }
  return null;
};
const CustomLegend = () => {
  return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px', // Adjust spacing as needed
        paddingTop: '20px'
      }}>
        {data.map((entry, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            backgroundColor: entry.fill,
            marginRight: '8px'
          }} />
              <span style={{ color: entry.fill }}>{entry.name}</span> {/* Text color matches legend color */}
            </div>
        ))}
      </div>
  );
};
const Chart = () => {
  const maxAngle = 360;
  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);
  const angles = data.map((entry) => (entry.value / totalValue) * maxAngle);

  return (
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto p-4">
          <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>

              <Pie
                  data={[data[0]]}
                  cx="50%"
                  cy="50%"
                  startAngle={-90}
                  endAngle={-90 + angles[0]}
                  innerRadius={120}
                  outerRadius={150}
                  fill="#03055B"
                  dataKey="value"
              />
              <Pie
                  data={[{ value: data[0].value }]}
                  cx="50%"
                  cy="50%"
                  startAngle={-90 + angles[0]}
                  endAngle={270}
                  innerRadius={120}
                  outerRadius={150}
                  fill="#ccc"
                  dataKey="value"
              />


              <Pie
                  data={[data[1]]}
                  cx="50%"
                  cy="50%"
                  startAngle={-90}
                  endAngle={-90 + angles[1]}
                  innerRadius={80}
                  outerRadius={110}
                  fill="#4682B4"
                  dataKey="value"
              />
              <Pie
                  data={[{ value: data[1].value }]}
                  cx="50%"
                  cy="50%"
                  startAngle={-90 + angles[1]}
                  endAngle={270}
                  innerRadius={80}
                  outerRadius={110}
                  fill="#ccc"
                  dataKey="value"
              />


              <Pie
                  data={[data[2]]}
                  cx="50%"
                  cy="50%"
                  startAngle={-90}
                  endAngle={-90 + angles[2]}
                  innerRadius={40}
                  outerRadius={70}
                  fill="#ADD8E6"
                  dataKey="value"
              />
              <Pie
                  data={[{ value: data[2].value }]}
                  cx="50%"
                  cy="50%"
                  startAngle={-90 + angles[2]}
                  endAngle={270}
                  innerRadius={40}
                  outerRadius={70}
                  fill="#ccc"
                  dataKey="value"
              />

              <text
                  x="50%"
                  y="45%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="#333"
                  fontSize={24}
              >
                  Perú
              </text>




              <Legend content={<CustomLegend />} />
              <Tooltip content={<CustomTooltip />} />
          </PieChart>
          </ResponsiveContainer>





      </div>
  );
};

export default Chart;
