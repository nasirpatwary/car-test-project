import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height}
        Z`;
};
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
import useAuth from "../../../hooks/useAuth";
import { useAdminHome, useChartStats } from "../../../hooks/useCollection";
import { PiChefHatThin } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { TbBrandRevolut } from "react-icons/tb";
import LoadingSpinner from "../../../components/LoadingSpinner";
const AdminHome = () => {
  const { user } = useAuth();
  const { stats } = useAdminHome();
  const [chartData, isLoading] = useChartStats();
  const chart = chartData.map((data) => ({
    name: data.category,
    value: data.revenue,
  }));
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="stats shadow bg-black">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <TbBrandRevolut size={30} />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats.revenue}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={user && user?.photoURL} alt="" />
              </div>
            </div>
          </div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <PiChefHatThin size={30} />
          </div>
          <div className="stat-title">Products</div>
          <div className="stat-value">{stats.products}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaCar size={30} />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.payments}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      {chartData.length > 0 ? (
        <ResponsiveContainer className="my-10" width="100%" height={300}>
          <BarChart
            data={chart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AdminHome;
