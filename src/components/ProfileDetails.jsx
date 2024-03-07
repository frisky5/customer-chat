import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LoginIcon from "@mui/icons-material/Login";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import TopBar from "./TopBar";

import { useRef, useState } from "react";
export default function ProfileDetails(props) {
  const [selectedCat, setSelectedCat] = useState(-1);
  const name = useRef("");
  const [mobile, setMobile] = useState("");
  const note = useRef("");

  function disableStart() {
    return (
      name.current.length === 0 || mobile.length === 0 || selectedCat === -1
    );
  }

  return (
    <Dialog open={props.open} fullScreen TransitionComponent={Slide}>
      <TopBar />
      <Stack direction={"column"} gap={2} alignContent={"center"} p={3} pt={10}>
        <TextField
          onChange={(e) => {
            name.current = e.target.value;
          }}
          label="الاسم"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onChange={(e) => {
            if (!isNaN(Number(e.target.value)))
              setMobile(e.target.value.trim());
          }}
          value={mobile}
          label="رقم الجوال"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="اختر الفئة"
          select
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalOfferIcon color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setSelectedCat(e.target.value);
          }}
          value={selectedCat}
        >
          <MenuItem disabled value={0}>
            اختر الفئة
          </MenuItem>
          <MenuItem value={1}>صاحب عمل</MenuItem>
          <MenuItem value={2}>باحث عن عمل</MenuItem>
        </TextField>

        <TextField
          multiline
          maxRows={5}
          minRows={5}
          label="اكتب استفسارك"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditNoteIcon color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            note.current = e.target.value;
          }}
        />
        <Button
          color="primary"
          fullWidth
          variant="contained"
          endIcon={<LoginIcon />}
          sx={{ height: "50px" }}
          onClick={() => {
            props.onStart({
              name: name.current,
              mobile: mobile,
              cat: selectedCat,
              note: note.current,
            });
          }}
          disabled={disableStart()}
        >
          دخول
        </Button>
      </Stack>
    </Dialog>
  );
}
