import { FC, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Interests.module.scss";

export type Interest = {
  icon: string;
  label: string;
  to: string;
};

type InterestsProps = {};

export const Interests: FC<InterestsProps> = () => {
  const items = [
    {
      icon: "search",
      label: "Discover",
      to: "#discover",
    },
    {
      icon: "favorites",
      label: "Favorites",
      to: "#favorites",
    },
    {
      icon: "hot",
      label: "Hot",
      to: "#hot",
    },
    {
      icon: "popular",
      label: "Popular",
      to: "#popular",
    },
    {
      icon: "art",
      label: "Art",
      to: "#art",
    },
    {
      icon: "music",
      label: "Music",
      to: "#music",
    },
    {
      icon: "technologies",
      label: "Technologies",
      to: "#technologies",
    },
    {
      icon: "books",
      label: "Books",
      to: "#books",
    },
    {
      icon: "photography",
      label: "Photography",
      to: "#photography",
    },
    {
      icon: "sport",
      label: "Sport",
      to: "#sport",
    },
    {
      icon: "finance",
      label: "Finance",
      to: "#finance",
    },
    {
      icon: "celebrities",
      label: "Celebrities",
      to: "#celebrities",
    },
    {
      icon: "travels",
      label: "Travels",
      to: "#travels",
    },
    {
      icon: "games",
      label: "Games",
      to: "#games",
    },
    {
      icon: "hardware",
      label: "Hardware",
      to: "#hardware",
    },
    {
      icon: "movies",
      label: "Movies",
      to: "#movies",
    },
    {
      icon: "job",
      label: "Job",
      to: "#job",
    },
    {
      icon: "magic",
      label: "Magic",
      to: "#magic",
    },
    {
      icon: "cooking",
      label: "Cooking",
      to: "#cooking",
    },
    {
      icon: "hobbies",
      label: "Hobbies",
      to: "#hobbies",
    },
    {
      icon: "shopping",
      label: "Shopping",
      to: "#shopping",
    },
  ] as Interest[];

  const [active, setActive] = useState("hot");

  return (
    <div className={styles.interests}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            <Link
              to="/"
              className={cn(styles.interest, {
                [styles.active]: active === item.icon,
              })}
            >
              <div className={styles.cover}>
                <img
                  src={`${import.meta.env.VITE_SITE_URL}/interests/${
                    item.icon
                  }.png`}
                  className={styles.icon}
                />
              </div>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
