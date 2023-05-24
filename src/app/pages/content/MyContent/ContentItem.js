import styled from "@emotion/styled";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import Span from "@jumbo/shared/Span/Span";
import {
  Button,
  Checkbox,
  ListItemAvatar,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ScheduleForm from "app/components/ScheduleForm/ScheduleForm";
import React from "react";
import { useDispatch } from "react-redux";

export const ContentItem = ({ item, selected, onCheckboxChange }) => {
  const Item = styled(Span)(({ theme }) => ({
    padding: theme.spacing(0, 1),
  }));

  return (
    <TableRow sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      {/* <TableCell width={50} sx={{ pl: 3, textAlign: "center" }}>
        <Checkbox
          checked={selected}
          onChange={(event) => onCheckboxChange(event, item._id)}
        />
      </TableCell> */}

      <TableCell width={150} sx={{ pl: 3, textAlign: "center" }}>
        <ListItemAvatar sx={{ mr: 2, overflow: "hidden", borderRadius: 2 }}>
          <img
            width={140}
            height={105}
            style={{ verticalAlign: "middle" }}
            alt={item.title}
            src="../../images/colin-watts.jpg"
          />
        </ListItemAvatar>
      </TableCell>

      <TableCell width={100} sx={{ pl: 3, textAlign: "center" }}>
        <Stack spacing={1} direction={"column"} alignItems={"center"}>
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Title
            </Typography>
            <Tooltip title={item.title} placement="top">
              <Typography
                variant={"h6"}
                mt={1}
                lineHeight={1.25}
                sx={{
                  maxWidth: 100,
                  minWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={100} sx={{ pl: 3, textAlign: "center" }}>
        <Stack spacing={1} direction={"column"} alignItems={"center"}>
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Creator
            </Typography>
            <Tooltip title={item.creatorId.name} placement="top">
              <Typography
                variant={"h6"}
                mt={1}
                lineHeight={1.25}
                sx={{
                  maxWidth: 100,
                  minWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.creatorId.name}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={200} sx={{ pl: 3, textAlign: "center" }}>
        <Stack spacing={1} direction={"column"} alignItems={"center"}>
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Tags
            </Typography>
            <Tooltip
              title={item.tags?.map((item) => `#${item.name} `)}
              placement="top"
            >
              <Typography
                variant={"h6"}
                mb={1}
                mt={1}
                sx={{
                  maxWidth: 120,
                  minWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.tags?.map((item) => `#${item.name} `)}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={150} sx={{ pl: 3, textAlign: "center" }}>
        <Stack
          spacing={1}
          direction={"column"}
          alignItems={"center"}
          sx={{
            maxWidth: 100,
            minWidth: 100,
          }}
        >
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Age Rating
            </Typography>
            <Tooltip title={item.ageRating} placement="top">
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                {item.ageRating}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={150} sx={{ pl: 3, textAlign: "center" }}>
        <Stack spacing={1} direction={"column"} alignItems={"center"}>
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Language
            </Typography>
            <Tooltip title={item.language.name} placement="top">
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                {item.language.name}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={150} sx={{ pl: 3, textAlign: "center" }}>
        <Stack spacing={1} direction={"column"} alignItems={"center"}>
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Verified
            </Typography>
            {item.verifiedStatus ? (
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                Verified
              </Typography>
            ) : (
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                Not Verified
              </Typography>
            )}
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={150} sx={{ pl: 3, textAlign: "center" }}>
        <Stack spacing={1} direction={"column"} alignItems={"center"}>
          <Item>
            <Typography variant={"body1"} color="text.secondary" mb={0.6}>
              Live Status
            </Typography>
            {item.liveStatus === "Live" && (
              <Button
                sx={{ minWidth: 92 }}
                disableElevation
                variant={"contained"}
                size={"small"}
                color={"primary"}
                // onClick={updateStatus}
              >
                Live
              </Button>
            )}
            {item.liveStatus === "Not Live" && item.disabledDate == null ? (
              <Button
                sx={{ minWidth: 92 }}
                disableElevation
                variant={"contained"}
                size={"small"}
                color={"warning"}
                // onClick={updateStatus}
              >
                Not Live
              </Button>
            ) : null}
            {item.disabledDate != null && item.status !== "Live" ? (
              <Button
                sx={{ minWidth: 92 }}
                disableElevation
                variant={"contained"}
                size={"small"}
                color={"error"}
                // onClick={updateStatus}
              >
                Disabled
              </Button>
            ) : null}
            {item.liveStatus === "Scheduled" && (
              <Button
                sx={{ minWidth: 92 }}
                disableElevation
                variant={"contained"}
                size={"small"}
                color={"info"}
                // onClick={updateStatus}
              >
                Scheduled
              </Button>
            )}
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={100} sx={{ pl: 3, textAlign: "center" }}>
        <Stack
          spacing={1}
          direction={"column"}
          alignItems={"center"}
          sx={{
            maxWidth: 100,
            minWidth: 100,
          }}
        >
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Live Date
            </Typography>
            <Tooltip
              title={item.liveDate ? item.liveDate.substring(0, 10) : "N/A"}
              placement="top"
            >
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                {item.liveDate ? item.liveDate.substring(0, 10) : "N/A"}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>

      <TableCell width={100} sx={{ pl: 3, textAlign: "center" }}>
        <Stack
          spacing={1}
          direction={"column"}
          alignItems={"center"}
          sx={{ maxWidth: 100, minWidth: 100 }}
        >
          <Item>
            <Typography variant={"body1"} color="text.secondary">
              Verified By
            </Typography>
            <Tooltip title={item.verifiedBy?.name || "N/A"} placement="top">
              <Typography
                variant={"h6"}
                mt={1}
                lineHeight={1.25}
                sx={{
                  maxWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.verifiedBy?.name || "N/A"}
              </Typography>
            </Tooltip>
          </Item>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
