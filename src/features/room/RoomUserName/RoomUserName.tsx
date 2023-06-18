import { FC, useEffect } from "react";
import { Input } from "@/features/form/Input/Input";
import { Fieldset } from "@/features/form/Fieldset/Fieldset";
import { useUserName } from "../hooks/useUserName";
import styles from "./RoomUserName.module.scss";

type RoomUserNameProps = {
  label?: string;
  onChange?: (userName: string) => void;
};

export const RoomUserName: FC<RoomUserNameProps> = ({ label, onChange }) => {
  const { userName, setUserName } = useUserName();

  useEffect(() => {
    if (!userName) {
      localStorage.removeItem("userName");
    } else {
      localStorage.setItem("userName", userName);
    }
    if (onChange) {
      onChange(userName);
    }
  }, [userName]);

  return (
    <div className={styles.userName}>
      <Fieldset label={label || "Join as"} isRequired>
        <Input
          value={userName}
          placeholder="Please, enter your name"
          onChange={setUserName}
        />
      </Fieldset>
    </div>
  );
};
