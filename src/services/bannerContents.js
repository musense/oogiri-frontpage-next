import { instance } from "./AxiosInstance";

/**
 * Returns the selected content by id
 * 
 * @param {string} _id
 * @param {string} apiUrl
 * @returns response
*/
export async function getBanners(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/banner/frontEnd`)
        .then(res => res.data.data)
        .then(bannerList => bannerList.map(banner => {
            return {
                ...banner,
                hyperlink: banner.hyperlink ?? '',
                sort: Number(banner.sort)
            }
        }))
        .then(bannerList => bannerList.sort((a, b) => a.sort - b.sort))
    console.log("🚀 ~ file: bannerContents.js:15 ~ getBanners ~ response:", response)
    return response
}
