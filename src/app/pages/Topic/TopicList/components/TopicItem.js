import React, {useState} from 'react';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {Button, IconButton, TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Swal from 'sweetalert2';
import { updateTopicStatus } from 'app/services/apis/updateTopicStatus';
import { getAllTopics } from 'app/redux/actions/topicAction';
import { useDispatch } from 'react-redux';
import { deleteTopic } from 'app/services/apis/deleteTopic';
import { useJumboDialog } from '@jumbo/components/JumboDialog/hooks/useJumboDialog';
import TopicForm from 'app/components/TopicForm/TopicForm';
import { useNavigate } from 'react-router-dom';
import ConfigureTopic from '../../ConfigureTopic';

const DragHandle = SortableHandle(() => <DragHandleIcon sx={{cursor: 'grab', verticalAlign: 'middle'}}/>);

const TopicItem = props => {
    const navigate = useNavigate()
    const {topicData} = props;
    const {showDialog, hideDialog} = useJumboDialog();

    const {_id,name, createdDate, tags , status} = topicData;

    const dispatch = useDispatch()
    const hideDialogAndRefreshContactsList = React.useCallback(() => {
        hideDialog();
    }, [hideDialog]);
    const sweetAlerts = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                deleteTopic(_id)
                
                Swal.fire('Deleted!', 'Topic has been deleted', 'success');
                setTimeout(() => {
                    dispatch(getAllTopics());
                  }, 500);
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Cancelled', 'Topic Not Deleted', 'error');
            }
        });
    };

    const updateStatus = async () => {
        await updateTopicStatus(_id, status);
        dispatch(getAllTopics()); // Fetch all users again
        const message = status=="active" ? `Topic ${name} Is Inactive Now` : `Topic ${name} Is Active Now`
        Swal.fire({
            icon: "success",
            title: message,
            // text: "Done",
          });
      };
      const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'edit':
                showDialog({
                    title: 'Update Topic Name',
                    content: <TopicForm topic={topicData} onSave={hideDialogAndRefreshContactsList}/>
                });
                break;
            case 'delete':
                sweetAlerts()
            case 'configure':
                navigate('/configure/topic', { state: { topic: topicData } });
                };
    };

    return (

        <TableRow>
            <TableCell width={"3%"} sx={{pl: 3}}>
                <DragHandle/>
            </TableCell>
            {/* <TableCell width={"3%"}>
                {thumb === null || thumb === '' ? (
                    <Avatar sx={{height: 44, width: 44}}>{name.charAt(0).toUpperCase()}</Avatar>
                ) : (
                    <Avatar sx={{height: 44, width: 44}} alt={name} src={thumb}/>
                )}
            </TableCell> */}
            <TableCell width={"10%"}  >
                <Typography variant={"h6"} mb={0}>{name}</Typography>
            </TableCell>
            {/* <TableCell width={"20%"} sx={{ maxWidth: 20, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Typography variant={"h6"} mb={0}>{tags?.map((item)=>{return `#${item.name}`})}</Typography>
            </TableCell> */}
            <TableCell width={"20%"}  >
            <Typography variant={"h6"} mb={0} sx={{maxWidth:400 ,overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {tags?.map((item)=>{return `#${item.name} `})}
            </Typography>
            </TableCell>

            <TableCell width={"10%"}   >
                <Typography variant={"h6"} mb={0}>{createdDate.substring(0,10)}</Typography>
            </TableCell>
            {/* <TableCell width={"4%"}>
                <IconButton variant="text" onClick={() => setStarred(!starred)}>
                    {starred ? <Star color={"warning"} size={20}/> : <StarBorderIcon size={20}/>}
                </IconButton>
            </TableCell> */}
            <TableCell width={"4%"}>
             <Button sx={{minWidth: 92}} disableElevation variant={"contained"} size={"small"}
                            color={status=="active" ? "primary" : "error"} onClick={updateStatus}>
                        {status=="active" ? "active" : "inactive"}
            </Button>
            </TableCell>
            <TableCell width={"4%"}>
            <JumboDdMenu
                        icon={<MoreHorizIcon/>}
                        menuItems={[
                            {icon: <EditIcon/>, title: "Edit", action: "edit"},
                            {icon: <SettingsIcon/>, title: "Configure", action: "configure"},
                            {icon: <DeleteIcon/>, title: "Delete", action: "delete"}
                        ]}
                        onClickCallback={handleItemAction}
                    />
            </TableCell>
        </TableRow>
    );
};

export default SortableElement(TopicItem);

