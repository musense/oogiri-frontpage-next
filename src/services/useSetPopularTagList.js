import { useEffect } from "react";

export default function useSetPopularTagList({ popularTagList, dispatch }) {

    useEffect(() => {
        dispatch({
            type: "SET_POPULAR_TAG_LIST",
            payload: {
                popularTagList: popularTagList,
            }
        })
    }, [popularTagList, dispatch]);
}
