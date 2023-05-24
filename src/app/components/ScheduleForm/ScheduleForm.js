import React, { useState } from "react";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import Div from "@jumbo/shared/Div";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Stack } from "@mui/material";
import { contentLiveStatus } from "app/services/apis/contentLiveStatus";
import { getAllContent } from "app/redux/actions/contentAction";

const ScheduleForm = ({ items, onSave }) => {
  const Swal = useSwalWrapper();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    if (!selectedDate) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please Put Date",
        showConfirmButton: false,
        timer: 1500,
      });
      onSave();
    } else {
      let status = { status: "Scheduled", date: selectedDate.toISOString() };
      const data = await contentLiveStatus(items, status);
      if (data?.error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Date & Time is not valid",
          showConfirmButton: false,
          timer: 1500,
        });
        onSave();
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Content Scheduled Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onSave();
      }
    }
    dispatch(getAllContent());

    // onSave(selectedDate ? selectedDate.toISOString() : "");
  };

  return (
    <Div
      sx={{
        maxHeight: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
        <Stack spacing={2} sx={{ width: "100%", maxWidth: "400px" }}>
          <DateTimePicker
            label="Select date and time"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mb: 3 }}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Stack>
      </LocalizationProvider>
    </Div>
  );
};

ScheduleForm.defaultProps = {
  onSave: () => {},
};

export default ScheduleForm;
