import React, { useEffect, useState } from 'react';
import Stack from "@mui/material/Stack";
import {Card, IconButton, Typography} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import { useDispatch } from 'react-redux';
import JumboDdMenu from '@jumbo/components/JumboDdMenu/JumboDdMenu';
import Swal from 'sweetalert2';
import { useJumboDialog } from '@jumbo/components/JumboDialog/hooks/useJumboDialog';
import TagForm from 'app/components/TagForm/TagForm';
import { deleteTag } from 'app/services/apis/deleteTag';
import { getAllTags } from 'app/redux/actions/tagAction';

const Item = styled(Span)(({theme}) => ({
    padding: theme.spacing(0, 1),
}));



const UserItem = ({tag}) => {
    const {showDialog, hideDialog} = useJumboDialog();
    const dispatch = useDispatch();
    

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
                deleteTag(tag._id)
                
                Swal.fire('Deleted!', 'Tag has been deleted', 'success');
                dispatch(getAllTags());
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Cancelled', 'Tag Not Deleted', 'error');
            }
        });
    };

    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'edit':
                showDialog({
                    title: 'Update Tag Name',
                    content: <TagForm tag={tag} onSave={hideDialogAndRefreshContactsList}/>
                });
                break;
            case 'delete':
                sweetAlerts()
        }
    };

    return (
        <Card sx={{mb: 1}}>
            <Stack direction={"row"} alignItems={"center"} sx={{p: theme => theme.spacing(2, 1)}}>
                <Item
                    sx={{
                        flex: {xs: 1, md: '0 1 45%', lg: '0 1 35%'}
                    }}
                >
                    <Stack direction={'row'} alignItems={'center'}>
                        <Item>
                            <Typography variant={"h6"} mb={.5}>{`#${tag.name}`}</Typography>
                        </Item>
                    </Stack>
                </Item>
                <Item
                    sx={{
                        flexBasis: '70%',
                        display: {xs: 'none', lg: 'block'},
                        ml: 30
                    }}
                >
                    <Stack spacing={25} direction={"row"} alignItems={"center"} sx={{textAlign: 'center'}}>
                        <Item>
                        <Typography variant={"body1"} color="text.secondary">Created Date</Typography>
                            <Typography variant={"h6"} mt={1} lineHeight={1.25}>{tag.createdDate.substring(0,10)}</Typography>
                         </Item>
                    </Stack>
                </Item>
                <Item sx={{ml: {xs: 'auto', sm: 0}}}>
                <JumboDdMenu
                        icon={<MoreHorizIcon/>}
                        menuItems={[
                            {icon: <EditIcon/>, title: "Edit", action: "edit"},
                            {icon: <DeleteIcon/>, title: "Delete", action: "delete"}
                        ]}
                        onClickCallback={handleItemAction}
                    />
                </Item>
            </Stack>
        </Card>
    );
};

export default UserItem;
