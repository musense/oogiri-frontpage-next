import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@services/sitemap';

/**
 * Returns the selected content by id
 * 
 * @param {string} _id
 * @param {string} apiUrl
 * @returns response
*/
export async function getMainContentByID(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/${_id}`)
    .then(res => res.data)
    .then(mainContent => {
      return {
        ...mainContent,
        headTitle: mainContent.headTitle && mainContent.headTitle.length > 0
          ? mainContent.headTitle : mainContent.title,
        tags: mainContent.tags && mainContent.tags.length > 0 && mainContent.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl) || '#'
          }
        }),
      }
    })
  // console.log("🚀 ~ file: titleContents.js:9 ~ getTitleContentsByID ~ response:", response)
  return response
}

/**
 * Returns the selected content by sitemapUrl
 * 
 * @param {string} sitemapUrl
 * @param {string} apiUrl
 * @returns response
*/
export async function getMainContentBySitemapUrl(payload) {
  const { sitemapUrl, apiUrl } = payload
  let encodedSitemapUrl = encodeURIComponent(sitemapUrl)
  const response = await instance(apiUrl).get(`/checkUrl/${encodedSitemapUrl}`)
    .then(res => res.data.data)
    .then(mainContent => {
      // console.log("🚀 ~ file: titleContents.js:37 ~ getMainContentBySitemapUrl ~ mainContent:", mainContent)
      return {
        ...mainContent,
        headTitle: mainContent.headTitle && mainContent.headTitle.length > 0
          ? mainContent.headTitle : mainContent.title,
        altText: mainContent.altText || 'Musense main image',
        tags: mainContent.tags && mainContent.tags.length > 0 && mainContent.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl) || '#'
          }
        }),
        mainImagePath: mainContent.contentImagePath?.indexOf('<iframe') !== -1
          ? mainContent.homeImagePath : mainContent.contentImagePath
      }
    })
  const {
    title,
    headTitle,
    headDescription,
    headKeyword,
    mainImagePath,
    contentImagePath,
    altText,
    _id,
    tags,
    updatedAt,
    publishedAt,
    htmlContent,
    ...rest } = response
  // console.log("🚀 ~ file: titleContents.js:72 ~ getMainContentBySitemapUrl ~ response:", response)
  return {
    title,
    headTitle,
    headDescription,
    headKeyword,
    mainImagePath,
    contentImagePath,
    altText,
    _id,
    tags,
    updatedAt,
    publishedAt,
    htmlContent,
  }
}

/**
 * Returns the previous and next content infos of the selected content id
 * 
 * @param {string} _id
 * @param {string} apiUrl
 * @returns response
*/
export async function getPreviousAndNextPageById(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/adjacentArticle/${_id}`)
    .then(res => res.data)
  // .then(res => { console.log(res); return res })
  return response
}

/**
 * Returns all contents
 * 
 * @param {string} apiUrl
 * @returns response
 */
export async function getAllContents(payload) {
  const { apiUrl, page, searchText } = payload
  const encodedSearchText = encodeURIComponent(searchText)
  const response = await instance(apiUrl).get(`/editor/frontEnd/getAllEditors?pageNumber=${page}&limit=10&regexSearch=${encodedSearchText}`)
    // .then(res => { console.log("🚀 ~ file: allContents.js:124 ~ getAllContents ~ res:", res); return res })
    .then(res => {
      const {
        totalCount,
        totalPages,
        currentPage,
        data,
      } = res.data
      const mappedData = data.length > 0 && data.map(item => {
        return {
          ...item,
          sitemapUrl: getRenamedContent(item.sitemapUrl) || '#'
        }
      })
      return {
        totalCount,
        totalPages,
        currentPage,
        data: mappedData
      }
    })
  // .then(res => { console.log("🚀 ~ file: allContents.js:126 ~ getAllContents ~ res:", res); return res })
  return response
}

/**
 * Returns all titleContents
 * 
 * @param {string} apiUrl
 * @returns response
 */
