import DepartmentsCreateEditPage from '@pages/DepartmentsCreateEdit.page';
import EmployeeCreateEditPage from '@pages/EmployeeCreateEdit.page';
import Login from '@pages/Login';
export default function Page() {
  return (
    <>
      <DepartmentsCreateEditPage />
      <EmployeeCreateEditPage />
      <Login />
    </>
  );
}