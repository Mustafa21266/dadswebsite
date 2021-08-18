import axios from 'axios';
export const getReviewsVezeeta = async (dispatch) => {
    const { data } = await axios.get(`/api/v1/getVezeetaReviews`)
    dispatch({
        type: "GET_REVIEWS_VEZEETA",
        payload: data.reviews
    })
  };