export async function getTitleContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(encodeURI(`/editor?limit=9999&pageNumber=1`))
    // .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.data)
    // .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.data && res.data.length > 0
      ? res.data.filter(item =>
        item.status !== "已排程" && item.status !== "草稿"
      )
      : []
    )
    // .then(res => { console.log("🚀 ~ file: titleContents.js:59 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.map(content => {
      if (content.length === 0) {
        return []
      }
      return {
        ...content,
        headTitle: content.headTitle && content.headTitle.length > 0
          ? content.headTitle : content.title,
        tags: content.tags && content.tags.length > 0 ? content.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl) || '#'
          }
        }) : null,
        sitemapUrl: getRenamedContent(content.sitemapUrl) || '#',
      }
    }))
    .then(res => res.map((content) => {
      const {
        homeImagePath,
        tags,
        title,
        altText,
        publishedAt,
        sitemapUrl,
        hidden,
        // htmlContent,
        ...reset
      } = content
      return {
        homeImagePath,
        tags,
        title,
        altText,
        publishedAt,
        sitemapUrl,
        hidden,
        // htmlContent,
      }
    }))

  return response
}


/**
 * Returns the array of sitemap urls for all titleContent pages
 * 
 * @param {string} apiUrl
 * @returns idArray
 */
export async function getEditorSitemapUrls(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(encodeURI(`/editor?limit=9999&pageNumber=1`))
    .then(res => res.data)
  // .then(res => res.filter(item => item.draft === false))
  // .then(res => { console.log("🚀 ~ file: titleContents.js:113 ~ getEditorSitemapUrls ~ res:", res); return res; })
  //唯二不產URL的只有uncategorized && 未發布

  // .then(res => { console.log("🚀 ~ file: titleContents.js:116 ~ getEditorSitemapUrls ~ res:", res); return res; })


  const idArray = response.reduce((acc, curr) => {
    return [...acc, getRenamedContent(curr.sitemapUrl) || '#']
  }, [])
  return idArray
}

/**
 * Returns a list a idArray of titleContents by categoryName
 * 
 * @param {string} categoryName
 * @param {number} page
 * @param {string} apiUrl
 * @returns idArray 
 */
// export async function getTitleContentsByCategoryAndGetOnlyID(payload) {
//   const { categoryName, page, apiUrl } = payload
//   const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
//     .then(res => res.data)
//   const { data } = response
//   const idArray = data.reduce((acc, curr) => {
//     return [...acc, curr._id]
//   }, [])
//   return idArray
// }


/**
 * Returns the relatedArticles of the selected titleContent
 * 
 * @param {string} _id
 * @param {string} apiUrl
 * @returns response
 */
