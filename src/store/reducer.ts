import {
    MainState,
    MainAction,
    PopularTagType,
    ReducerActionEnum,
} from './types';

const allContentSitemapUrl = 'c_all_contents.html'

const initialState: MainState<PopularTagType> = {
    clientWidth: 0,
    clientHeight: 0,
    categorySitemapUrl: allContentSitemapUrl,
    pathname: '',
    lastPathname: '',
    currMaxViewCount: 10,
    currentPage: -1,
    totalCount: -1,
    totalPage: -1,
    popularTagList: undefined,
}

const mainReducer = (
    state: MainState<PopularTagType>,
    action: MainAction
) => {
    switch (action.type) {
        case ReducerActionEnum.SET_WINDOW_SIZE: {
            return {
                ...state,
                clientWidth: action.payload.clientWidth,
                clientHeight: action.payload.clientHeight,
            };
        }
        case ReducerActionEnum.INITIAL_PAGE_STATUS: {
            return {
                ...state,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                totalPage: action.payload.totalPage,
            };
        }
        case ReducerActionEnum.SET_POPULAR_TAG_LIST: {
            return {
                ...state,
                popularTagList: action.payload.popularTagList,
            };
        }
        case ReducerActionEnum.SET_PATHNAME: {
            return {
                ...state,
                pathname: action.payload.pathname,
            };
        }
        default:
            throw Error('Unknown action: ' + action.type);
    }

}

export { mainReducer, initialState }