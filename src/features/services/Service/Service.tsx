import { FC, useMemo, useState } from "react";
import cn from "classnames";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import styles from "./Service.module.scss";

dayjs.extend(utc);

type ServiceProps = {
  serviceId: string;
};

export const Service: FC<ServiceProps> = ({ serviceId }) => {
  const slots = [
    {
      time: "9:00",
      available: true,
    },
    {
      time: "9:30",
      available: true,
    },
    {
      time: "10:00",
      available: false,
    },
    {
      time: "10:30",
      available: true,
    },
    {
      time: "11:00",
      available: true,
    },
    {
      time: "11:30",
      available: true,
    },
    {
      time: "12:00",
      available: false,
    },
    {
      time: "12:30",
      available: true,
    },
    {
      time: "13:00",
      available: true,
    },
    {
      time: "13:30",
      available: false,
    },
    {
      time: "14:00",
      available: true,
    },
    {
      time: "14:30",
      available: true,
    },
    {
      time: "15:00",
      available: true,
    },
    {
      time: "15:30",
      available: true,
    },
    {
      time: "16:00",
      available: true,
    },
    {
      time: "16:30",
      available: true,
    },
    {
      time: "17:00",
      available: true,
    },
    {
      time: "17:30",
      available: true,
    },
  ];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const day = useMemo(() => {
    if (!selectedDate) return;
    return dayjs(selectedDate).format("MMMM DD YYYY");
  }, [selectedDate]);

  const completedSlot = useMemo(() => {
    if (!selectedDate || !selectedSlot) return;
    const time = selectedSlot.split(":");
    return dayjs(selectedDate)
      .set("hour", Number(time[0]))
      .set("minute", Number(time[1]))
      .utc()
      .format("YYYY-MM-DDTHH:mm:ssZ[Z]");
  }, [selectedDate, selectedSlot]);

  const slot = useMemo(() => {
    if (!selectedSlot) return;
    const time = selectedSlot.split(":");
    return dayjs(selectedDate)
      .set("hour", Number(time[0]))
      .set("minute", Number(time[1]))
      .format("HH:mm (UTC Z)");
  }, [completedSlot]);

  const handleChangeDate = (date: any) => {
    setSelectedDate(date);
  };

  const handleChangeSlot = (time: string) => {
    setSelectedSlot(time);
  };

  return (
    <div className={styles.service}>
      <header className={styles.author}>
        <div className={styles.avatar}>
          <Avatar
            alt="Vitalik Buterin"
            sx={{ width: 120, height: 120 }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg/500px-Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg"
          />
        </div>
        <div className={styles.about}>
          <h1>Vitalik Buterin</h1>
          <h4>Founder, Ethereum</h4>
          <p>
            I'm a Russian-Canadian writer and programmer who has been involved
            in the Bitcoin community since 2011, co-founding and writing
            articles for Bitcoin magazine. He is primarily known as the one
            behind Ethereum, a blockchain platform that operates as a world
            computer for decentralized applications, or DApps.
          </p>
        </div>
      </header>

      <h3 className={styles.bookTitle}>Book the call with Vitalik Buterin</h3>

      <div className={styles.info}>
        <div>
          <b>Duration:</b> 30 minutes
        </div>
        <div>
          <b>Price:</b> 0.1 ETH
        </div>
      </div>

      <div className={styles.schedule}>
        <div className={styles.calendar}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar disablePast onChange={handleChangeDate} />
          </LocalizationProvider>
        </div>
        <div className={styles.slots}>
          {slots.map((slot, index) => (
            <div
              className={cn(styles.slot, {
                [styles.slotDisabled]: !slot.available,
              })}
              key={index}
            >
              <label>
                <input
                  className={styles.slotRadio}
                  type="radio"
                  name="slot"
                  disabled={!slot.available}
                  checked={selectedSlot === slot.time}
                  onChange={() => handleChangeSlot(slot.time)}
                />
                <span className={styles.slotItem}>{slot.time}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.selected}>
        <div className={styles.selectedDate}>
          <b>Selected date:</b> {day || "Not selected"}
        </div>
        <div className={styles.selectedSlot}>
          <b>Selected slot:</b> {slot || "Not selected"}
        </div>
      </div>

      <footer className={styles.footer}>
        <Button variant="contained" disabled={!completedSlot}>
          Book the slot for 0.1 ETH
        </Button>
      </footer>
    </div>
  );
};