export async function getRelatedArticles(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/relatedArticles/${_id}`)
    .then(res => res.data)
    // .then(resRelatedArticles => { console.log("🚀 ~ file: titleContents.js:181 ~ getRelatedArticles ~ resRelatedArticles:", resRelatedArticles); return resRelatedArticles })
    .then(res => res.data.filter(item =>
      item.hidden === false &&
      item.homeImagePath !== null
    ))
    .then(relatedArticles => relatedArticles.map(article => {
      return {
        ...article,
        sitemapUrl: getRenamedContent(article.sitemapUrl) || '#'
      }
    }))
    .then(relatedArticles => relatedArticles.map(article => {
      const {
        sitemapUrl,
        homeImagePath,
        altText,
        title,
        ...rest
      } = article
      return {
        sitemapUrl,
        homeImagePath,
        altText,
        title,
      }
    }).slice(0, 3)
    )
    .then(relatedArticles => { console.log("🚀 ~ file: titleContents.js:193 ~ getRelatedArticles ~ relatedArticles:", relatedArticles); return relatedArticles })
    .catch(err => {
      console.log("🚀 ~ file: titleContents.js:280 ~ getRelatedArticles ~ err:", err)
      return []
    })

  return response
}


/**
 * Returns the popular articles by the page views
 * 
 * @param {string} apiUrl
 * @returns response
 */
export async function getPopularContents(payload) {
  const { apiUrl } = payload
  try {
    const response = await instance(apiUrl).get(`/editor/popular?pageNumber=1&limit=6&popular=1`)
      .then(res => res.data)
      // .then(res => { console.log("🚀 ~ file: titleContents.js:198 ~ getPopularContents ~ res:", res); return res })
      .then(res => res.data.filter(item =>
        item.hidden !== true
      ))
      .then(popularContents => popularContents.map(content => {
        return {
          ...content,
          sitemapUrl: getRenamedContent(content.sitemapUrl) || '#'
        }
      }))
      .then(popularContents => popularContents.map(content => {
        const {
          title,
          sitemapUrl,
          ...rest
        } = content
        return {
          title,
          sitemapUrl,
        }
      }))
    // .then(res => { console.log("🚀 ~ file: titleContents.js:209 ~ getPopularContents ~ res:", res); return res })
    return response
  } catch (error) {
    // console.log("🚀 ~ file: titleContents.js:210 ~ getPopularContents ~ error:", error)
    return null
  }

}

/**
 * A Patch API that increment the pageViews of the selected titleContent
 *
 * @param {string} apiUrl
 * @param {string} _id
 * @returns response
*/
export async function pageViewByContent(payload) {
  const { apiUrl, _id } = payload
  let response
  try {
    response = await instance(apiUrl).patch(`/editor/incrementPageview/${_id}`)
      .then(res => res.data.data)
    // .then(res => { console.log("🚀 ~ file: titleContents.js:225 ~ res:", res); return res })
  } catch (error) {
    // console.log("🚀 ~ file: titleContents.js:225 ~ error:", error)
  }

  return response
}

/**
 * An API that get ID from backend and show the preview content
 *
 * @param {string} apiUrl
 * @param {string} _id
 * @returns response
*/
export async function getPreviewContentByID(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/tempEditor/${_id}`)
    .then(res => res.data)
    .then(previewContent => {
      // console.log("🚀 ~ file: titleContents.js:262 ~ getPreviewContentByID ~ previewContent:", previewContent)
      return {
        _id: previewContent._id,
        title: previewContent.title,
        headTitle: previewContent.headTitle && previewContent.headTitle.length > 0
          ? previewContent.headTitle : previewContent.title,
        headDescription: previewContent.headDescription,
        headKeyword: previewContent.headKeyword,
        htmlContent: previewContent.htmlContent,
        altText: previewContent.altText,
        contentImagePath: previewContent.contentImagePath ?? null,
        updatedAt: previewContent.updatedAt,
        // tags: previewContent.tags,
        tags: previewContent.tags.length > 0 && previewContent.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: '#'
          }
        }),
      }
    })
  // console.log("🚀 ~ file: previewContent.js:9 ~ getPreviewContentByID ~ response:", response)
  return response
}

/**
 * An API that get contents from backend sorted by data and topSorting
 *
 * @param {string} apiUrl
 * @returns response
*/
export async function getNewsContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/frontEnd/topAndNews`)
    .then(res => {
      const {
        data,
      } = res.data
      const mappedData = data.length > 0 && data.map(item => {
        return {
          ...item,
          sitemapUrl: getRenamedContent(item.sitemapUrl) || '#'
        }
      })
      return mappedData
    })
  // console.log("🚀 ~ file: titleContents.js:457 ~ getNewsContents ~ response:", response)
  return response
}

/**
 * An API that get contents from backend sorted by pageView
 *
 * @param {string} apiUrl
 * @returns response
*/
export async function getHotContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/frontEnd/popular`)
    .then(res => {
      const {
        data,
      } = res.data
      const mappedData = data.length > 0 && data.map(item => {
        return {
          ...item,
          sitemapUrl: getRenamedContent(item.sitemapUrl) || '#'
        }
      })
      return mappedData
    })
  // console.log("🚀 ~ file: previewContent.js:414 ~ getHotContents ~ response:", response)
  return response
}

/**
 * An API that get contents from backend sorted by recommend
 *
 * @param {string} apiUrl
 * @returns response
*/
export async function getRecommendContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/frontEnd/recommend`)
    .then(res => {
      const {
        data,
      } = res.data
      const mappedData = data.length > 0 && data.map(item => {
        return {
          ...item,
          sitemapUrl: getRenamedContent(item.sitemapUrl) || '#'
        }
      })
      return mappedData
    })
  // console.log("🚀 ~ file: previewContent.js:414 ~ getRecommendContents ~ response:", response)
  return response
}
