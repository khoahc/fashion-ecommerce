import { useEffect } from "react";
import Titlebar from "../../../components/Titlebar";
import UserForm from "../../../layouts/components/User/UserForm";

const AddUser = () => {
  const listTitle = [
    {
      title: "Nhân viên",
      link: "/user",
    },
    {
      title: "Thêm mới",
    },
  ];

  useEffect(() => {
    document.title = "Thêm nhân viên";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />
      
      <section className="section main-section">
        <UserForm />
      </section>
    </div>
  )
}

export default AddUser