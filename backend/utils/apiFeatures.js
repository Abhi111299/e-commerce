class ApiFeatures {
    constructor(query, searchValue) {
      this.query = query;
      this.searchValue = searchValue;
    }
  
    search() {
        const keyword = this.searchValue.keyword
          ? {
              name: {
                $regex: this.searchValue.keyword,
                $options: "i",
              },
            }
          : {};
    
        this.query = this.query.find({ ...keyword });
        return this;
      }
  
    filter() {
      const queryCopy = { ...this.searchValue };
      const removeFields = ["keyword", "page", "limit"];
      removeFields.forEach((key) => delete queryCopy[key]);
      let searchValue = JSON.stringify(queryCopy);
      searchValue = searchValue.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      this.query = this.query.find(JSON.parse(searchValue));
      return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.searchValue.page) || 1;
        const skipPage = resultPerPage * (currentPage -1);
        this.query = this.query.limit(resultPerPage).skip(skipPage);
        return this;
    }
}

module.exports = ApiFeatures;
