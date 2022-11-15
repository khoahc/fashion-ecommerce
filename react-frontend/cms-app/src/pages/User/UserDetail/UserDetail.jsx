import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Titlebar from "../../../components/Titlebar";
import UserForm from "../../../layouts/components/User/UserForm/UserForm";
import userApi from "../../../services/axios/userApi";

const { getUserDetail } = userApi

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserDetail(userId).then(resp => {
      if (resp.status === 'OK') {
        return resp.data;
      } else {

      }
    }).then(data => {
      setUser(data);
    });
  }, [userId]);

  const listTitle = [
    {
      title: "Nhân viên",
      link: "/user",
    },
    {
      title: `${user.firstName}`,
      link: `/user/${user.id}`,
    },
  ];

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <UserForm user={user} />
      </section>
    </div>
  )
}

export default UserDetail