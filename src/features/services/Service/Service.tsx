import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import cn from "classnames";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { NftCard } from "@/features/nft/NftCard/NftCard";
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

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);

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

  const nftSlot = useMemo(() => {
    if (!selectedSlot) return;
    const time = selectedSlot.split(":");
    return dayjs(selectedDate)
      .set("hour", Number(time[0]))
      .set("minute", Number(time[1]));
  }, [completedSlot]);

  const handleChangeDate = (date: any) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleChangeSlot = (time: string) => {
    setSelectedSlot(time);
  };

  const handleCloseConfirm = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleOpenWallet = () => {
    setIsConfirmDialogOpen(false);
    setIsWalletDialogOpen(true);
  };

  const handleCloseWallet = () => {
    setIsWalletDialogOpen(false);
  };

  const handleOpenResult = () => {
    setIsWalletDialogOpen(false);
    setIsResultDialogOpen(true);
  };

  const handleCloseResult = () => {
    setIsResultDialogOpen(false);
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
        <Button
          variant="contained"
          disabled={!completedSlot}
          onClick={() => setIsConfirmDialogOpen(true)}
        >
          Book the slot for 0.1 ETH
        </Button>
      </footer>

      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Buying an NFT ticket</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In the next step, you will purchase an NFT-ticket which will give
            you access to the call at the selected time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={handleOpenWallet} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isWalletDialogOpen}
        onClose={handleCloseWallet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Any Wallet</DialogTitle>
        <DialogContent>
          <img
            src="https://i1.wp.com/www.bioenergyconsult.com/wp-content/uploads/2020/08/bitcoin-wallet.jpg?ssl=1"
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWallet}>Cancel</Button>
          <Button variant="contained" onClick={handleOpenResult} autoFocus>
            Buy
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isResultDialogOpen}
        onClose={handleCloseResult}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className={styles.resultTitle}>
            <CheckCircleOutlineIcon className={styles.successIcon} />
            <span>Successful purchase!</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <NftCard
            author="Vitalik Buterin"
            title="Call for 30 minutes"
            date={nftSlot}
            photo="https://www.ixbt.com/img/n1/news/2022/4/6/buterin_large.jpg"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult}>Close</Button>
          <Button variant="contained" component={Link} to="/profile/tickets">
            Show your tickets
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
