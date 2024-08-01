class ApiFeatures {
    constructor(query, searchValue) {
      this.query = query;
      this.searchValue = searchValue;
    }
  
    search() {console.log(this.searchValue);
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
      //   Removing some fields for category
      const removeFields = ["keyword", "page", "limit"];
  
      removeFields.forEach((key) => delete queryCopy[key]);
  
      // Filter For Price and Rating
  
      let searchValue = JSON.stringify(queryCopy);
      searchValue = searchValue.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
      this.query = this.query.find(JSON.parse(searchValue));
  
      return this;
    }
}

module.exports = ApiFeatures;
