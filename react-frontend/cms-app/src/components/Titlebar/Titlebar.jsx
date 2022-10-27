import { Link } from "react-router-dom";

const Titlebar = (props) => {
  return (
    <section className="is-title-bar">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <ul>
          <TilebarItem link={"/"} title={"Quản lý"} />
          {props.listTile.map((title) => {
            return <TilebarItem {...title} />;
          })}
        </ul>
      </div>
    </section>
  );
};

const TilebarItem = (props) => {
  return (
    <li className="underline">
      <Link to={props.link}>{props.title}</Link>
    </li>
  );
};

export default Titlebar;
