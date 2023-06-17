import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Nav.module.scss";

type NavProps = {};

export const Nav: FC<NavProps> = () => {
  const links = [
    {
      name: "Rooms",
      to: "/rooms",
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.to} className={styles.item}>
            <Link to={link.to} className={styles.link}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
