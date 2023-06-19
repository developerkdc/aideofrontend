import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Card, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JumboBookmark from "@jumbo/components/JumboBookmark";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import { getAllUsers } from "app/redux/actions/userAction";
import { updateUserStatus } from "app/services/apis/updateUserStatus";
import { useDispatch } from "react-redux";
import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import Swal from "sweetalert2";
import UserForm from "app/components/UserForm/UserForm";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { deleteUser } from "app/services/apis/deleteUser";

const Item = styled(Span)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));

const UserItem = ({ user }) => {
  const { showDialog, hideDialog } = useJumboDialog();
  const dispatch = useDispatch();

  const hideDialogAndRefreshContactsList = React.useCallback(() => {
    hideDialog();
  }, [hideDialog]);

  const sweetAlerts = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        deleteUser(user._id);

        Swal.fire("Deleted!", "User has been deleted", "success");
        dispatch(getAllUsers());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "User Not Deleted", "error");
      }
    });
  };

  const handleItemAction = (menuItem) => {
    switch (menuItem.action) {
      case "edit":
        showDialog({
          title: "Update User details",
          content: (
            <UserForm user={user} onSave={hideDialogAndRefreshContactsList} />
          ),
        });
        break;
      case "delete":
        sweetAlerts();
    }
  };

  const updateStatus = async () => {
    await updateUserStatus(user._id, !user.status);
    dispatch(getAllUsers()); // Fetch all users again
    const message = user.status
      ? "Blocked Successfully"
      : "Unblocked Successfully";
    Swal.fire({
      icon: "success",
      title: message,
      // text: "Done",
    });
  };

  return (
    <Card sx={{ mb: 1 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ p: (theme) => theme.spacing(2, 1) }}
      >
        <Item
          sx={{
            flex: { xs: 1, md: "0 1 45%", lg: "0 1 35%" },
          }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Item>
              <Badge
                overlap="circular"
                variant="dot"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{
                  ".MuiBadge-badge": {
                    border: "2px solid #FFF",
                    height: "14px",
                    width: "14px",
                    borderRadius: "50%",
                    bgcolor: user.isOnline ? "success.main" : "#757575",
                  },
                }}
              >
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  src={`http://localhost:3001/${user.thumbnail}`}
                  imgProps={{
                    style: {
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    },
                  }}
                />
              </Badge>
            </Item>
            <Item>
              <Typography variant={"h6"} mb={0.5}>{`${user.name}`}</Typography>
              <Typography variant={"body1"} color="text.secondary">
                {user.email}
              </Typography>
            </Item>
          </Stack>
        </Item>
        <Item
          sx={{
            alignSelf: "flex-start",
            flexBasis: { md: "28%", lg: "18%" },
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant={"body1"}
            color="text.secondary"
            sx={{ alignItems: "center" }}
          >
            Role
          </Typography>
          <Typography
            variant={"h6"}
            mt={1}
            lineHeight={1.25}
            sx={{ alignItems: "center" }}
          >
            {user.role.toUpperCase()}
          </Typography>
        </Item>
        <Item
          sx={{
            flexBasis: "30%",
            display: { xs: "none", lg: "block" },
          }}
        >
          <Stack
            spacing={25}
            direction={"row"}
            alignItems={"center"}
            sx={{ textAlign: "center" }}
          >
            <Item>
              <Typography variant={"body1"} color="text.secondary">
                Content
              </Typography>
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                {user.contentId.length}
              </Typography>
            </Item>
            <Item>
              <Typography variant={"body1"} color="text.secondary">
                Date
              </Typography>
              <Typography variant={"h6"} mt={1} lineHeight={1.25}>
                {user.createdDate.substring(0, 10)}
              </Typography>
            </Item>
          </Stack>
        </Item>
        <Item
          sx={{
            ml: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Button
            sx={{ minWidth: 92 }}
            disableElevation
            variant={"contained"}
            size={"small"}
            color={user.status ? "primary" : "error"}
            onClick={updateStatus}
          >
            {user.status ? "active" : "blocked"}
          </Button>
        </Item>
        <Item sx={{ ml: { xs: "auto", sm: 0 } }}>
          <JumboDdMenu
            icon={<MoreHorizIcon />}
            menuItems={[
              { icon: <EditIcon />, title: "Edit", action: "edit" },
              { icon: <DeleteIcon />, title: "Delete", action: "delete" },
            ]}
            onClickCallback={handleItemAction}
          />
        </Item>
      </Stack>
    </Card>
  );
};

export default UserItem;
