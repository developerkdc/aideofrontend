import axios from "axios";

export const arrangeTopic = async(oldpos,newpos)  => {
    try {
    //   dispatch({ type: ALL_LANGUAGE_REQUEST });
      const data = await axios.get(`/api/v1/topic/position/${oldpos}/${newpos}`);
      //   console.log(data);
    //   dispatch({ type: ALL_LANGUAGE_SUCCESS, payload: data.data });
      return data
    } catch (error) {
        return error.response.data;
    //   dispatch({
    //     type: ALL_LANGUAGE_FAIL,
    //     payload: error.response.data.description,
    //   });
    }
  };