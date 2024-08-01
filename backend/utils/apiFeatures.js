class ApiFeatures {
    constructor(query, searchValue) {
        this.query = query;
        this.searchValue = searchValue;
    }

    search() {
        // Initialize an empty query object
        let queryObj = {};

        // Check if there's a keyword for name
        if (this.searchValue.keyword) {
            queryObj.name = {
                $regex: this.searchValue.keyword,
                $options: "i"
            };
        }

        // Check if there's a price range specified
        if (this.searchValue.price) {
            queryObj.price = {
                $regex: this.searchValue.price,
                $options: "i"
            };
        }

        // Check if there's a keyword for description
        if (this.searchValue.description) {
            queryObj.description = {
                $regex: this.searchValue.description,
                $options: "i"
            };
        }

        // Apply the query to the Mongoose query
        this.query = this.query.find(queryObj);
        return this;
    }

    filter(){
        const copyQuery = {...this.searchValue}; console.log("copyQuery", copyQuery);
        const removeFields = ["keyword", "description", "limit", "page"];

        removeFields.forEach((key) => delete copyQuery[key]);

        let searchValue = JSON.stringify(copyQuery);
        searchValue = searchValue.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log("searchValue",searchValue);
        this.query = this.query.find(JSON.parse(searchValue));
        return this;
    }
}

module.exports = ApiFeatures;
