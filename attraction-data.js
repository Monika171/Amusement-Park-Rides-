export class AttractionData {
    constructor(dataSource1) {
        this.dataSource1 = dataSource1;
    }

    //Fetch data from API
    async getAttractionData(){
        const response = await fetch(this.dataSource1)      
        const  responseData = await response.json();
        return responseData     
        }      
}