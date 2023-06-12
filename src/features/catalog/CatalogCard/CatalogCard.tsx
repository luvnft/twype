import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Author, AuthorConnection, AuthorPreview } from "../types";
import styles from "./CatalogCard.module.scss";

type CatalogCardProps = {
  author: Author;
};

export const CatalogCard: FC<CatalogCardProps> = ({ author }) => {
  const location = useLocation();

  const showPhoto =
    !author.videoPosterUrl || author.preview === AuthorPreview.photo;

  return (
    <Link
      to={{ pathname: location.pathname, search: `?call=${author.slug}` }}
      className={styles.card}
    >
      <div className={styles.poster}>
        {showPhoto ? (
          <img src={author.posterUrl} className={styles.photo} />
        ) : (
          <video
            src={`${import.meta.env.VITE_SITE_URL}/${author.videoPosterUrl}`}
            poster={`${import.meta.env.VITE_SITE_URL}/${author.posterUrl}`}
            autoPlay
            muted
            loop
            className={styles.video}
          />
        )}
      </div>
      <div className={styles.name}>{author.name}</div>
      {author.connection === AuthorConnection.stream && (
        <div className={styles.stream}>stream</div>
      )}
      <div className={styles.price}>
        $
        {author.connection === AuthorConnection.stream
          ? author.price.stream
          : author.price.call}
      </div>
    </Link>
  );
};
