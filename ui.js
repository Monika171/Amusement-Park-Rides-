export class UI {

    constructor() {
        this.attractionDataTable = {};
        this.tablePageLength = 10;
        this.pageScrollPos = 0;
    }

    setTable(attractionData) {
        $('#loadMore').prop('disabled', false);
        let table = $("#attractionDataTable");
        this.attractionDataTable = table.DataTable({
            destroy: true,
            dom: 'frti',
            paging: true,
            pageLength: this.tablePageLength,
            data: attractionData,
            preDrawCallback: (settings) => {
                this.pageScrollPos = $('div.dataTables_scrollBody').scrollTop();
            },
            drawCallback: (settings) => {
                $('div.dataTables_scrollBody').scrollTop(this.pageScrollPos);
            },
            columns: [
            {
                data: ".",
                render: function (_, type, data) {
                    return `
                    <img class="img" src="/img.jpg" />
                    `
                }
            },
            {
                data: "name"
            }, {
                data: "theme"
            }, {
                data: "type"
            }, {
                data: "cost"
            }, {
                data: "est_cust"
            }, {
                data: "maintenance_time"
            }, {
                data: "workers"
            }, {
                data: "updated_at"
            }
        ],
        language: {
            emptyTable: "No data available. Please add new data."
        },
        //loading of new rows with scroll ('limited with load-more button, 'infinite' by default)
        scrollY: '85vh',  
        deferRender: true,
        scroller: true,
        search: {
            return: true,
        }
        })

        //“load more” button
        $('#loadMore').off('click').on('click', () => {
            let dataLength = this.attractionDataTable.page.info().recordsTotal           
            let remainder = dataLength % this.tablePageLength
            let max = dataLength - remainder
            let pageLengthCurr = this.attractionDataTable.page.len()
            let pageLengthNext = 0

            if (pageLengthCurr < max){
                pageLengthNext = pageLengthCurr + this.tablePageLength
            }else {
                pageLengthNext = pageLengthCurr + remainder
            }  
           
            this.attractionDataTable.page.len(pageLengthNext).draw();
            
            if(pageLengthNext>=dataLength){
                $('#loadMore').prop('disabled', true)
                $('#loadMore').off('click')
            }
        })
    }   
}