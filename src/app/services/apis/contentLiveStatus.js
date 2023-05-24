import axios from "axios";

export const contentLiveStatus = async (ids,status) => {
  try {
    let body
    if(status.status=="Scheduled"){
        // console.log(status.date)
        body = {contentIds:ids,date:status.date,status:status.status}
    }
    else{
        body = {contentIds:ids,status:status}
    }
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post("/api/v1/content/live", body, config);
    return data;
  } catch (error) {
    // console.log(data)
    return error.response.data;
  }
};
