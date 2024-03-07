import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function EndChatDialog(props) {
  return (
    <Dialog fullScreen TransitionComponent={Slide} open={props.open}>
      <DialogContent>
        <Stack
          direction={"column"}
          gap={"1rem"}
          height={"100%"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h6">هل انت متأكد من انهاء المحادثة ؟</Typography>
          <Stack
            direction={"row"}
            gap={"5rem"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button color="warning" variant="contained" onClick={props.onEnd}>
              نعم
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={props.onCancel}
            >
              لا
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
