class ApiFeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        // Initialize an empty query object
        let queryObj = {};

        // Check if there's a keyword for name
        if (this.querystr.keyword) {
            queryObj.name = {
                $regex: this.querystr.keyword,
                $options: "i"
            };
        }

        // Check if there's a price range specified
        if (this.querystr.price) {
            queryObj.price = {
                $regex: this.querystr.price,
                $options: "i"
            };
        }

        // Check if there's a keyword for description
        if (this.querystr.description) {
            queryObj.description = {
                $regex: this.querystr.description,
                $options: "i"
            };
        }

        // Apply the query to the Mongoose query
        this.query = this.query.find(queryObj);
        return this;
    }

    filter(){
        const copyQuery = {...this.querystr};
        const removeFields = ["keyword", "price", "description", "limit", "page"];

        removeFields.forEach((key) => delete copyQuery[key]);
        console.log(copyQuery);
        this.query = this.query.find(copyQuery);
        return this;
    }
}

module.exports = ApiFeatures;
