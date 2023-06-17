import { FC, ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Button.module.scss";

type ButtonProps = {
  icon?: boolean;
  clear?: boolean;
  small?: boolean;
  compact?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  external?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  to?: string;
  color?:
    | "primary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "link";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  icon = false,
  clear = false,
  small = false,
  compact = false,
  rounded = false,
  outlined = false,
  disabled = false,
  loading = false,
  external = false,
  fullWidth = false,
  href,
  to,
  color,
  className,
  children,
  onClick,
  ...restProps
}) => {
  const classes = useMemo(
    () =>
      cn(styles.button, className, {
        [styles.icon]: icon,
        [styles.clear]: clear,
        [styles.small]: small,
        [styles.compact]: compact,
        [styles.rounded]: rounded,
        [styles.outlined]: outlined,
        [styles.disabled]: disabled,
        [styles.loading]: loading,
        [styles.fullWidth]: fullWidth,
        [styles.color]: color,
      }),
    [
      clear,
      compact,
      disabled,
      fullWidth,
      icon,
      loading,
      outlined,
      rounded,
      small,
      className,
    ]
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
