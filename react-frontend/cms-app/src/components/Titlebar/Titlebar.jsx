import { Link } from "react-router-dom";

const Titlebar = ({ listTitle }) => {
  return (
    <section className="is-title-bar">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <ul>
          <TilebarItem link={"/"} title={"Quản lý"} />
          { listTitle.map(item => item.link ? <TilebarItem {...item} /> : <TilebarNoLinkItem {...item} /> )}
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

const TilebarNoLinkItem = ({ title }) => {
  return (
    <li>
      <span >{title}</span>
    </li>
  );
}

export default Titlebar;
