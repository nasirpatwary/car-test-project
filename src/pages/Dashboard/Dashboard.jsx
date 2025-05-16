import AddItemForm from "./AddItemForm/AddItemForm";
import DashboardLayout from "./DashboarLayout/DashboarLayout";
const Dashboard = () => {
  return (
    <div>
      <DashboardLayout>
        <AddItemForm />
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
