import { Link } from "react-router-dom";

const Titlebar = ({ listTitle }) => {
  return (
    <section className="is-title-bar">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <ul>
          <TilebarItem link={"/"} title={"Quản lý"} />
          { listTitle.map(item => {
            return <TilebarItem {...item} />;
          })}
        </ul>
      </div>
    </section>
  );
};

const TilebarItem = ({ title, link }) => {
  return (
    <li className="underline">
      <Link to={link}>{title}</Link>
    </li>
  );
};

export default Titlebar;
