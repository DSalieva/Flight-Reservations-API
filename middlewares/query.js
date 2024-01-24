module.exports = (req, res, next)=>{


    // Search
    const search = req.query?.search || {} 
    for(let key in search) search[key]= {$regex: search[key], $options:'i'}

    // Sort 
    const sort = req.query?.sort  || {}

    // Pagination 
    let limit = Number(req.query?.limit);
    limit = limit>0? limit :20
    // Page - StartIndex 
    let page = Number(req.query?.page);
    page = (page>0? page:1)-1
    // Skip 
    let skip = Number(req.query?.skip)
    // EndIndex
    skip = skip>0? skip: (page*limit)

    res.getModelList = async function(Model, filters={}, populate=null){

        const filtersAndSearch = {...filters, ...search}
        return await Model.find(filtersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    res.getModelListDetails = async function(Model, filters={}){

        const filtersAndSearch = {...filters, ...search}
        const data = await Model.find(filtersAndSearch)
        let details = {
            search, 
            sort, 
            skip, 
            limit, 
            page, 
            pages: {
                prev: (page>0? page : false),
                current: page+1,
                next: page+2,
                total: Math.ceil(data.length/limit)
            }, 
            totalRecords: data.length
        }

        details.page.next = (details.page.next> details.page.total? false: details.page.next)
        if(details.totalRecords<=limit) details.pages = false
        return details

    }


    next()
}