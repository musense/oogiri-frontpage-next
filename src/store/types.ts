export interface MainState<T> {
    clientWidth: number;
    clientHeight: number;
    categorySitemapUrl: string;
    pathname: string;
    lastPathname: string;
    currMaxViewCount: number;
    currentPage: number;
    totalCount: number;
    totalPage: number;
    popularTagList: T[] | undefined;
}
export type payloadProps<T> = {
    clientWidth: number,
    clientHeight: number,
    pathname: string,
    currentPage: number,
    totalCount: number,
    totalPage: number,
    popularTagList: T[],
}
export enum ReducerActionEnum {
    SET_WINDOW_SIZE = 'SET_WINDOW_SIZE',
    INITIAL_PAGE_STATUS = 'INITIAL_PAGE_STATUS',
    SET_POPULAR_TAG_LIST = 'SET_POPULAR_TAG_LIST',
    SET_PATHNAME = 'SET_PATHNAME',
}

export type MainAction = {
    type: ReducerActionEnum,
    payload: payloadProps<PopularTagType>,
}

export type PopularTagType = {
    _id: string,
    name: string,
    popular: boolean,
    createdAt: string,
    sorting: number,
    sitemapUrl: string,
}

export type BannerListType = {
    _id: string,
    name: string,
    sort: number,
    hyperlink: string,
    contentImagePath: string,
}