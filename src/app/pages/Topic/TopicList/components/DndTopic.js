import React, {useEffect, useState} from 'react';
import {arrayMove, SortableContainer} from 'react-sortable-hoc';
import TopicItem from "./TopicItem";
import {Table, TableBody} from "@mui/material";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import TableContainer from "@mui/material/TableContainer";
import code from "../demo-code/dnd.txt";
import { arrangeTopic } from 'app/services/apis/arrangeTopic';


const Topics = SortableContainer(({topics}) => {
    return (
        <TableContainer>
            <Table sx={{minWidth: 650}}>
                <TableBody>
                    {topics.map((topic, index) => (
                        <TopicItem key={index} index={index} topicData={topic}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

const DndTopic = ({topics}) => {
    const [topic, setTopic] = useState(topics);
    useEffect(()=>{
        setTopic(topics)
    },[topics])
    const onSortEnd = async({oldIndex, newIndex}) => {
        setTopic(arrayMove(topic, oldIndex, newIndex));
        arrangeTopic(oldIndex,newIndex)
    };

    return (
        <JumboDemoCard
            title={"Topics"}
            demoCode={code}
            wrapperSx={{
                p: 0,
                backgroundColor: 'background.paper',

                '&:last-child': {
                    pb: 0
                }
            }}
        >
            <Topics topics={topic} onSortEnd={onSortEnd} useDragHandle={true}/>
        </JumboDemoCard>
    );
};

export default DndTopic;
